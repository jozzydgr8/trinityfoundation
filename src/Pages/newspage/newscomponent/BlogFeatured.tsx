
import { FlatButton } from '../../../Shared/FlatButton';
import {Blog} from '../../../Types/Types';
import { RightOutlined } from '@ant-design/icons';
import { formatDate } from '../../../Shared/Hooks/FormatDate';
import {UseDataContext} from '../../../Context/UseDataContext';
import { NavLink } from 'react-router-dom';
import businessLogo from '../../../assets/businessLogo.png';

export const BlogFeatured = ()=>{
    const {blog} = UseDataContext();
    const safeBlogs = blog ?? [];
    const featuredBlog: Blog | undefined =
    (safeBlogs.find((blog) => blog.featured) ||
    [...safeBlogs].sort(
        (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
    )[0]) as Blog | undefined;
    return(
        <section id='blogFeatured'>
            <div className="container-fluid">
                <h2 className="subheading mb-4" style={{color:"var(--color-navy)"}}>Featured News</h2>
               
                    {
                        featuredBlog && (
                            <div className='row'>
                            <div className="col-md-6">
                                <div style={{ backgroundImage: `url(${featuredBlog.featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', borderRadius: '8px', minHeight:"300px" }}></div>
                            </div>
                            <div className="col-md-6">
                                
                                
                                <h3 className='subheading mt-4' style={{color:"var(--color-navy)"}}>{featuredBlog.title}</h3>
                                <br/>
                                <p style={{color:"var(--color-gold)"}}>{featuredBlog.excerpt.slice(0,30)}...</p>
                                <div style={{display:'flex', alignItems:'center',gap:'15px', marginBottom:'20px', flexWrap:'wrap'  }}>
                                    <div >
                                        
                                         <img src={businessLogo} alt="logo" style={{ width: '50px', height: '50px', marginBottom: 16 }} />
                                       
                                    </div>
                                    <div>
                                        <h6 style={{margin: 0}}>TTAF</h6>
                                        <small style={{color:'gray'}}>{featuredBlog.readingTime} | {formatDate({ createdAt: featuredBlog.createdAt ?? '' })}</small>    
                                    </div>


                                </div>
                                <div>
                                    <NavLink to={`/news/${featuredBlog._id}`}>
                                        <FlatButton title='read full article' className='borderlessbtn btn' icon={<RightOutlined/>}/>
                                    </NavLink>
                                </div>
                            </div>
                            </div>
                        )
                    }
                
            </div>
        </section>
    )
}