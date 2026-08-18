import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FlatButton } from '../Shared/FlatButton';
import PayPal from './Component/PayPal';
import { StripePay } from '../StripePay';

const { Option } = Select;

type Currency = 'GBP' | 'USD' | 'NGN';

const currencyOptions = [
  { label: '£ GBP', value: 'GBP' as Currency },
  { label: '$ USD', value: 'USD' as Currency },
  { label: '₦ NGN', value: 'NGN' as Currency },
];

const currencyPresets: Record<Currency, number[]> = {
  NGN: [5000, 10000, 20000, 50000, 100000],
  USD: [10, 25, 50, 100, 250],
  GBP: [10, 25, 50, 100, 250],
};

const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case 'GBP':
      return '£';
    case 'USD':
      return '$';
    case 'NGN':
      return '₦';
    default:
      return '';
  }
};

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState('');

  const formik = useFormik({
    initialValues: {
      amount: 10,
      currency: 'GBP' as Currency,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      anonymous: false,
      comment: '',
    },

    validationSchema: Yup.object({
      amount: Yup.number()
        .required('Amount is required')
        .min(1, 'Amount must be greater than zero'),

      firstName: Yup.string().when('anonymous', {
        is: false,
        then: (schema) => schema.required('First name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

      lastName: Yup.string().when('anonymous', {
        is: false,
        then: (schema) => schema.required('Last name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

      email: Yup.string().when('anonymous', {
        is: false,
        then: (schema) =>
          schema
            .email('Invalid email address')
            .required('Email is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

      phone: Yup.string().when('anonymous', {
        is: false,
        then: (schema) => schema.required('Phone number is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    validateOnMount: true,

    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    },
  });

  const currency = formik.values.currency;

  const currencySymbol = getCurrencySymbol(currency);

  const displayName = formik.values.anonymous
    ? 'Anonymous'
    : `${formik.values.firstName} ${formik.values.lastName}`.trim();

  const displayEmail = formik.values.anonymous
    ? 'anonymous@donor.com'
    : formik.values.email;

  const displayPhone = formik.values.anonymous
    ? ''
    : formik.values.phone;

  /**
   * Select one of the preset donation amounts
   */
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');

    formik.setFieldValue('amount', amount);
  };

  /**
   * Enter a custom donation amount
   */
  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setCustomAmount(value);
    setSelectedAmount(null);

    const amount = value === '' ? 0 : Number(value);

    formik.setFieldValue('amount', amount);
  };

  /**
   * Change currency
   *
   * When currency changes, automatically select
   * the first preset amount for that currency.
   */
  const handleCurrencyChange = (value: Currency) => {
    const defaultAmount = currencyPresets[value][0];

    formik.setFieldValue('currency', value);
    formik.setFieldValue('amount', defaultAmount);

    setSelectedAmount(defaultAmount);
    setCustomAmount('');
  };

 

  return (
    <Form
      layout="vertical"
      onFinish={formik.handleSubmit}
      style={{
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      {/* =========================
          CURRENCY
      ========================== */}

      <Form.Item label="Select Currency">
        <Select
          value={currency}
          onChange={handleCurrencyChange}
          style={{ width: 200 }}
        >
          {currencyOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* =========================
          DONATION AMOUNT
      ========================== */}

      <Form.Item
        label={`Donation Amount (${currencySymbol})`}
        validateStatus={
          formik.touched.amount && formik.errors.amount
            ? 'error'
            : ''
        }
        help={
          formik.touched.amount
            ? formik.errors.amount
            : undefined
        }
      >
        <Row gutter={[8, 8]}>
          {currencyPresets[currency].map((amount) => (
            <Col key={amount}>
              <FlatButton
                title={`${currencySymbol}${amount.toLocaleString()}`}
                onClick={() => handleAmountSelect(amount)}
                className={
                  selectedAmount === amount
                    ? 'buttondark'
                    : ''
                }
              />
            </Col>
          ))}

          <Col>
            <Input
              placeholder={`Custom ${currencySymbol} amount`}
              value={customAmount}
              onChange={handleCustomAmountChange}
              type="number"
              min={1}
              style={{ width: 180 }}
            />
          </Col>
        </Row>
      </Form.Item>

      {/* =========================
          ANONYMOUS DONATION
      ========================== */}

      <Form.Item>
        <Checkbox
          name="anonymous"
          checked={formik.values.anonymous}
          onChange={(e) => {
            const isAnonymous = e.target.checked;
            formik.setFieldValue('anonymous', isAnonymous);

            if (isAnonymous) {
              formik.setValues({
                ...formik.values,
                anonymous: true,
                firstName: '',
                lastName: '',
                email: '',
                phone:''
              });
            }
          }}
        >
          Make this an anonymous donation.
        </Checkbox>
      </Form.Item>

      {/* =========================
          PERSONAL INFORMATION
      ========================== */}

      {!formik.values.anonymous && (
        <>
          <Form.Item label="Personal Info">
            <Row gutter={16}>
              <Col span={12}>
                <Input
                  placeholder="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.firstName &&
                  formik.errors.firstName && (
                    <div style={{ color: 'red' }}>
                      {formik.errors.firstName}
                    </div>
                  )}
              </Col>

              <Col span={12}>
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.lastName &&
                  formik.errors.lastName && (
                    <div style={{ color: 'red' }}>
                      {formik.errors.lastName}
                    </div>
                  )}
              </Col>
            </Row>
          </Form.Item>

          {/* EMAIL */}

          <Form.Item>
            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.email &&
              formik.errors.email && (
                <div style={{ color: 'red' }}>
                  {formik.errors.email}
                </div>
              )}
          </Form.Item>

          {/* PHONE */}

          <Form.Item>
            <Input
              placeholder="Phone number"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.phone &&
              formik.errors.phone && (
                <div style={{ color: 'red' }}>
                  {formik.errors.phone}
                </div>
              )}
          </Form.Item>
        </>
      )}

      {/* =========================
          COMMENT
      ========================== */}

      <Form.Item>
        <Input.TextArea
          name="comment"
          rows={3}
          placeholder="Leave a comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
      </Form.Item>

      {/* =========================
          PAYMENT OPTIONS
      ========================== */}

      {formik.isValid && (
        <>
          {/* =====================
              USD
          ====================== */}

          {currency === 'USD' && (
            <>
              {/* STRIPE */}

              <StripePay
              price={formik.values.amount}
              currency={currency}
              email={displayEmail}
              name={displayName}
              phone={displayPhone}
              comment={formik.values.comment}
            />


              {/* PAYPAL */}

              <div style={{ marginTop: 10 }}>
                <PayPal
                  price={formik.values.amount}
                  email={displayEmail}
                  name={displayName}
                  phone={displayPhone}
                  message={formik.values.comment}
                  currency={currency}
                />
              </div>
            </>
          )}

          {/* =====================
              GBP
          ====================== */}

          {currency === 'GBP' && (
            <>
              {/* STRIPE */}

              <StripePay
              price={formik.values.amount}
              currency={currency}
              email={displayEmail}
              name={displayName}
              phone={displayPhone}
              comment={formik.values.comment}
            />


              {/* BANK TRANSFER */}

              <div style={{ marginTop: 20 }}>
                <strong>OR</strong>

                <br />

                Transfer to:

                <br />

                Account Number: 13221385

                <br />

                Bank: Zempler Bank

                <br />

                Sort Code: 087199
              </div>
            </>
          )}

          {/* =====================
              NGN
          ====================== */}

          {currency === 'NGN' && (
            <div style={{ marginTop: 20 }}>
              <strong>Transfer to Account</strong>

              <br />

              Account Number: 7069335046

              <br />

              Bank: Opay

              <br />

              Account Name:  Funmilola Fasanu
            </div>
          )}
        </>
      )}
    </Form>
  );
};

export default DonationForm;
