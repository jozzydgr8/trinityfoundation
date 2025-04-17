import { Col, Form, Input, Row, Space, Typography } from 'antd';
import logo from '../assets/Trinity_logo.png';
import {InstagramOutlined, FacebookOutlined, LinkedinOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function Footer() {
  return (
    <section className="darkbackground" style={{ padding: '40px 0' }}>
      <div className="container-fluid">
        <Row gutter={[32, 32]}>
          {/* Logo and Vision */}
          <Col lg={8} md={12} sm={24}>
            <div>
              <img
                src={logo}
                alt="logo"
                style={{ width: '100px', height: '100px', marginBottom: '16px' }}
              />
              <Paragraph style={{ color: '#fff' }}>
                Our vision is to create a compassionate and inclusive community where everyone,
                regardless of race, gender, or background, receives the emotional support and
                resources they need to thrive. We are dedicated to empowering individuals,
                uplifting the less privileged, and fostering positive change by providing assistance,
                encouragement, and hope.
              </Paragraph>
            </div>
          </Col>

          {/* Useful Links */}
          <Col lg={8} md={12} sm={24}>
            <div>
              <Title level={4} style={{ color: '#fff' }}>
                Useful Links
              </Title>
              <Row gutter={[0, 12]}>
                {[ {title:'Privacy Policy',href:'/trinityfoundation'}, 
                   {title:'Become a Volunteer', href:'/trinityfoundation/sendform'},
                   {title:'Donate', href:'/trinityfoundation/donate'}  ,].map(
                  (link, index) => (
                    <Col span={24} key={index}>
                      <Link to={link.href} style={{ color: '#ccc' }}>
                        {link.title}
                      </Link>
                    </Col>
                  )
                )}
              </Row>
            </div>
          </Col>

          {/* Subscribe Form */}
          <Col lg={8} md={12} sm={24}>
            <div>
              <Title level={4} style={{ color: '#fff' }}>
                Subscribe Now
              </Title>
              <Paragraph style={{ color: '#ccc' }}>
                Don’t miss our future updates! Get subscribed today!
              </Paragraph>
              <Form>
                <Form.Item>
                  <Input placeholder="Enter email here" />
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>

      <div style={{fontSize:'30px'}}>
      
          <a href='https://www.instagram.com/thetrinityarmsfoundation?igsh=MjFvbTB2MjlzM255&utm_source=qr' target='_blank'><InstagramOutlined/></a>
          <a href='https://www.facebook.com/share/1Eg8jui2ZL/?mibextid=wwXIfr' target='_blank'><FacebookOutlined/></a>  
          <a href='' target='_blank'><LinkedinOutlined/></a>
      
      </div>


      </div>

      <div style={{display:"flex", flexDirection:"column", alignItems:'center'}}>
        <p>© 2025 Trinity Foundation Uk </p>
        <small style={{color: '#ccc' }}>Website Created by <a href='https://jozzycodes.com/' target='_blank'>jozzycodes</a></small>
      </div>
    </section>
  );
}

export default Footer;
