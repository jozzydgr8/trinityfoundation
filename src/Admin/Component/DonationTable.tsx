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
      title: "Name",
      dataIndex: "donorName",
      key: "donorName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
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
