import { useState } from "react";
import { Form, Input, Row, Col } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { FlatButton } from "../Shared/FlatButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),

  lastName: Yup.string().required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  phone: Yup.string(),

  address: Yup.string().required("Address is required"),

  about: Yup.string().required("Tell us about yourself"),
});

type ValueProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  about: string;
};

const AntdFormikForm = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const deliverMessage = async (
    values: ValueProps,
    resetForm: () => void
  ) => {
    setLoading(true);

    const trimmedEmail = values.email.trim().toLowerCase();

    const formData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: trimmedEmail,
      phone: values.phone.trim(),
      address: values.address.trim(),
      about: values.about.trim(),
    };

    try {
      const response = await fetch(
        "https://trinityarms.vercel.app/volunteers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit volunteer application"
        );
      }

      console.log("Volunteer created:", data);

      toast.success(
        "Volunteer application submitted successfully!"
      );

      resetForm();

      navigate("/");
    } catch (error) {
      console.error(
        "Error submitting volunteer application:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Error submitting application"
      );
    } finally {
      setLoading(false);
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
          onSubmit={(values, { resetForm }) => {
            deliverMessage(values, resetForm);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
          }) => (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              style={{
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              {/* First Name / Last Name */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    required
                    validateStatus={
                      touched.firstName && errors.firstName
                        ? "error"
                        : ""
                    }
                    help={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : "Enter your first name here"
                    }
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
                    validateStatus={
                      touched.lastName && errors.lastName
                        ? "error"
                        : ""
                    }
                    help={
                      touched.lastName && errors.lastName
                        ? errors.lastName
                        : "Enter your last name here"
                    }
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

              {/* Email */}
              <Form.Item
                label="Email Address"
                required
                validateStatus={
                  touched.email && errors.email
                    ? "error"
                    : ""
                }
                help={
                  touched.email && errors.email
                    ? errors.email
                    : "Example: user@website.com"
                }
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Phone */}
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

              {/* Address */}
              <Form.Item
                label="Your Address"
                required
                validateStatus={
                  touched.address && errors.address
                    ? "error"
                    : ""
                }
                help={
                  touched.address && errors.address
                    ? errors.address
                    : "Your Address?"
                }
              >
                <Input
                  name="address"
                  placeholder="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* About */}
              <Form.Item
                label="Tell us about yourself"
                required
                validateStatus={
                  touched.about && errors.about
                    ? "error"
                    : ""
                }
                help={
                  touched.about && errors.about
                    ? errors.about
                    : ""
                }
              >
                <Input.TextArea
                  style={{ height: "200px" }}
                  name="about"
                  placeholder="Tell us about yourself"
                  autoSize={{
                    minRows: 4,
                    maxRows: 10,
                  }}
                  value={values.about}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Submit */}
              <Form.Item>
                <FlatButton
                  title={
                    loading
                      ? "Submitting..."
                      : "Submit"
                  }
                  onClick={handleSubmit}
                  className="buttondark"
                  disabled={loading}
                />
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default AntdFormikForm;
