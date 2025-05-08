import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    paypal: any;
  }
}

type PayPalProps = {
  price: number;
};

const PayPal = ({ price }: PayPalProps) => {
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
                  description: 'Donate',
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
            console.log('Order:', order);
            alert(`Transaction completed by ${order.payer.name.given_name}`);
          },
          onError: (err: any) => {
            console.error('PayPal Checkout onError:', err);
          },
        }).render(paypalRef.current);
      }
    };

    // Load script and then render
    paypalRef.current!.innerHTML = '';
    loadPayPalScript()
      .then(renderPayPalButtons)
      .catch((err) => console.error(err));
  }, [price]);

  return <div ref={paypalRef}></div>;
};

export default PayPal;
