import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UseDataContext } from "../../Context/UseDataContext";
import { UseAuthContext } from "../../Context/UseAuthContext";

const API_URL = "https://trinityarms.vercel.app";

type PostValues = {
  title: string;
  excerpt: string;
  readingTime: string;
};

type PostBlogProps = {
  values: PostValues;
  fileList: UploadFile[];
  resetForm: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFileList: React.Dispatch<
    React.SetStateAction<UploadFile[]>
  >;
};

type UpdateValues = {
  title?: string;
  excerpt?: string;
  readingTime?: string;
};

type UpdateBlogProps = {
  values: UpdateValues;
  title: string;
  excerpt: string;
  readingTime: string | number;
  _id: string;
  fileList: UploadFile[];
  handleCloseModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BlogHooks = () => {
  const { dispatch } = UseDataContext();
  const { user } = UseAuthContext();
  const navigate = useNavigate();

  /**
   * CREATE BLOG / EVENT
   */
  const postBlog = async ({
    values,
    fileList,
    setFileList,
    setLoading,
    resetForm,
  }: PostBlogProps) => {
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
      formData.append("excerpt", values.excerpt);
      formData.append("readingTime", values.readingTime);
      formData.append("image", file);

      const response = await fetch(`${API_URL}/blog`, {
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

      console.log("Event added:", data);

      dispatch({
        type: "addBlog",
        payload: data,
      });

      resetForm();
      setFileList([]);

      toast.success("Event uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE BLOG / EVENT
   */
  const deleteBlog = async (_id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/blog/${_id}`,
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
          data?.message || "Error deleting event"
        );
      }

      dispatch({
        type: "deleteBlog",
        payload: _id,
      });

      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Error deleting event"
      );
    }
  };

  /**
   * UPDATE BLOG / EVENT
   */
  const blogUpdate = async ({
    setLoading,
    values,
    fileList,
    title,
    excerpt,
    readingTime,
    _id,
    handleCloseModal,
  }: UpdateBlogProps) => {
    setLoading(true);

    try {
      const formData = new FormData();

      // Title
      if (
        values.title !== undefined &&
        values.title !== title
      ) {
        formData.append("title", values.title);
      }

      // Excerpt
      if (
        values.excerpt !== undefined &&
        values.excerpt !== excerpt
      ) {
        formData.append("excerpt", values.excerpt);
      }

      // Reading time
      if (
        values.readingTime !== undefined &&
        String(values.readingTime) !== String(readingTime)
      ) {
        formData.append(
          "readingTime",
          String(values.readingTime)
        );
      }

      // New image
      const file = fileList[0]?.originFileObj;

      if (file) {
        formData.append("image", file);
      }

      // Nothing changed
      if (formData.keys().next().done) {
        toast.info("No changes to update");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/blog/${_id}`,
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
          data?.message || "Failed to update event"
        );
      }

      dispatch({
        type: "updateBlog",
        payload: data,
      });

      toast.success("Event updated successfully");

      handleCloseModal();
    } catch (error) {
      console.error("Update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Error updating event"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    postBlog,
    deleteBlog,
    blogUpdate,
  };
};