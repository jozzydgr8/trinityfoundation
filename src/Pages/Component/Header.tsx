import { useEffect, useState } from "react";
import { backgroundimages } from "../../Shared/globals";
import { FlatButton } from "../../Shared/FlatButton";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundimages.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(()=>{
    var container = document.querySelector('.headerWrite');
    var containerButton = document.querySelector('.headerbutton');
    container?.classList.add('sectionAnimationDown');
    containerButton?.classList.add('sectionAnimationUp')
},[])

  const styles = {
    container:{
      color:'white',
      height:"90vh"
    },
    content:{
      display:"flex",
      justifyContent:'center',
      alignItems:'center',
      height:"100%"
    },
  
  }

  const currentBackground = backgroundimages[currentIndex].background;
  
  return (
    <section>
      <div
        className="header-background"
        style={{
          backgroundImage: `url(${currentBackground})`
        }}
      >
        <div className="header-gradient-background" >

        <div className="container-fluid" style={styles.container}>
          <div style={{...styles.content, flexDirection:'column'}}>
          <h1>
          Making a difference one heart, one life at a time.
          </h1>
          <p className="headerWrite">
          The Trinity Arms Foundation is a charity organisation 
          registered in the united Kingdom committed to making a lasting impact both locally and beyond. 
          </p>
          <Space wrap={true} className="headerbutton">
            <FlatButton title="Learn more" className="buttondark" onClick={()=>navigate('/trinityfoundation/sendform')}/>
            <FlatButton title="Get involved" className="buttondark" onClick={()=>navigate('/trinityfoundation/sendform')}/>
            <FlatButton title="Donate now" className="buttonsuccess" onClick={()=>navigate('/trinityfoundation/donate')}/>
          </Space>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
