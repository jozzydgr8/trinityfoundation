import {  DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, Spin } from "antd";
import { useState } from "react";
import { UseDataContext } from "../Context/UseDataContext";
import { UseAuthContext } from "../Context/UseAuthContext";

export const AdminUsers = () => {
  const { adminUsers, dispatch } = UseDataContext();
  const { user } = UseAuthContext();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      const response = await fetch(
        `https://trinityarms.vercel.app/user/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const json = await response.json();

        if (!response.ok) {
      throw new Error(
        json.error || "An error occurred while deleting the user"
      );
    }

      

      dispatch({
        type: "deleteadmin",
        payload: id
      });

      message.success("Admin user deleted successfully");
    } catch (error) {
  console.error("Error deleting admin:", error);

  message.error(
    error instanceof Error
      ? error.message
      : "Failed to delete admin user"
  );
}
 finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <div className="container-fluid">
        {adminUsers?.map((admin) => {
          const isDeleting = deletingId === admin._id;

          return (
            <div
              key={admin._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{admin.email}</span>

              {
                !admin.superadmin &&
                <Popconfirm
                title="Delete admin user?"
                description="Are you sure you want to delete this admin user?"
                okText="Yes"
                cancelText="No"
                okButtonProps={{ danger: true }}
                disabled={isDeleting}
                onConfirm={() => handleDelete(admin._id)}
              >
                {isDeleting ? (
                  <Spin size="small" />
                ) : (
                  <DeleteOutlined
                    style={{
                      color: "#ff4d4f",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Popconfirm>
              }
            </div>
          );
        })}
      </div>
    </section>
  );
};