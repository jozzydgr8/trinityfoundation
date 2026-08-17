import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { UseAuthContext } from "../../Context/UseAuthContext";

type proptype = {
  selectedEmail: string | string[];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type valueprops = {
  subject:string,
  message:string
}

export const SendMessage = ({ selectedEmail, isModalOpen, setIsModalOpen }: proptype) => {
  const {user}=UseAuthContext();
  const deliverNewsLetter = async (values: valueprops) => {
    console.log(selectedEmail)
  try {
    const response = await fetch(
      "https://trinityarms.vercel.app/message/send_newsletter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          subject: values.subject,
          message: values.message,
          recipient_email: Array.isArray(selectedEmail)
            ? selectedEmail
            : [selectedEmail],
        }),
      }
    );

    // fetch doesn't throw on 400/500 errors, so check manually
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    toast.success("Email sent successfully!");
    console.log(data);
  } catch (error) {
    console.error("Newsletter error:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};

  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async(values, { resetForm }) => {
      console.log("Sending Email to:", selectedEmail);
      console.log("Form values:", values);

      // Here you can call your email sending function/API
      deliverNewsLetter(values);
      setIsModalOpen(false);
      resetForm();
    },
  });

  // 👇 Determine title
  const modalTitle = Array.isArray(selectedEmail)
    ? selectedEmail.length > 1
      ? "Send Email to All Subscribers"
      : `Send Email to ${selectedEmail[0]}`
    : `Send Email to ${selectedEmail}`;

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Subject"
          validateStatus={formik.errors.subject && formik.touched.subject ? "error" : ""}
          help={formik.touched.subject && formik.errors.subject}
        >
          <Input
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Message"
          validateStatus={formik.errors.message && formik.touched.message ? "error" : ""}
          help={formik.touched.message && formik.errors.message}
        >
          <Input.TextArea
            rows={4}
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Send Email
        </Button>
      </Form>
    </Modal>
  );
};
 