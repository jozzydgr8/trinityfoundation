import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FlatButton } from "../Shared/FlatButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { auth } from "../App";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const { Title, Text } = Typography;
const db = getFirestore(); // Firestore instance

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

type FormikValues = {
  email: string;
};

export default function AcceptAdmin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (
    values: FormikValues,
    { resetForm }: any
  ) => {
    setLoading(true);
    setError(null);

    const defaultPassword = process.env.REACT_APP_DEFAULT_ADMIN_PASSWORD;

    if (!defaultPassword) {
      setError("Default password is not set.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        defaultPassword
      );

      // Add user to Firestore
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        admin: true,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleCreateAccount}
    >
      {(formik) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            height: "100vh",
          }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <div style={{ position: "relative", textAlign: "right" }}>
              <CloseOutlined
                onClick={() => navigate("/admin")}
                style={{
                  fontSize: "24px",
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            </div>

            <Title level={3}>Create Admin Account</Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              Email will be used with a default admin password.
            </Text>
            <br />

            {error && <Text type="danger">{error}</Text>}
            {success && (
              <Text type="success">Admin account created successfully!</Text>
            )}

            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label="Email"
                validateStatus={
                  formik.errors.email && formik.touched.email ? "error" : ""
                }
                help={formik.touched.email && formik.errors.email}
              >
                <Input
                  name="email"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <FlatButton
                title="Create Admin"
                onClick={formik.handleSubmit}
                disabled={loading}
                className="buttondark"
              />
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
