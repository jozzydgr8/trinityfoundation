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
import { Formik } from "formik";
import * as Yup from "yup";
import type { UploadFile } from "antd/es/upload/interface";

import { UploadFileStorage } from "../Shared/Hooks/UploadHooks";
import { FlatButton } from "../Shared/FlatButton";
import { UseDataContext } from "../Context/UseDataContext";
import { BlogHooks } from "./Hooks/BlogHooks";

const { Title, Paragraph } = Typography;

const styles = {
  icons: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "8px",
  },
};

export const AdminUpload: React.FC = () => {
  const { uploadFilesToStorage, handleFilesDelete } = UploadFileStorage();
  const { blog } = UseDataContext();
  const {postBlog, deleteBlog} = BlogHooks();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedArticles = blog
    ? blog.slice(startIndex, startIndex + pageSize)
    : [];

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    readingTime: Yup.number()
    .typeError("Reading time must be a number")
    .positive("Reading time must be greater than 0")
    .required("Reading time is required"),
  });

  /**
   * Prevent Ant Design from uploading automatically.
   * The selected file will be handled when the form is submitted.
   */
  const beforeUpload = (file: UploadFile) => {
    const isImage = file.type?.startsWith("image/");

    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const isUnder2MB =
      (file.size ?? 0) / 1024 / 1024 <= 2;

    if (!isUnder2MB) {
      message.error(`${file.name} is larger than 2MB.`);
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const handleFileChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(fileList.slice(-1));
  };

  return (
    <section>
      <div className="container-fluid">
        <div style={{ padding: "20px 0" }}>
          <h2>Upload New Event</h2>
        </div>

        <Formik
          initialValues={{
            title: "",
            excerpt: "",
              readingTime: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // Explicit check for file validation before calling your API hook
            if (fileList.length === 0) {
              alert("Please upload a featured image!"); // Or use your toast handler
              return;
            }
            postBlog({ values, setFileList, fileList, setLoading, resetForm });
          }}
        >
          {(formik) => (
            <Form
              layout="vertical"
              onFinish={formik.handleSubmit}
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
              }}
            >
              {/* TITLE */}
              <Form.Item
                label="Title"
                validateStatus={
                  formik.errors.title && formik.touched.title
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.title
                    ? formik.errors.title
                    : undefined
                }
              >
                <Input
                  name="title"
                  placeholder="Enter event title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* EXCERPT */}
              <Form.Item
                label="Excerpt"
                validateStatus={
                  formik.errors.excerpt && formik.touched.excerpt
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.excerpt
                    ? formik.errors.excerpt
                    : undefined
                }
              >
                <Input.TextArea
                  name="excerpt"
                  rows={4}
                  placeholder="Enter event description"
                  value={formik.values.excerpt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Reading Time (Minutes)"
                validateStatus={
                  formik.errors.readingTime &&
                  formik.touched.readingTime
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.readingTime
                    ? formik.errors.readingTime
                    : undefined
                }
              >
                <Input
                  name="readingTime"
                  type="number"
                  min={1}
                  placeholder="e.g. 5"
                  value={formik.values.readingTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* IMAGE */}
              <Form.Item label="Event Image">
                <Upload.Dragger
                  accept="image/*"
                  multiple={false}
                  maxCount={1}
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                  showUploadList
                  listType="picture"
                >
                  <p>
                    <UploadOutlined
                      style={{
                        fontSize: "30px",
                        color: "#8e1670",
                      }}
                    />
                  </p>

                  <p>
                    Click or drag an image to this area
                  </p>

                  <p
                    style={{
                      color: "#888",
                      fontSize: "12px",
                    }}
                  >
                    Maximum file size: 2MB
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <br />

              {/* SUBMIT */}
              <FlatButton
                title="Add Event"
                className="btn buttondark"
                disabled={loading}
                type="submit"
              />
            </Form>
          )}
        </Formik>

        {/* EVENTS LIST */}
        <div style={{ marginTop: "3rem" }}>
          <h2>News & Events</h2>

          {blog && blog.length > 0 ? (
            <>
              <Row gutter={[16, 24]}>
                {paginatedArticles.map((article) => (
                  <Col
                    key={article._id}
                    lg={8}
                    md={12}
                    sm={24}
                  >
                    <Title
                      level={4}
                      style={{ marginTop: "1rem" }}
                    >
                      {article.title}
                    </Title>

                    <div style={styles.icons}>
                      <CalendarOutlined />
                      <span>{article.createdAt}</span>
                    </div>

                    <div style={styles.icons}>
                      <UserOutlined />
                      <span>By Trinity Foundation</span>
                    </div>

                    <Paragraph>
                      {article.excerpt?.slice(0, 100)}
                      {article.excerpt?.length > 100 ? "..." : ""}
                    </Paragraph>

                    <Popconfirm
                      title="Are you sure you want to delete this event?"
                      onConfirm={() =>
                        deleteBlog(article._id)
                      }
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

              {blog.length > pageSize && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={blog.length}
                    onChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                marginTop: "2rem",
                textAlign: "center",
              }}
            >
              <Empty description="This is where all news posted will appear" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};