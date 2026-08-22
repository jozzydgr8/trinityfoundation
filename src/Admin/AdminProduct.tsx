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
} from "antd";
import {
  LinkOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import type { UploadFile } from "antd/es/upload/interface";

import { FlatButton } from "../Shared/FlatButton";
import { UseDataContext } from "../Context/UseDataContext";
import { ProductHooks } from "./Hooks/ProductHook";

const { Title, Paragraph } = Typography;

export const AdminProduct: React.FC = () => {
  const { products } = UseDataContext();

  const { postProduct, deleteProduct } = ProductHooks();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedProducts = products
    ? products.slice(startIndex, startIndex + pageSize)
    : [];

  /**
   * PRODUCT VALIDATION
   */
  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required("Product title is required"),

    category: Yup.string()
      .trim()
      .required("Product category is required"),

    link: Yup.string()
      .url("Please enter a valid URL")
      .required("Product link is required"),

    description: Yup.string()
      .trim()
      .max(
        411,
        "Description cannot be more than 411 characters"
      )
      .required("Product description is required"),
  });

  /**
   * Prevent Ant Design from uploading automatically.
   * The selected image will be handled by ProductHooks.
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

        {/* HEADER */}
        <div style={{ padding: "20px 0" }}>
          <h2>Upload New Product</h2>
        </div>

        {/* PRODUCT FORM */}
        <Formik
          initialValues={{
            title: "",
            category: "",
            link: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (fileList.length === 0) {
              message.error(
                "Please upload a product image!"
              );
              return;
            }

            postProduct({
              values,
              fileList,
              setFileList,
              setLoading,
              resetForm,
            });
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
                label="Product Title"
                validateStatus={
                  formik.errors.title &&
                  formik.touched.title
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
                  placeholder="Enter product title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* CATEGORY */}
              <Form.Item
                label="Product Category"
                validateStatus={
                  formik.errors.category &&
                  formik.touched.category
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.category
                    ? formik.errors.category
                    : undefined
                }
              >
                <Input
                  name="category"
                  placeholder="Enter product category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* LINK */}
              <Form.Item
                label="Product Link"
                validateStatus={
                  formik.errors.link &&
                  formik.touched.link
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.link
                    ? formik.errors.link
                    : undefined
                }
              >
                <Input
                  name="link"
                  prefix={<LinkOutlined />}
                  placeholder="https://example.com/product"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* DESCRIPTION */}
              <Form.Item
                label="Product Description"
                validateStatus={
                  formik.errors.description &&
                  formik.touched.description
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.description
                    ? formik.errors.description
                    : undefined
                }
              >
                <Input.TextArea
                  name="description"
                  rows={5}
                  placeholder="Enter product description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={411}
                  showCount
                />
              </Form.Item>

              {/* IMAGE */}
              <Form.Item label="Product Image">
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
                    Click or drag a product image
                    to this area
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
                title="Add Product"
                className="btn buttondark"
                disabled={loading}
                type="submit"
              />
            </Form>
          )}
        </Formik>

        {/* PRODUCTS LIST */}
        <div style={{ marginTop: "3rem" }}>
          <h2>Products</h2>

          {products && products.length > 0 ? (
            <>
              <Row gutter={[16, 24]}>
                {paginatedProducts.map((product) => (
                  <Col
                    key={product._id}
                    lg={8}
                    md={12}
                    sm={24}
                  >
                    {/* PRODUCT IMAGE */}
                    <div
                      style={{
                        width: "100%",
                        height: "220px",
                        overflow: "hidden",
                        borderRadius: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      <img
                        src={product.featuredImage}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* TITLE */}
                    <Title
                      level={4}
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {product.title}
                    </Title>

                    {/* CATEGORY */}
                    <Paragraph
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <strong>Category:</strong>{" "}
                      {product.category}
                    </Paragraph>

                    {/* LINK */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <LinkOutlined />

                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Product
                      </a>
                    </div>

                    {/* DESCRIPTION */}
                    <Paragraph>
                      {product.description?.slice(0, 100)}
                      {product.description?.length > 100
                        ? "..."
                        : ""}
                    </Paragraph>

                    {/* DELETE */}
                    <Popconfirm
                      title="Are you sure you want to delete this product?"
                      onConfirm={() =>
                        deleteProduct(product._id)
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <span>
                        <FlatButton
                          className="buttondark"
                          title="Delete Product"
                          onClick={() => {}}
                        />
                      </span>
                    </Popconfirm>
                  </Col>
                ))}
              </Row>

              {/* PAGINATION */}
              {products.length > pageSize && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.length}
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
              <Empty description="This is where all products will appear" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};