import { Input } from "antd";
import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import { FlatButton } from "../../Shared/FlatButton";
import { AuthHooks } from "../Hooks/AuthHooks";
import * as Yup from 'yup'





export const ResetPassword = () => {
  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");
  const { resetPassword } = AuthHooks();
  const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&^#()[\]{}|\\/'"<>,.:;+=_-]/, "Password must contain at least one special character"),
});

  return (
    <Formik
      initialValues={{ newPassword: "" }}
      validationSchema={resetPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        const { newPassword } = values;
        await resetPassword({ email, token, newPassword, resetForm });

        }}

    >
      {(props) => (
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
    <form onSubmit={props.handleSubmit}>
        <h2>Reset Password for {email}</h2>
        <Input.Password
            name="newPassword"
            type="password"
            onChange={props.handleChange}
            value={props.values.newPassword}
            placeholder="Input new password"
        />
        {props.errors.newPassword && props.touched.newPassword && (
            <div style={{ color: "red" }}>{props.errors.newPassword}</div>
        )}
      <FlatButton
        type="submit"
        className="buttondark mt-2"
        title="submit"
        
        />

    </form>
        </div>
      )}
    </Formik>
  );
};