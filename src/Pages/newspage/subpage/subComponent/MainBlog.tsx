import { Blog } from "../../../../Types/Types";
import { useState, useEffect } from "react";
import { BlogStateHooks } from "../subHooks/BlogStateHooks";
import { formatDate } from "../../../../Shared/Hooks/FormatDate";
import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import businessLogo from '../../../../assets/businessLogo.png';
type valueProp = {
    currentBlog:Blog
}
export const MainBlog = ({currentBlog}:valueProp)=>{
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const {handleLikeToggle, handleShare} = BlogStateHooks();

    useEffect(() => {
        // 1. Get the existing list of liked blog IDs
        const storedLikes = localStorage.getItem('likedBlogs');
        
        if (storedLikes) {
            const likedArray: string[] = JSON.parse(storedLikes);
            // 2. Check if the current blog ID exists in that array
            setIsLiked(likedArray.includes(currentBlog._id));
        }
        }, [currentBlog._id]);

        return(
             <section className="single-blog-container">
                <div className="container-fluid">
                

                    <h2 className="text-center subheading" style={{color:"var(--color-navy)"}}>{currentBlog.title}</h2>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{ backgroundImage: `url(${currentBlog.featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', borderRadius: '8px', minHeight:"300px" }}></div>
                        </div>
                        <div className="col-md-6 meta-info">
                            <small className='blogTag'>{currentBlog.category}</small>
                            <br/>
                            <p>{currentBlog.excerpt}</p>
                            <div style={{display:'flex', alignItems:'center',gap:'15px', marginBottom:'20px', flexWrap:'wrap'  }}>
                                    <div >
                                        
                                         <img src={businessLogo} alt="logo" style={{ width: '50px', height: '50px', marginBottom: 16 }} />
                                       
                                    </div>
                                    <div>
                                        <h6 style={{margin: 0}}>TTAF</h6>
                                        <small style={{color:'gray'}}>{currentBlog.readingTime} | {formatDate({ createdAt: currentBlog.createdAt ?? '' })}</small>    
                                    </div>
                                </div>
                            {/* Interactive stats section */}
                                <div className="blog-stats" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '15px' }}>
                                    
                                    {/* Like Button/Stat */}
                                    <span onClick={()=>handleLikeToggle({isLiked, setIsLiked, currentBlog})} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                        {isLiked ? (
                                            <HeartFilled style={{ color: '#ff4d4f', fontSize: '18px' }} />
                                        ) : (
                                            <HeartOutlined style={{ color: '#8c8c8c', fontSize: '18px' }} />
                                        )}
                                        <span style={{ color: '#595959' }}>{currentBlog.likes || 0} Likes</span>
                                    </span>

                                    {/* Share Stat */}
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', cursor:'pointer' }} onClick={()=>handleShare(currentBlog)}>
                                        <ShareAltOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                                        <span style={{ color: '#595959' }}>{currentBlog.shareCount || 0} Shares</span>
                                    </span>

                                </div>


                        </div>

                        

                    </div>
                            
                        
                </div>
            </section>

        )
}

