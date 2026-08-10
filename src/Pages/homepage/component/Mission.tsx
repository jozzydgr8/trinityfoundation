import { useNavigate } from "react-router-dom"
import { FlatButton } from "../../../Shared/FlatButton"
import demoImage from '../../../assets/supportpicture.jpg'

const styles = {
  
    container:{
        minHeight:'600px',
        padding:'30px',
        display:'flex',
        justifyContent:'center'
    }
}
export const Mission = ()=>{
    const navigate = useNavigate()
    return(
        <section className='darkbackground'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7 mb-2">
                        <p className='homeBadgeParentAlt' style={{color:'var(--color-gold)'}}>Our Mission</p>
                        <h2 className='subheading'>Restoring dignity <br/>
                            <span style={{color:'var(--color-gold)'}}>Relieving poverty.</span> <br/>
                            Creating hope.</h2><br/>
                        <p className="animate-up subtopic">
                        Our mission is simple but profound: to ensure that people experiencing financial hardship are not overlooked, forgotten, or left without options. We are committed to relieving poverty and its effects through practical, direct assistance that respects the dignity of every person we support.<br/><br/>

                        We believe that a helping hand — offered with kindness and without judgement — can be the turning point that allows someone to regain their footing and look forward with hope. Our work is driven by compassion, rooted in community, and guided by the belief that every person deserves to live with dignity.


                        </p>
                        <br/>
                        <div>
                            <FlatButton className="buttondark" title="Donate to this cause" onClick={()=>navigate('/donate')}/>
                        </div>
                    </div>


                    <div className="col-md-5 homeImage" style={{ backgroundImage:`url(${demoImage})`,
        backgroundSize:"cover",
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',}} >

                    </div>
                    
                </div>
            </div>
        </section>
    )
}