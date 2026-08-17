import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Input, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { FlatButton } from "../../Shared/FlatButton";
import { AuthHooks } from "../Hooks/AuthHooks";

const { Text, Title } = Typography;

const COOLDOWN_DURATION = 120;
const STORAGE_KEY = "reset_password_cooldown";

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number"),
});

export default function Session() {
  const navigate = useNavigate();
  const { signInWithEmailAndPassword, forgotPassword } = AuthHooks();

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Restore password reset cooldown after page refresh
  useEffect(() => {
    const storedExpiry = localStorage.getItem(STORAGE_KEY);

    if (!storedExpiry) return;

    const expiresAt = Number(storedExpiry);
    const now = Math.floor(Date.now() / 1000);
    const remaining = expiresAt - now;

    if (remaining > 0) {
      setCooldown(remaining);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((previous) => {
        const next = previous - 1;

        if (next <= 0) {
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSignIn = async ({ email, password }: FormValues) => {
    await signInWithEmailAndPassword({
      email,
      password,
      setLoading,
    });
  };

  const handleForgotPassword = async (
    email: string,
    setFieldError: (field: string, message: string) => void
  ) => {
    try {
      await Yup.string()
        .email("Invalid email format")
        .required("Email is required")
        .validate(email);

      const expiresAt =
        Math.floor(Date.now() / 1000) + COOLDOWN_DURATION;

      localStorage.setItem(STORAGE_KEY, expiresAt.toString());
      setCooldown(COOLDOWN_DURATION);

      await forgotPassword(email);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setFieldError("email", error.message);
      }
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}
    >
      {(formik) => (
        <div
          style={{
            position: "absolute",
            inset: 0,
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
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CloseOutlined
                onClick={() => navigate("/")}
                style={{
                  fontSize: "24px",
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            </div>

            <Title level={3} style={{ marginBottom: 0 }}>
              Login
            </Title>

            <Text type="secondary" style={{ fontSize: "14px" }}>
              Welcome to Trinity Admin!
            </Text>

            <br />

            <Form
              layout="vertical"
              onFinish={formik.handleSubmit}
            >
              <Form.Item
                label="Email"
                validateStatus={
                  formik.touched.email && formik.errors.email
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.email
                    ? formik.errors.email
                    : undefined
                }
              >
                <Input
                  name="email"
                  placeholder="e.g. myemail@mail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.password
                    ? formik.errors.password
                    : undefined
                }
              >
                <Input.Password
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="custom-password"
                />
              </Form.Item>

              <FlatButton
                title="Sign In"
                type="submit"
                disabled={loading}
                className=" buttondark"
              />

              <FlatButton
                title="Reset Password"
                disabled={cooldown > 0}
                className="borderlessbtn"
                onClick={() =>
                  handleForgotPassword(
                    formik.values.email,
                    formik.setFieldError
                  )
                }
              />

              {cooldown > 0 && (
                <p>
                  Wait {cooldown}s before trying again
                </p>
              )}
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}