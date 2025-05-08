import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const deliverNewsLetter = async(values:valueprops)=>{
    try{
      const response = await axios.post("http://localhost:5000/send_newsletter", {
             
              subject: values.subject,
              message: values.message,
              recipient_email: Array.isArray(selectedEmail) ? selectedEmail : [selectedEmail]

            });
    }catch(error){
      console.error(error)
    }
  }
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
 