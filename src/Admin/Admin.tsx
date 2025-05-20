import { Col, Row } from "antd";
import { FlatButton } from "../Shared/FlatButton";
import { DonationTable } from "./Component/DonationTable";
import { Subscriptions } from "./Component/Subscriptions";
import { useNavigate } from "react-router-dom";
import { SendMessage } from "./Component/SendMessage";
import { useState } from "react";
import { UseDataContext } from "../Context/UseDataContext";


export const Admin = () => {
  const navigate = useNavigate();
  const {subscribers} = UseDataContext();

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
    const allEmails = subscribers?.map(subscriber => subscriber.email);
    setSelectedEmails(allEmails || []); // store all emails
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
              onClick={() => navigate('/admin/upload')} 
              className="buttonsuccess" 
            />
          </Col>
        </Row>

            <div style={styles.container}>
              <h3>Donations</h3>
              <DonationTable />
            </div>
          
  
            <div style={styles.container}>
              <h3>Subscribed Users</h3>
              <Subscriptions />
            </div>
          </div>
        
    </section>
  );
};
