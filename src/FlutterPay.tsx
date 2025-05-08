import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { FlatButton } from './Shared/FlatButton';

type flutterPayProps={
  price:number,
  email:string,
  phone:string,
  name:string
}
export const FlutterPay = ({price, name, phone, email}:flutterPayProps) => {
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
      title: 'Donation to trinity foundation',
      description: "Support our cause—every donation makes a difference.",
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);


  return(
    <FlatButton title='Donate with FlutterWave!' className='buttondark' onClick={() => {
      handleFlutterPayment({
        callback: (response) => {
           console.log(response);
            closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {console.log('Payment modal closed');},
      });
    }}
/>
  )}
