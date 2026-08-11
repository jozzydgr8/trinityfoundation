import demobackground from '../../../assets/trinitysingleimage.jpg';
import { FlatButton } from './../../../Shared/FlatButton';
import {RightOutlined} from '@ant-design/icons'

export const About = ()=>{
    return(
        <section id='about'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 mb-4 animate-left">
                        <div className='homeImage' style={{ backgroundImage: `url(${demobackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
                    </div>
                    <div className="col-md-6 ">
                        <div>
                            <span className='homeBadgeParentAlt '>About our foundation</span>
                            
                            <h2 className='subheading mt-4' >
                                Compassion in action —<br/>
                                <span style={{ color: 'var(--color-navy)' }}>supporting people when it matters most</span>
                            </h2>
                            <br/>
                            <p className='animate-up' >
                                The Trinity Arms Foundation is a UK-registered charitable organisation dedicated to supporting individuals and families who are experiencing financial hardship and poverty. We believe that everyone deserves access to the essentials that make daily life possible — food, clothing, toiletries, and household items.

                                Our approach is rooted in dignity and respect. We don't just provide material assistance — we listen, we guide, and we connect people with the services and support networks that can help them move forward. Every person who reaches out to us is treated with compassion, without judgement.

                                Through practical support, community outreach, and partnership working, we create pathways out of hardship and help build stronger, more resilient communities across the UK.


                            </p>
                            <br/>
                            <FlatButton title='Learn More' icon={<RightOutlined/>} className='btn btn-alternate animate-up' />
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}