import { Table} from "antd";
import { useState } from "react";

import { SendMessage } from "./SendMessage";
import { UseDataContext } from "../../Context/UseDataContext";

export const DonationTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const {donors} = UseDataContext();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (text: string) => `${text?.slice(0, 3)}...`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => `${text?.slice(0, 5)}...`,
    },
    {
      title: "Amnt",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title:'Cur',
      dataIndex:"currency",
      key:"currency",
    },
  ];

  

  const handleRowClick = (record: any) => {
    setSelectedEmail(record.email);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table
        dataSource={donors ?? []}
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
