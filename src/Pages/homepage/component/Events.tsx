import { Col, Row } from "antd"
import eventOne from '../../../assets/womenmeeting.jpg';
import eventTwo from '../../../assets/fellowshipevent.jpg'; 
import eventThree from '../../../assets/funmievent.jpg';
import eventFour from '../../../assets/dolapoevent.jpg';
import eventFive from '../../../assets/tinuevent.jpg';
import eventSix from '../../../assets/soulevent.jpg';
import eventSeven from '../../../assets/yewandeevent.jpg';
import eventEight from '../../../assets/eventImage.jpg';

import eventEleven from '../../../assets/eventImageTwo.jpg';
import eventTwelve from '../../../assets/eventImageThree.jpg';
import eventThirteen from '../../../assets/eventImageFour.jpg';
import eventFourteen from '../../../assets/eventImageFive.jpg';
import logoone from '../../../assets/trinitychurchlogo.jpg';
import Marquee from "react-fast-marquee";


export const Events = () => {
const events = [
  eventOne,
  eventTwo,
  eventThree,
  eventFour,
  eventFive,
  eventSix,
  eventSeven,
  eventEight,
  eventEleven,
  eventTwelve,
  eventThirteen,
  eventFourteen,
];

const middle = Math.ceil(events.length / 2);

const firstRow = events.slice(0, middle);
const secondRow = events.slice(middle);
  // const styles = {
  //   container: {
  //     backgroundSize: 'contain',
  //     height: '200px',
  //     width: '100%',
  //     borderRadius: '20px',
  //     backgroundRepeat: 'no-repeat',
  //     backgroundPosition: 'center',
  //   },
  // };

  return (
    <section >
      <div className="container-fluid">
        <div className="text-center">
          <span className="homeBadgeParentAlt">our event</span>
        
          <h2 className="subheading" >Every event <span style={{color:'var(--color-navy)'}}>creates meaningful connections</span></h2> <br/>
        </div>  
        
        
  {/* First 4 events */}
  <Marquee
    speed={50}
    direction="left"
  
    gradient={false}
  >
    {firstRow.map((image, index) => (
     
        <img
      key={index}
      src={image}
      alt="event"
      className="marquee-image"
    />
      
 
    ))}
  </Marquee>

  {/* Remaining events */}
  <div style={{ marginTop: "24px" }}>
    <Marquee
      speed={50}
      direction="right"
    
      gradient={false}
    >
      {secondRow.map((image, index) => (
       <img
      key={index}
      src={image}
      alt="event"
      className="marquee-image"
    />
      ))}
    </Marquee>
  
    </div>

    {/* <div style={{marginTop:"20px"}}>
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
              </div> */}

        
      </div>
    </section>
  );
};
