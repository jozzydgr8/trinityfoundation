import { Space } from "antd"
import {Row, Col} from 'antd'
import {DollarCircleOutlined, UsergroupAddOutlined, UserAddOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

const styles = {
    clickable:{
        fontSize:'33px',
        padding:'20px',
        fontWeight:'bold',
        borderRadius:'15px',
        cursor:'pointer'
    }
}
export const Vision = ()=>{
    const navigate=useNavigate();
    return(
        <section>
            <div className="container-fluid">
                <h2>Our Vision</h2>
                <p>
                At The Trinity Arms Foundation, our vision is to create a compassionate and inclusive community 
                where everyone, regardless of race, gender, or background, receives the emotional support and 
                resources they need to thrive. We are dedicated to empowering individuals, uplifting the less 
                privileged, and fostering positive change by providing assistance, encouragement, and hope. 
                Our mission is to be a beacon of love, care, and generosity, transforming lives and building stronger communities.
                </p>
                <Row justify="center" align="middle" >
                <Col >
                <Space wrap size={[16, 16]} align="center" >
                <div style={styles.clickable} className="buttondark" onClick={()=>navigate('/donate')}>
                    <DollarCircleOutlined /> Donate now
                </div>
                <div style={styles.clickable} className="buttondark" onClick={()=>navigate('/sendform')}>
                    <UserAddOutlined /> Volunteer
                </div>
                <div style={styles.clickable} className="buttondark" onClick={()=>navigate('/sendform')}>
                    <UsergroupAddOutlined/> Partnership
                </div>
                </Space>
                </Col>
                </Row>
                
            </div>
        </section>
    )
}