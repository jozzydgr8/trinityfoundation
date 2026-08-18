import React, { useEffect, useRef } from 'react';

type PayPalProps = {
  price: number;
  email: string;
  phone?: string;
  name: string;
  currency: string;
  message?: string;
};

type PayPalOrder = {
  id?: string;
  status: string;

  payer?: {
    name?: {
      given_name?: string;
      surname?: string;
    };

    email_address?: string;
  };

  purchase_units?: Array<{
    amount?: {
      value?: string;
      currency_code?: string;
    };
  }>;
};

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPal = ({
  price,
  message,
  email,
  phone,
  name,
  currency,
}: PayPalProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    // Save the current DOM element for this effect
    const paypalContainer = paypalRef.current;

    /*
     * Load PayPal SDK
     */
    const loadPayPalScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // PayPal SDK already exists
        if (window.paypal) {
          resolve();
          return;
        }

        // Check if another component is already loading PayPal
        const existingScript = document.querySelector(
          'script[data-paypal-sdk]'
        );

        if (existingScript) {
          existingScript.addEventListener(
            'load',
            () => resolve(),
            { once: true }
          );

          existingScript.addEventListener(
            'error',
            () =>
              reject(
                new Error(
                  'PayPal SDK could not be loaded.'
                )
              ),
            { once: true }
          );

          return;
        }

        const clientId =
          process.env.REACT_APP_Paypal_Client;

        if (!clientId) {
          reject(
            new Error(
              'PayPal client ID is missing. Check REACT_APP_Paypal_Client.'
            )
          );

          return;
        }

        const script =
          document.createElement('script');

        script.src =
          `https://www.paypal.com/sdk/js` +
          `?client-id=${clientId}` +
          `&currency=${currency}`;

        script.async = true;

        script.setAttribute(
          'data-paypal-sdk',
          'true'
        );

        script.onload = () => resolve();

        script.onerror = () =>
          reject(
            new Error(
              'PayPal SDK could not be loaded.'
            )
          );

        document.body.appendChild(script);
      });
    };

    /*
     * Send completed PayPal payment
     * to your backend.
     */
    const handlePayment = async (
      order: PayPalOrder
    ) => {
      try {
        /*
         * PayPal must say COMPLETED
         */
        if (order.status !== 'COMPLETED') {
          console.log(
            'Payment not completed:',
            order.status
          );

          return;
        }

        /*
         * Get payer name
         */
        const payerName =
          `${order.payer?.name?.given_name || ''} ${
            order.payer?.name?.surname || ''
          }`.trim();

        /*
         * Get amount from PayPal response
         */
        const amount =
          order.purchase_units?.[0]?.amount?.value;

        /*
         * Get currency from PayPal response
         */
        const orderCurrency =
          order.purchase_units?.[0]?.amount
            ?.currency_code;

        /*
         * Make sure we have an order ID
         */
        if (!order.id) {
          throw new Error(
            'PayPal order ID is missing.'
          );
        }

        console.log(
          'PayPal payment completed:',
          order
        );

        /*
         * Send payment information
         * to your Node/Express backend.
         */
        const response = await fetch(
          'https://trinityarms.vercel.app/paypal/save-donation',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              order,

              name:
                payerName ||
                name ||
                'Anonymous',

              email:
                order.payer?.email_address ||
                email ||
                '',

              phone: phone || '',

              amount: amount
                ? Number(amount)
                : price,

              currency:
                orderCurrency || currency,

              message: message || '',
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              'Failed to save PayPal donation.'
          );
        }

        console.log(
          'PayPal donation saved successfully:',
          data.donation
        );

        alert(
          `Thank you ${
            payerName || name || 'for your donation'
          }!`
        );
      } catch (error) {
        console.error(
          'Error processing PayPal payment:',
          error
        );

        alert(
          'Your PayPal payment was completed, but we could not record the donation. Please contact us.'
        );
      }
    };

    /*
     * Render PayPal buttons
     */
    const renderPayPalButtons = () => {
      if (
        !isMounted ||
        !window.paypal ||
        !paypalContainer
      ) {
        return;
      }

      /*
       * Remove previous buttons
       */
      paypalContainer.innerHTML = '';

      window.paypal
        .Buttons({
          style: {
            layout: 'vertical',
            shape: 'rect',
            label: 'paypal',
          },

          /*
           * Create PayPal order
           */
          createOrder: (
            data: any,
            actions: any
          ) => {
            return actions.order.create({
              purchase_units: [
                {
                  description:
                    'Donation to Trinity Foundation',

                  amount: {
                    currency_code: currency,
                    value:
                      Number(price).toFixed(2),
                  },
                },
              ],
            });
          },

          /*
           * Payment approved
           */
          onApprove: async (
            data: any,
            actions: any
          ) => {
            try {
              /*
               * Capture the payment
               */
              const order =
                await actions.order.capture();

              console.log(
                'PayPal order captured:',
                order
              );

              /*
               * Save payment in MongoDB
               */
              await handlePayment(order);
            } catch (error) {
              console.error(
                'Error capturing PayPal order:',
                error
              );

              alert(
                'There was a problem completing your PayPal payment.'
              );
            }
          },

          /*
           * Customer cancelled payment
           */
          onCancel: (data: any) => {
            console.log(
              'PayPal payment cancelled:',
              data
            );
          },

          /*
           * PayPal error
           */
          onError: (error: any) => {
            console.error(
              'PayPal Checkout error:',
              error
            );

            alert(
              'There was a problem with PayPal. Please try again.'
            );
          },
        })
        .render(paypalContainer);
    };

    /*
     * Load SDK and render buttons
     */
    loadPayPalScript()
      .then(renderPayPalButtons)
      .catch((error) => {
        console.error(
          'PayPal initialization error:',
          error
        );
      });

    /*
     * Cleanup
     */
    return () => {
      isMounted = false;

      if (paypalContainer) {
        paypalContainer.innerHTML = '';
      }
    };
  }, [
    price,
    currency,
    email,
    phone,
    name,
    message,
  ]);

  return (
    <div
      ref={paypalRef}
      style={{
        width: '100%',
        minHeight: 50,
      }}
    />
  );
};

export default PayPal;
