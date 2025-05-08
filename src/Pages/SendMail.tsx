import { useState } from "react";
import { Form, Input, Row, Col} from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { FlatButton } from "../Shared/FlatButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { formRef } from "../App";
import { checkEmailExists } from "../Shared/globals";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string(),
  address: Yup.string().required("Address is required"),
  about: Yup.string().required("Tell us about yourself"),
});
type valueprops = {
  firstName:string,
  lastName:string,
  email:string,
  phone:string,
  address:string,
  about:string
}


const AntdFormikForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deliverMessage = async (values: valueprops, resetForm:()=>void) => {
    setLoading(true);
    const trimmedEmail = values.email.trim().toLowerCase();
    const formData={
      firstName:values.firstName,
      lastName:values.lastName,
      email:trimmedEmail,
      address:values.address,
      about:values.about
    }
    try {
      const emailExists = await checkEmailExists(formRef, trimmedEmail);
      if (emailExists) {
        toast.info('You have already submitted a form.');
        setLoading(false);
        return;
      }

      const docRef = await addDoc(formRef,formData);
      if (!docRef?.id) throw new Error('Error saving data');
      const response = await axios.post("http://localhost:5000/send_email", {
       
        subject: 'New Form Submission from Website:',
        message: `
          Name: ${values.firstName} ${values.lastName}<br/>
          Email: ${values.email}<br/>
          Phone: ${values.phone}<br/>
          Address: ${values.address}<br/>
          About: ${values.about}
        `,
        recipient_email:'jozzydgreat1@gmail.com'
      });
      console.log('Email sent successfully:', response.data);
      setLoading(false);
      toast.success('message sent succesfully');
      resetForm();
      navigate('/trinityfoundation')
    } catch (error) {
      console.error('Error sending email:', error);
      setLoading(false);
      toast.error('Error sending message');
      
    }
  };
  return (
  <section>
    <div className="container-fluid">

      
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        about: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {resetForm}) => {
        deliverMessage(values, resetForm);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <Form layout="vertical" onFinish={handleSubmit} style={{ maxWidth: 800, margin: "0 auto" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                required
                validateStatus={touched.firstName && errors.firstName ? "error" : ""}
                help={touched.firstName && errors.firstName ? errors.firstName : "Enter your first name here"}
              >
                <Input
                  name="firstName"
                  placeholder="John"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Last Name"
                required
                validateStatus={touched.lastName && errors.lastName ? "error" : ""}
                help={touched.lastName && errors.lastName ? errors.lastName : "Enter your last name here"}
              >
                <Input
                  name="lastName"
                  placeholder="Doe"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email Address"
            required
            validateStatus={touched.email && errors.email ? "error" : ""}
            help={touched.email && errors.email ? errors.email : "Example: user@website.com"}
          >
            <Input
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            help="Let us know how to get back to you."
          >
            <Input
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Your Address"
            required
            validateStatus={touched.address && errors.address ? "error" : ""}
            help={touched.address && errors.address ? errors.address : "Your Address?"}
          >
            <Input
              name="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item
            label="Tell us about yourself"
            required
            validateStatus={touched.about && errors.about ? "error" : ""}
            help={touched.about && errors.about ? errors.about : ""}
          >
            <Input.TextArea 

              style={{height:'200px'}}
              name="about"
              placeholder="Tell us about yourself"
              autoSize={{ minRows: 4, maxRows: 10 }} 
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item>
           
            <FlatButton title="submit" onClick={()=>handleSubmit} className="buttondark" disabled={loading}/>
          </Form.Item>
        </Form>
      )}
    </Formik>
  </div>
  </section>
  );
};

export default AntdFormikForm;
