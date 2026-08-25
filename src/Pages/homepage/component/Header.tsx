import { useEffect, useState } from "react";
import { backgroundimages } from "../../../Shared/globals";
import { FlatButton } from "../../../Shared/FlatButton";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import {RightOutlined, HeartOutlined, TeamOutlined, SmileOutlined} from '@ant-design/icons'
import { TransitionSectionSvg } from "../../../Shared/TransitionSectionSvg";


export const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  const interval = setInterval(() => {
    setFade(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % backgroundimages.length
      );
      setFade(true);
    }, 1000);

  }, 5000);

  return () => clearInterval(interval);
}, []);

  useEffect(()=>{
    var container = document.querySelector('.headerWrite');
    var containerButton = document.querySelector('.headerbutton');
    container?.classList.add('sectionAnimationDown');
    containerButton?.classList.add('sectionAnimationUp')
},[])


  const currentBackground = backgroundimages[currentIndex].background;
  
  return (
  <section
  id="hero"
  style={{
    position: "relative",
    

    overflow: "hidden",
  }}
>
      <div className='container-fluid d-flex align-items-center'
      style={{
          backgroundImage: `
          linear-gradient(to top, var(--color-navy-midnight) 0%, transparent 100%),
          url(${currentBackground})
        `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
//             filter: fade ? "blur(0px)" : "blur(8px)",
          transition: "backgroundImage 2s ease",
          minHeight:'100vh',
        }}>
        
        <div style={{
          position:'relative',
          zIndex:'1',
        }} >

        <div className='row' >

              <div className='col-md-8'>
                 <div className="heroBadge">
                                
                  <span className='homeBadgeParent '> 
                      <span className='homeBadge'></span>
                          UK Registered Charity - 1212048
                      </span>
                  </div>
                  <br/>
                  <h1>
                  Making a difference <br/><span style={{color:'var(--color-gold-dark)'}}>one heart, one life at a time.</span>
                  </h1>
                  <p className="subtopic">
                  The Trinity Arms Foundation is a charity organisation 
                  registered in the united Kingdom committed to making a lasting impact both locally and beyond. 
                  </p>
                  <Space wrap={true} className="headerbutton">
                    <FlatButton title="Learn about our mission" className="buttondark btn-xl" onClick={()=>navigate('/sendform')}/>
                
                    <FlatButton title="Support Our work" iconTwo={<HeartOutlined/>} icon={<RightOutlined /> } className="buttonsuccess btn-xl" onClick={()=>navigate('/donate')}/>
                  </Space>
                  

                  <div className="row heroBottom mt-4">
                    <div className="col-md-4 mb-2">
                        <small style={{display:"flex", gap:'12px'}}><SmileOutlined style={{color:'var(--color-gold)'}}/> Registered UK Charity</small>
                    </div>
                    <div className="col-md-4 mb-2">
                        <small style={{display:"flex", gap:'12px'}}><TeamOutlined style={{color:'var(--color-gold)'}}/> Community-driven support</small>

                    </div>
                    
                  </div>

              </div>


        </div>
        
        </div>
      
      </div>
          <div
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    lineHeight: 0,
    zIndex: 5,
  }}
>
  <TransitionSectionSvg />
</div>
     
    </section>
  );
};
