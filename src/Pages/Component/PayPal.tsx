import React, { useEffect, useRef } from 'react';
import { addDoc } from 'firebase/firestore';
import { donorRef } from '../../App';
import { formatDate } from '../../Shared/Hooks/FormatDate';

declare global {
  interface Window {
    paypal: any;
  }
}

type PayPalProps = {
  price: number;
  email: string;
  phone: string;
  name: string;
  currency:string,
  message?: string;
 
};

const handlePayment = async (order: any, email: string, currency:string, message?: string ) => {
  try {
    if (order.status === 'COMPLETED') {
      await addDoc(donorRef, {
        name: `${order.payer.name.given_name} ${order.payer.name.surname}`,
        amount: order.purchase_units[0].amount.value,
        method: 'PayPal',
        status: order.status,
        date: formatDate(new Date()),
        message: message || '',
        email: email,
        currency:currency
      });
      console.log('Donation recorded successfully.');
    } else {
      console.log('Payment not completed:', order.status);
    }
  } catch (error) {
    console.error('Error saving donation to Firestore:', error);
  }
};

const PayPal = ({ price, message, email, currency }: PayPalProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPayPalScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.paypal) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
        document.body.appendChild(script);
      });
    };

    const renderPayPalButtons = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Donation to Trinity Foundation',
                  amount: {
                    currency_code: 'USD',
                    value: price.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            console.log('PayPal order captured:', order);

            // Call your payment handler
            await handlePayment(order, email , currency, message);

            alert(`Transaction completed by ${order.payer.name.given_name}`);
          },
          onError: (err: any) => {
            console.error('PayPal Checkout onError:', err);
          },
        }).render(paypalRef.current);
      }
    };

    paypalRef.current!.innerHTML = '';
    loadPayPalScript()
      .then(renderPayPalButtons)
      .catch((err) => console.error(err));
  }, [price, message, email]);

  return <div ref={paypalRef}></div>;
};

export default PayPal;
