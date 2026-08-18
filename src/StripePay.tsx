import { useState } from 'react';
import { FlatButton } from './Shared/FlatButton';

type StripePropType = {
  price: number;
  currency: 'USD' | 'GBP';
  email: string;
  name: string;
  phone: string;
  comment: string; // ✅ added
};

export const StripePay = ({
  price,
  currency,
  email,
  name,
  phone,
  comment, // ✅ added
}: StripePropType) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        'https://trinityarms.vercel.app/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: {
              name: 'Donation to Trinity Foundation',
              price: price * 100,
              currency,
            },

            customer: {
              email,
              name,
              phone,
              comment, // ✅ added
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          `Checkout request failed: ${res.status}`
        );
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        alert('Failed to start checkout session.');
      }
    } catch (error) {
      console.error(
        'Error creating Checkout session:',
        error
      );

      alert(
        'Something went wrong. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatButton
      title={
        loading
          ? 'Loading...'
          : 'Donate with Stripe'
      }
      onClick={handleCheckout}
      disabled={loading || price <= 0}
      className="buttonsuccess"
    />
  );
};
