import {
  Form,
  Input,
  Row,
  Col,
  Pagination,
  Typography,
  message,
  Popconfirm,
  Empty,
  Upload,
  Button,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UploadFileStorage } from "./Hooks/UploadHooks";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { colRef, db } from "../App";
import { FlatButton } from "../Shared/FlatButton";
import { UseDataContext } from "../Context/UseDataContext";

const { Title, Paragraph } = Typography;

const styles = {
  icons: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "8px",
  },
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

export const AdminUpload: React.FC = () => {
  const { uploadFilesToStorage, handleFilesDelete } = UploadFileStorage();
  const { data } = UseDataContext();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = data
    ? data.slice(startIndex, startIndex + pageSize)
    : [];

  // Validate each file
  const beforeUpload = (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const isUnder2MB = file.size / 1024 / 1024 <= 2;
    if (!isUnder2MB) {
      message.error(`${file.name} is larger than 2MB.`);
      return Upload.LIST_IGNORE;
    }

    const totalFiles = fileList.length + 1;
    if (totalFiles > 10) {
      message.error("You can only upload up to 10 files.");
      return Upload.LIST_IGNORE;
    }


    return true;
  };

  const handleFileChange = (info: any) => {
    const validFiles = info.fileList.filter((file: any) => file.type.startsWith("image/"));

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    setFileList(validFiles);
  };



  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      let filesData: { url: string; imagePath: string; }[] =[]
      try {
        
        if(fileList){
           filesData = await uploadFilesToStorage(fileList);
        }
       
        const newArticle = {
          title: values.title,
          description: values.description,
          date: formatDate(new Date()),
          files: filesData,
        };

        const docRef = await addDoc(colRef, newArticle);
        console.log("Document written with ID:", docRef.id);
        message.success("Event added successfully!");
        resetForm();
        setFileList([]);
      } catch (error) {
        console.log(error);
        message.error("Something went wrong!");
      }
      setLoading(false);
    },
  });

  return (
    <section>
      <div className="container-fluid">
        <div style={{ padding: "20px 0" }}>
          <h2>Upload New Events</h2>
        </div>

        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Title"
            validateStatus={formik.errors.title && formik.touched.title ? "error" : ""}
            help={formik.touched.title && formik.errors.title}
          >
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter title"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            validateStatus={formik.errors.description && formik.touched.description ? "error" : ""}
            help={formik.touched.description && formik.errors.description}
          >
            <Input.TextArea
              rows={4}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter description"
            />
          </Form.Item>

          {/* File Upload */}
          <Form.Item label="Upload Images">
            <Upload.Dragger
              accept="image/*"
              multiple
              maxCount={10}
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={beforeUpload}
              showUploadList
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Drag or Click to Upload</Button>
            </Upload.Dragger>
          </Form.Item>

          <FlatButton
            onClick={formik.handleSubmit}
            title="Submit"
            className="buttondark"
            disabled={loading}
          />
        </Form>

        {/* Events Listing */}
        <div style={{ marginTop: "3rem" }}>
          <h2>News & Events</h2>
          {data && data.length > 0 ? (
            <>
              <Row gutter={[16, 24]}>
                {paginatedArticles.map((article, index) => (
                  <Col key={index} lg={8} md={12} sm={24}>
                    <Title level={4} style={{ marginTop: "1rem" }}>
                      {article.title}
                    </Title>

                    <div style={styles.icons}>
                      <CalendarOutlined />
                      <span>{article.date}</span>
                    </div>

                    <div style={styles.icons}>
                      <UserOutlined />
                      <span>By Trinity Foundation</span>
                    </div>

                    <Paragraph>{article.description}</Paragraph>

                    <Popconfirm
                      title="Are you sure you want to delete this event?"
                      onConfirm={() => handleFilesDelete(article, article.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span>
                        <FlatButton
                          className="buttondark"
                          title="Delete Event"
                          onClick={() => {}}
                        />
                      </span>
                    </Popconfirm>
                  </Col>
                ))}
              </Row>

              {data.length > pageSize && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          ) : (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <Empty description="This is where all news posted will be" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
