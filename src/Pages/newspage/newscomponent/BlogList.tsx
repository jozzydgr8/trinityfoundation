import { NavLink } from "react-router-dom";
import { FlatButton } from "../../../Shared/FlatButton";
import { formatDate } from "../../../Shared/Hooks/FormatDate";
import { RightOutlined } from '@ant-design/icons';
import { UseDataContext } from '../../../Context/UseDataContext';

export const BlogList = () => {
    const { blog } = UseDataContext();
    

    return (
        <section>
            <div className="container-fluid">
                <h2 className='subheading' style={{color:'var(--color-navy)'}}>Latest Updates</h2>
                <p className="">Stay updated with our latest stories, projects, and impact as we work to empower lives and strengthen communities.</p>

                <div>
                    
                            {/* Bootstrap Row */}
                            <div className="row">
                                {blog && blog.map((blog, i) => (
                                        /* align-items-stretch forces all columns in the row 
                                           to match the height of the tallest card 
                                        */
                                        <div key={i} className="col-md-4 d-flex mb-4 align-items-stretch">
                                            
                                            {/* w-100 forces the card to respect the column's uniform width.
                                               d-flex flex-column allows the interior elements to stretch vertically.
                                            */}
                                            <div className="blogListCard w-100 d-flex flex-column" style={{ height: "100%" }}>
                                                
                                                {/* Card Image */}
                                                <div style={{
                                                    height: "200px",
                                                    width: "100%",
                                                    backgroundImage: `url(${blog.featuredImage})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    flexShrink: 0 // Prevents the image from compressing
                                                }}></div>

                                                {/* Card Body content */}
                                                <div style={{ 
                                                    padding: '20px 30px', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    flexGrow: 1 
                                                }}>
                                                    <h3 className='subheading'>{blog.title}</h3>
                                                    <p style={{color:'var(--color-gold)'}}>{blog.excerpt ? `${blog.excerpt.slice(0, 30)}...` : ''}</p>
                                                    
                                                    {/* marginTop: 'auto' acts as a vertical spacer pushing 
                                                       this entire bottom block to line up evenly across columns 
                                                    */}
                                                    <div style={{ marginTop: 'auto' }}>
                                                        <small style={{ color: 'gray' }}>
                                                            {blog.readingTime} min read
                                                            {blog.createdAt ? ` | ${formatDate({ createdAt: blog.createdAt })}` : ''}
                                                        </small>

                                                        <br /> <br />
                                                        
                                                        <NavLink to={`/news/${blog._id}`}>
                                                            <FlatButton 
                                                                title="read more" 
                                                                icon={<RightOutlined />} 
                                                                className=" borderlessbtn" 
                                                            />
                                                        </NavLink>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                    </div>
                        
                </div>
            </div>
        </section>
    );
};