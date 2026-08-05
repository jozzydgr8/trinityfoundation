import demobackground from '../../assets/trinitysingleimage.jpg';
import journeybackground from '../../assets/trinitygroceries.jpg';

export const About = ()=>{
    return(
        <section id='about'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div></div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h2 className='subheading' style={{ color: 'var(--color-dark-purple)' }}>
                                Compassion in action —
                                supporting people when it matters most
                            </h2>
                            <p className='subtopic'>
                                The Trinity Arms Foundation is a non-profit organisation dedicated to empowering individuals and strengthening communities. We focus on poverty alleviation, social support, and community development through impactful programs and partnerships. Whether you seek support or want to collaborate, we welcome you. Together, we can make a difference. 
                                Thank you for visiting, we look forward to creating positive change together.
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}