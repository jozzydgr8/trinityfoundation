import { Table } from "antd";
import { useState } from "react";
import { SendMessage } from "./SendMessage";
import { UseDataContext } from "../../Context/UseDataContext";

export const Subscriptions: React.FC = () => {
  const {subscribers} = UseDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
    
  
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "column1",
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
