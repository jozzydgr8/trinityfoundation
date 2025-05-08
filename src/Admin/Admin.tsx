import { Col, Row } from "antd";
import { FlatButton } from "../Shared/FlatButton";
import { DonationTable } from "./Component/DonationTable";
import { Subscriptions } from "./Component/Subscriptions";
import { useNavigate } from "react-router-dom";
import { SendMessage } from "./Component/SendMessage";
import { useState } from "react";
import { newsletterSubscribers } from "../Shared/globals";

export const Admin = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]); // ⬅️ store multiple emails

  const styles = {
    container: {
      background: "#fff",
      borderRadius: "13px",
      padding: "20px",
      margin: "20px 0",
    },
  };

  

  const handleSendNewsletter = () => {
    const allEmails = newsletterSubscribers.map(subscriber => subscriber.email);
    setSelectedEmails(allEmails); // store all emails
    setIsModalOpen(true); // open the modal
  };

  return (
    <section>
      <div className="container-fluid">
        <h1>Dashboard</h1>

        <Row gutter={[16, 24]}>
          <Col>
            <FlatButton 
              title="Send Newsletter" 
              onClick={handleSendNewsletter} 
              className="buttondark" 
            />
            <SendMessage 
              isModalOpen={isModalOpen} 
              setIsModalOpen={setIsModalOpen} 
              selectedEmail={selectedEmails} 
            />
          </Col>

          <Col>
            <FlatButton 
              title="Upload Events" 
              onClick={() => navigate('/trinityfoundation/admin/upload')} 
              className="buttonsuccess" 
            />
          </Col>
        </Row>

        <div className="row">
          <div className="col-md-6">
            <div style={styles.container}>
              <h3>Donations</h3>
              <DonationTable />
            </div>
          </div>
          <div className="col-md-6">
            <div style={styles.container}>
              <h3>Subscribed Users</h3>
              <Subscriptions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
