import { Col, Row } from "antd"
import eventOne from '../../assets/womenmeeting.jpg';
import eventTwo from '../../assets/fellowshipevent.jpg'; 
import eventThree from '../../assets/funmievent.jpg';
import eventFour from '../../assets/dolapoevent.jpg';
import eventFive from '../../assets/tinuevent.jpg';
import eventSix from '../../assets/soulevent.jpg';
import eventSeven from '../../assets/yewandeevent.jpg';
import logoone from '../../assets/trinitychurchlogo.jpg';

export const Events = () => {
  const styles = {
    container: {
      backgroundSize: 'contain',
      height: '200px',
      width: '100%',
      borderRadius: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  };

  return (
    <section >
      <div className="container-fluid">
        <h2>Events</h2> <br/>

        <Row gutter={[16, 24]}>
          {[
            eventOne,
            eventTwo,
            eventThree,
            eventFour,
            eventFive,
            eventSix,
            eventSeven,
          ].map((image, index) => (
            <Col xs={12} sm={12} md={8} lg={6} key={index}>
              <div
                style={{
                  ...styles.container,
                  backgroundImage: `url(${image})`,
                }}
              ></div>
            </Col>
          ))}
        </Row>

        <div style={{marginTop:"20px"}}>
            <h2>In Partner with</h2>
            <Row align={'middle'} justify={'center'}>
                {[logoone].map((image, index) => (
            <Col xs={12} sm={12} md={8} lg={6} key={index} style={{
              display:"flex",
              justifyContent:'center'}}>
              <div
                style={{
                  ...styles.container,
                  backgroundImage: `url(${image})`,
                  height:"150px",
                  width:'150px',
                 
                }}
              ></div>
            </Col>
          ))}
            </Row>
        </div>
        
      </div>
    </section>
  );
};
