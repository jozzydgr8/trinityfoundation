import { Col, Form, Input, Row, Typography } from 'antd';
import logo from '../assets/Trinity_logo.png';
import { InstagramOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FlatButton } from './FlatButton';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import {  subRef } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { checkEmailExists } from './globals';

const { Title, Paragraph } = Typography;

function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);


  const handleSubscribe = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const isValidEmail = /\S+@\S+\.\S+/.test(trimmedEmail);
    if (!isValidEmail) {
      toast.warn('Please enter a valid email address.');
      return;
    }
  
    setLoading(true);
    try {  
      const emailExists = await checkEmailExists(subRef, trimmedEmail);
      if (emailExists) {
        toast.info('This email is already subscribed.');
        setLoading(false);
        return;
      }
      // Step 2: Add new subscriber
      const docRef = await addDoc(subRef, { email: trimmedEmail, date:formatDate(new Date())});
      await axios.post('http://localhost:5000/subscribe', {
        subject: 'Welcome to Trinity Foundation Newsletter',
        message: `Thanks for subscribing...`,
        recipient_email: trimmedEmail,
      });
  
      setEmail('');
      toast.success('You have successfully subscribed!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const links = [
    { title: 'Privacy Policy', href: '/trinityfoundation' },
    { title: 'Become a Volunteer', href: '/trinityfoundation/sendform' },
    { title: 'Donate', href: '/trinityfoundation/donate' },
  ];

  return (
    <section className="darkbackground" style={{ padding: '40px 0' }}>
      <div className="container-fluid">
        <Row gutter={[32, 32]}>
          {/* Logo and Vision */}
          <Col lg={8} md={12} sm={24}>
            <img src={logo} alt="logo" style={{ width: '100px', height: '100px', marginBottom: 16 }} />
            <Paragraph style={{ color: '#fff' }}>
              Our vision is to create a compassionate and inclusive community where everyone,
              regardless of race, gender, or background, receives the emotional support and
              resources they need to thrive. We are dedicated to empowering individuals,
              uplifting the less privileged, and fostering positive change by providing assistance,
              encouragement, and hope.
            </Paragraph>
          </Col>

          {/* Useful Links */}
          <Col lg={8} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Useful Links</Title>
            <Row gutter={[0, 12]}>
              {links.map((link, idx) => (
                <Col span={24} key={idx}>
                  <Link to={link.href} style={{ color: '#ccc' }}>{link.title}</Link>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Subscribe Form */}
          <Col lg={8} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Subscribe Now</Title>
            <Paragraph style={{ color: '#ccc' }}>
              Don’t miss our future updates! Get subscribed today!
            </Paragraph>
            <Form>
              <Form.Item>
                <Input
                  placeholder="Enter email here"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <FlatButton
                onClick={handleSubscribe}
                className="buttondark"
                title="Subscribe"
                disabled={loading}
              />
            </Form>
          </Col>
        </Row>

        {/* Social Media Icons */}
        <div style={{ fontSize: '30px', marginTop: '30px' }}>
          <a
            href="https://www.instagram.com/thetrinityarmsfoundation?igsh=MjFvbTB2MjlzM255&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://www.facebook.com/share/1Eg8jui2ZL/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: '16px' }}
          >
            <FacebookOutlined />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '16px' }}>
            <LinkedinOutlined />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <p>© 2025 @ The Trinity Arms Foundation UK</p>
        <small style={{ color: '#ccc' }}>
          Website Created by <a href="https://jozzycodes.com/" target="_blank" rel="noopener noreferrer">jozzycodes</a>
        </small>
      </div>
    </section>
  );
}

export default Footer;
