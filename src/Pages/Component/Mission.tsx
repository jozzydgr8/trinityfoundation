import { useNavigate } from "react-router-dom"
import { FlatButton } from "../../Shared/FlatButton"
import demoImage from '../../assets/supportpicture.jpg'

const styles = {
    backgroundContainer:{
        backgroundImage:`url(${demoImage})`,
        backgroundSize:"cover",
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height:"600px",
    },
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
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6" style={styles.backgroundContainer}>

                    </div>
                    <div className="col-md-6 darkbackground" style={{...styles.container, flexDirection:"column"}}>
                        <h3>Our Mission</h3><br/>
                        <p className="animate-up">
                        At The Trinity Arms Foundation, our mission is to support and uplift 
                        individuals by providing emotional care, empowerment, 
                        and practical assistance. We are committed to helping people build their self-esteem, 
                        offering guidance to those in need, and creating a safe space for healing and growth. 
                        Our work includes providing specialized support for women facing domestic violence and 
                        stigmatization, as well as offering empowerment programs and skills training to foster 
                        independence and self-sufficiency. With a heart for global outreach, we aim to extend our 
                        charitable services to communities in Africa and beyond, promoting dignity, hope, and lasting 
                        transformation for all.
                        </p>
                        <div>
                            <FlatButton className="buttondark" title="Donate to this cause" onClick={()=>navigate('/donate')}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}