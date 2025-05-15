import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FlatButton } from '../Shared/FlatButton';
import { FlutterPay } from '../FlutterPay';
import PayPal from './Component/PayPal';
import { StripePay } from '../StripePay';

const { Option } = Select;

const styles = {
  content: {
    display: 'flex',
    fontSize: '18px',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
   
  },
};

const currencyOptions = [
  { label: '£ GBP', value: 'GBP' },
  { label: '$ USD', value: 'USD' },
  { label: '₦ NGN', value: 'NGN' },
  
];

const currencyPresets: Record<string, number[]> = {
  NGN: [5000, 10000, 20000, 50000, 100000],
  USD: [10, 25, 50, 100, 250],
  GBP: [10, 25, 50, 100, 250],
};

const DonationForm = () => {
  const [currency, setCurrency] = useState<'GBP' | 'USD' | 'NGN'>('GBP');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState('');

  const getCurrencySymbol = () => {
    switch (currency) {
      
      case 'GBP': return '£';
      case 'USD': return '$';
      case 'NGN': return '₦';
      
      default: return '';
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: 5000,
      currency: currency,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      anonymous: false,
      comment: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required').min(1, 'Amount must be greater than zero'),
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
      email: Yup.string().email('Invalid email address').when('anonymous', {
        is: false,
        then: (schema) => schema.required('Email is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
      phone: Yup.string().when('anonymous', {
        is: false,
        then: (schema) => schema.required('Phone number is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    validateOnMount: true, // ✅ Add this line
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    },
  });
  
  

const displayName = formik.values.anonymous ? 'Anonymous' : `${formik.values.firstName} ${formik.values.lastName}`;
const displayEmail = formik.values.anonymous ? 'anonymous@donor.com' : formik.values.email;
const displayPhone = formik.values.anonymous ? '' : formik.values.phone;


  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount('');
    formik.setFieldValue('amount', value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
    formik.setFieldValue('amount', val);
  };

  return (
    <Form
      layout="vertical"
      onFinish={formik.handleSubmit}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      {/* Currency Selector */}
      <Form.Item label="Select Currency">
        <Select
          value={currency}
          onChange={(val:   'GBP'| 'USD' |'NGN' ) => {
            setCurrency(val);
            const defaultAmount = currencyPresets[val][0];
            setSelectedAmount(defaultAmount);
            setCustomAmount('');
            formik.setFieldValue('amount', defaultAmount);
            formik.setFieldValue('currency', val);
          }}
          style={{ width: 200 }}
        >
          {currencyOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Amount Buttons */}
      <Form.Item label={`Donation Amount (${getCurrencySymbol()})`}>
        <Row gutter={[8, 8]}>
          {currencyPresets[currency].map((amt) => (
            <Col key={amt}>
              <FlatButton
                title={`${getCurrencySymbol()}${amt.toLocaleString()}`}
                onClick={() => handleAmountSelect(amt)}
                className={selectedAmount === amt ? 'buttondark' : ''}
              />
            </Col>
          ))}
          <Col>
            <Input
              placeholder={`Custom ${getCurrencySymbol()} amount`}
              value={customAmount}
              onChange={handleCustomAmountChange}
              type="number"
              style={{ width: 150 }}
            />
          </Col>
        </Row>
      </Form.Item>

      {/* Anonymous */}
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

      {/* Personal Info (conditionally rendered) */}
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
                {formik.touched.firstName && formik.errors.firstName && (
                  <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
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
                {formik.touched.lastName && formik.errors.lastName && (
                  <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                )}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="Phone number"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div style={{ color: 'red' }}>{formik.errors.phone}</div>
            )}
          </Form.Item>

        </>
      )}

      {/* Comment */}
      <Form.Item>
        <Input.TextArea
          name="comment"
          rows={3}
          placeholder="Leave a comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
      </Form.Item>

      {/* Payment Button */}
      
      {(formik.isValid || formik.values.anonymous) && (
        <>
          {(currency === 'USD' || currency === 'GBP') && (
            <StripePay
              price={formik.values.amount}
              currency={currency}
              email={displayEmail}
              name={displayName}
              phone={displayPhone}
            />
          )}

          {currency === 'NGN' && (
            // <FlutterPay
            //   price={formik.values.amount}
            //   email={displayEmail}
            //   name={displayName}
            //   phone={displayPhone}
            //   message={formik.values.comment}
            //   currency={formik.values.currency}
            // />
            <>
              Transfer to Account
              <br/>
              Account Number: 7069335046
              <br/>
              Bank: Opay
              <br/>
              Bank Name: Funmilola Fasanu
              
            </>
          )}

          {currency === 'USD' && (
            <div style={{ marginTop: '10px' }}>
              <PayPal 
              price={formik.values.amount}
              email={displayEmail}
              name={displayName}
              phone={displayPhone}
              message={formik.values.comment}
              currency={formik.values.currency} />
            </div>
          )}
          {
            currency === 'GBP' &&(
              <div>
                OR
                <br/>
                Transfer to: <br/>
                Account Number: 13221385 <br/>
                Bank: Zempler Bank <br/>
                Sort Code: 087199
              </div>
            )
          }
        </>
      )}

      
    </Form>
  );
};

export default DonationForm;
