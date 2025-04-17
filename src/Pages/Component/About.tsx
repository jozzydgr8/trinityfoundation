import demobackground from '../../assets/trinitysingleimage.jpg';
import journeybackground from '../../assets/trinityjourney.jpg';
const styles = {
    content:{
        backgroundColor:'white'
    },
    backgroundcontainer: {
        
        backgroundSize:'cover',
       
        backgroundRepeat:'no-repeat',
        backgroundPosition:"center center"}
}
export const About = ()=>{
    return(
        <section className='darkbackground'id='about'>
            <div className="container-fluid">
                <h2>About</h2>
                <div className="aboutrow">
                    <div className="aboutimage animate-left" style={
                        {...styles.backgroundcontainer, backgroundImage:`url(${demobackground})`,}
                       }>

                    </div>
                    
                        <div className=" aboutcontent animate-right">
                        <h3>Who are We?</h3><br/>
                            <div >
                           
                                <p>
                                The Trinity Arms Foundation is a non-profit organisation dedicated to empowering individuals and strengthening communities. We focus on poverty alleviation, social support, and community development through impactful programs and partnerships.
                                Whether you seek support or want to collaborate, we welcome you. Together, we can make a difference.
                                Thank you for visiting, we look forward to creating positive change together.

                                </p>
                            </div>
                        </div>
                    
                </div>


                {/* second column second list about about second grid in about */}
                <br/>
                <br/>
                       <div className='secondaboutrow'>
                            
                            <div className='aboutsecondcontent animate-left'>
                                <h3>Our Journey</h3><br/>

                                <p>
                                The Trinity Arms Foundation began its journey in 2021 with a vision to support struggling families, 
                                build confidence in those who need it, and foster community growth. 
                                This vision became a reality when we became officially registered in the United Kingdom in 2025. 
                                Since then, we have grown into a trusted organisation with a presence in both the United Kingdom and Nigeria. 
                                Through apprenticeship training, career encouragement, outreach programs, and collaborative partnerships, 
                                we are committed to providing resources and opportunities that empower individuals and strengthen communities. 
                                Our ongoing mission is to create sustainable, positive change and improve lives both locally and internationally.
                                </p>
                            </div>

                            <div 
                            style={{...styles.backgroundcontainer, backgroundImage:`url(${journeybackground})`,}} 
                            className='aboutsecondimage animate-right'></div>
                       </div>
            </div>
        </section>
    )
}