import { useState } from "react";
import { Table, Modal, Descriptions, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { UseDataContext } from "../Context/UseDataContext";
import { SendMessage } from "./Component/SendMessage";

interface Volunteer {
  key?: number;
  about?: string;
  address: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const Volunteers = () => {
  const { volunteers } = UseDataContext();
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false); // ✅ New state for SendMessage modal

  const columns: ColumnsType<Volunteer> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
    },
  ];

  const handleRowClick = (record: Volunteer) => {
    setSelectedVolunteer(record);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table<Volunteer>
        columns={columns}
        dataSource={(volunteers || []).map((v, index) => ({ ...v, key: index }))}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      {/* Volunteer Detail Modal */}
      <Modal
        title="Volunteer Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
          <Button
            key="send"
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
              setIsSendMessageOpen(true);
            }}
          >
            Send Email
          </Button>,
        ]}
      >
        {selectedVolunteer && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="First Name">{selectedVolunteer.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{selectedVolunteer.lastName}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedVolunteer.email}</Descriptions.Item>
            <Descriptions.Item label="Address">{selectedVolunteer.address}</Descriptions.Item>
            <Descriptions.Item label="About">{selectedVolunteer.about?.slice(0,10)}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* SendMessage Modal */}
      {selectedVolunteer && (
        <SendMessage
          isModalOpen={isSendMessageOpen}
          setIsModalOpen={setIsSendMessageOpen}
          selectedEmail={selectedVolunteer.email}
        />
      )}
    </>
  );
};
