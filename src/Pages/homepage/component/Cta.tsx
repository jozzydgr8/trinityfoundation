import womenImage from '../../../assets/twowomen.jpg';
import groupImage from '../../../assets/trinitygrouptwoimage.jpg';
import { NavLink } from 'react-router-dom';
import { FlatButton } from '../../../Shared/FlatButton';
import {ArrowRightOutlined} from '@ant-design/icons';
export const Cta = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    
                        <div className="col-md-4 ">
                            <div className='h-100 sharedCtaContainer' style={{backgroundImage:`url(${womenImage})`}}>
                                <div style={{backgroundColor:'rgba(7, 26, 61, 0.6)', height:"100%",padding:' 20px 40px',borderRadius:"10px"}}>
                                    <h2 className='subheading'>Become a Volunteer</h2>
                                    <p className='subtopic'>
                                        Be part of creating stronger communities by supporting programmes that equip people with the skills, confidence, and opportunities they need to thrive. Together, we can make a lasting difference.

                                    </p>
                                    <NavLink to={'/sendform'}>
                                        <FlatButton icon={<ArrowRightOutlined/>} title='Learn more' className='buttondark'/>
                                    </NavLink>
                                </div>
                            </div>
                       
                        </div>






                        <div className="col-md-3">
                            <div className='h-100 sharedCtaContainer' style={{backgroundColor:'var(--color-purple)',padding:' 20px 40px'}}>
                                <div className='d-flex align-items-end' style={{border:'solid white 1px', height:'100%', borderRadius:'10px', padding:"20px"}}>
                                    <div>
                                    <h1 className='subheading'>1K+</h1>
                                    <p className='subtopic'>
                                        People Reached
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>








                        <div className="col-md-4">
                            <div className='h-100 sharedCtaContainer' style={{backgroundImage:`url(${groupImage})`}}>
                                <div style={{backgroundColor:'rgba(7, 26, 61, 0.6)', height:"100%", padding:' 20px 40px',borderRadius:"10px"}}>
                                    <h2 className='subheading'>Join Our Mission</h2>
                                    <p className='subtopic'>
                                        We work to create opportunities that inspire people, strengthen communities, and equip individuals with the skills and confidence to build better futures.

                                    </p>
                                    <NavLink to={'/sendform'}>
                                        <FlatButton icon={<ArrowRightOutlined/>} title='Join us now' className='buttondark'/>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                 
                </div>
            </div>
        </section>
    )
}