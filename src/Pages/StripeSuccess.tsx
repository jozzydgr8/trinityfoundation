import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const StripeSuccess = () => {
  const location = useLocation();
  const hasHandled = useRef(false);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleSuccess = async () => {
      if (hasHandled.current) return;

      hasHandled.current = true;

      const sessionId = new URLSearchParams(
        location.search
      ).get('session_id');

      if (!sessionId) {
        setError('Stripe session ID was not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://trinityarms.vercel.app/retrieve-session/${sessionId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Unable to verify payment.'
          );
        }

        if (data.success) {
          console.log(
            'Donation saved successfully:',
            data.donation
          );

          setSuccess(true);
        } else {
          throw new Error(
            'Payment could not be confirmed.'
          );
        }
      } catch (error) {
        console.error(
          'Error handling Stripe success:',
          error
        );

        setError(
          'We could not confirm your donation. Please contact us if you were charged.'
        );
      } finally {
        setLoading(false);
      }
    };

    handleSuccess();
  }, [location.search]);

  if (loading) {
    return (
      <div>
        <h2>Confirming your donation...</h2>
        <p style={{ textAlign: 'center' }}>
          Please wait while we confirm your payment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>There was a problem</h2>
        <p style={{ textAlign: 'center' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {success
          ? 'Thank you for your donation!'
          : 'Payment processing'}
      </h2>

      <p style={{ textAlign: 'center' }}>
        {success
          ? 'Your payment was successfully processed. Thank you for supporting us.'
          : 'Please wait while we confirm your payment.'}
      </p>
    </div>
  );
};

export default StripeSuccess;
