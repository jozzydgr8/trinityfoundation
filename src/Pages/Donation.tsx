import { Col, Row } from "antd"
import DonationForm from "./DonationForm"
import demo from '../assets/happykids.jpg'

export const Donation = ()=>{
    const styles= {
        backcontainer:{
            backgroundImage:`url(${demo})`,
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center center',
            height:"100%"
        }
    }
    return(
        <section>
            <div className="container-fluid">
                <Row gutter={[16,12]}>
                    <Col lg={12} md={24} sm={24}>
                    <div style={styles.backcontainer}>

                    </div>
                    </Col>
                    <Col lg={12} md={24} sm={24}>
                    
                    <DonationForm/>
                    
                    </Col>
                </Row>
            </div>
        </section>
    )
}