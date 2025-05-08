import { Table} from "antd";
import { useState } from "react";

import { donationData } from "../../Shared/globals";
import { SendMessage } from "./SendMessage";

export const DonationTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

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
        dataSource={donationData}
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
