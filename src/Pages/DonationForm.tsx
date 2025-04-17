import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FlatButton } from '../Shared/FlatButton';

const { Option } = Select;

const styles = {
  content:{
    display:"flex",
    fontSize:"24px",
    alignItems:"center",
    justifyContent:'center',
  
}
}

const currencyOptions = [
  { label: '₦ NGN', value: 'NGN' },
  { label: '$ USD', value: 'USD' },
  { label: '£ GBP', value: 'GBP' },
];

// Define preset amounts per currency
const currencyPresets: Record<string, number[]> = {
  NGN: [5000, 10000, 20000, 50000, 100000],
  USD: [10, 25, 50, 100, 250],
  GBP: [10, 25, 50, 100, 250],
};

const DonationForm = () => {
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>('GBP');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState('');

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'NGN':
        return '₦';
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      default:
        return '';
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: 10,
      currency: currency,
      firstName: '',
      lastName: '',
      email: '',
      anonymous: false,
      comment: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required').min(1, 'Amount must be greater than zero'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', {
        ...values,
        currency,
      });
    },
  });

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount('');
    formik.setFieldValue('amount', value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
    formik.setFieldValue('amount', parseFloat(e.target.value) || 0);
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
          onChange={(val: 'NGN' | 'USD' | 'GBP') => {
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

      {/* Personal Info */}
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

      {/* Email */}
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

      {/* Anonymous */}
      <Form.Item>
        <Checkbox
          name="anonymous"
          checked={formik.values.anonymous}
          onChange={formik.handleChange}
        >
          Make this an anonymous donation.
        </Checkbox>
      </Form.Item>

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

      {/* Submit */}
      <Form.Item>
        <FlatButton
          title="Donate now"
          onClick={formik.handleSubmit}
          className="buttondark"
        />
      </Form.Item>

      <div style={{...styles.content, flexDirection:"column"}}>
        Make a bank transfer in Great Britain Pound (GBP) to the following account:<br/>

        Name:<br/>
        Account Number: 13221385<br/>
        Bank Name: Zempler bank<br/>
        Short Code: 087199

      </div>
    </Form>
  );
};

export default DonationForm;
