import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { FlatButton } from './Shared/FlatButton';
import { addDoc } from 'firebase/firestore';
import { donorRef } from './App';
import { formatDate } from './Shared/Hooks/FormatDate';

type flutterPayProps = {
  price: number;
  email: string;
  phone: string;
  name: string;
  message?: string;
  currency:string,
}



export const FlutterPay = ({ price, name, phone, email, message, currency }: flutterPayProps) => {
  const config = {
    public_key: 'FLWPUBK_TEST-948fe48abcdfb9faa46e83d557d10d76-X',
    tx_ref: Date.now().toString(),
    amount: price,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: 'Donation to Trinity Foundation',
      description: "Support our cause—every donation makes a difference.",
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = async (response: any) => {
    try {
      // Assuming response.status === 'successful' to be a successful payment
      if (response.status === 'COMPLETED') {
        await addDoc(donorRef, {
          name: response.customer.name,
          amount: response.amount,
          method: 'Flutterwave', // Payment method
          status: response.status,
          date: formatDate(new Date()), // Proper date format
          message: message,
          email: email,
          currency:currency
        });
        closePaymentModal(); // Close the payment modal after success
      } else {
        console.log('Payment failed or was canceled:', response.status);
      }
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  return (
    <FlatButton
      title="Donate with FlutterWave!"
      className="buttondark"
      onClick={() => {
        handleFlutterPayment({
          callback: handlePayment, // Callback function to handle the response
          onClose: () => { console.log('Payment modal closed'); },
        });
      }}
    />
  );
};
