import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-toastify";

import { UseDataContext } from "../../Context/UseDataContext";
import { UseAuthContext } from "../../Context/UseAuthContext";

const API_URL = "https://trinityarms.vercel.app";

type ProductValues = {
  title: string;
  category: string;
  link: string;
  description: string;
};

type PostProductProps = {
  values: ProductValues;
  fileList: UploadFile[];
  resetForm: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFileList: React.Dispatch<
    React.SetStateAction<UploadFile[]>
  >;
};

type UpdateProductValues = {
  title?: string;
  category?: string;
  link?: string;
  description?: string;
};

type UpdateProductProps = {
  values: UpdateProductValues;
  title: string;
  category: string;
  link: string;
  description: string;
  _id: string;
  fileList: UploadFile[];
  handleCloseModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductHooks = () => {
  const { dispatch } = UseDataContext();
  const { user } = UseAuthContext();

  /**
   * CREATE PRODUCT
   */
  const postProduct = async ({
    values,
    fileList,
    setFileList,
    setLoading,
    resetForm,
  }: PostProductProps) => {
    if (fileList.length === 0) {
      toast.error("Please select an image to upload");
      return;
    }

    const file = fileList[0]?.originFileObj;

    if (!file) {
      toast.error("Unable to read the selected image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("link", values.link);
      formData.append("description", values.description);
      formData.append("image", file);

      const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Server responded with status ${response.status}`
        );
      }

      console.log("Product added:", data);

      dispatch({
        type: "addProduct",
        payload: data,
      });

      resetForm();
      setFileList([]);

      toast.success("Product uploaded successfully!");
    } catch (error) {
      console.error("Product upload failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Product upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE PRODUCT
   */
  const deleteProduct = async (_id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/product/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Error deleting product"
        );
      }

      dispatch({
        type: "deleteProduct",
        payload: _id,
      });

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Error deleting product"
      );
    }
  };

  /**
   * UPDATE PRODUCT
   */
  const productUpdate = async ({
    setLoading,
    values,
    fileList,
    title,
    category,
    link,
    description,
    _id,
    handleCloseModal,
  }: UpdateProductProps) => {
    setLoading(true);

    try {
      const formData = new FormData();

      /**
       * TITLE
       */
      if (
        values.title !== undefined &&
        values.title !== title
      ) {
        formData.append("title", values.title);
      }

      /**
       * CATEGORY
       */
      if (
        values.category !== undefined &&
        values.category !== category
      ) {
        formData.append(
          "category",
          values.category
        );
      }

      /**
       * LINK
       */
      if (
        values.link !== undefined &&
        values.link !== link
      ) {
        formData.append("link", values.link);
      }

      /**
       * DESCRIPTION
       */
      if (
        values.description !== undefined &&
        values.description !== description
      ) {
        formData.append(
          "description",
          values.description
        );
      }

      /**
       * NEW IMAGE
       */
      const file = fileList[0]?.originFileObj;

      if (file) {
        formData.append("image", file);
      }

      /**
       * NOTHING CHANGED
       */
      if (formData.keys().next().done) {
        toast.info("No changes to update");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/product/${_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update product"
        );
      }

      dispatch({
        type: "updateProduct",
        payload: data,
      });

      toast.success(
        "Product updated successfully"
      );

      handleCloseModal();
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating product"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    postProduct,
    deleteProduct,
    productUpdate,
  };
};