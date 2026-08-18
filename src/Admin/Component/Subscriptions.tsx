import { Table } from "antd";
import { useState } from "react";
import { SendMessage } from "./SendMessage";
import { UseDataContext } from "../../Context/UseDataContext";
import { formatDate } from "../../Shared/Hooks/FormatDate";

export const Subscriptions: React.FC = () => {
  const {subscribers} = UseDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
    
  
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "column1",
      render: (createdAt: string) => formatDate({ createdAt }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "column2",
    },
  ];
  const handleRowClick = (record: any) => {
    setSelectedEmail(record.email);
    setIsModalOpen(true);
  };
  return (
    <>
    <Table
      dataSource={subscribers ?? []}
      columns={columns}
      pagination={{ pageSize: 5 }}
        rowKey={(record) => record.email} // Ensures a unique key
        onRow={(record) => ({
            onClick: () => handleRowClick(record),
        })}
    />

    <SendMessage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEmail={selectedEmail}/>
    </>
  );
};
