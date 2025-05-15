import React, { useEffect, useRef } from 'react';
import { getDocs, setDoc, query, where, doc } from 'firebase/firestore';
import { donorRef } from '../App';
import { formatDate } from '../Shared/Hooks/FormatDate';
import { useLocation } from 'react-router-dom';

const StripeSuccess = () => {
  const location = useLocation();
  const hasHandled = useRef(false); // ✅ track if already handled

  useEffect(() => {
    const handleSuccess = async () => {
      if (hasHandled.current) return; // ✅ prevent duplicate calls
      hasHandled.current = true;

      const sessionId = new URLSearchParams(location.search).get('session_id');

      if (!sessionId) {
        console.error('Session ID not found');
        return;
      }

      try {
        const q =  query(donorRef, where('stripeSessionId', '==', sessionId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          console.log('ℹ️ Session already saved, skipping...');
          return;
        }

        const response = await fetch(`http://localhost:5000/retrieve-session/${sessionId}`);
        const session = await response.json();

        await setDoc(doc(donorRef, session.id), {
          email: session.customer_details.email,
          name: session.customer_details.name,
          amount: session.amount_total,
          stripeSessionId: session.id,
          status: 'completed',
          date: formatDate(new Date()),
          method: 'Stripe',
          currency: session.currency
        });

        console.log('✅ Payment saved to Firebase!');
      } catch (error) {
        console.error('❌ Error handling success:', error);
      }
    };

    handleSuccess();
  }, []);

  return (
    <div>
      <h2>Thank you for your donation!</h2>
      <p style={{textAlign:"center"}}>Your payment was successfully processed.</p>
    </div>
  );
};

export default StripeSuccess;
