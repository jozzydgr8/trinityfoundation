import { products } from "../../../data"
import { FlatButton } from "../../../Shared/FlatButton"
import {ArrowRightOutlined} from '@ant-design/icons'

export const Product = ()=>{
    return(
        <section id="products">
            <div className="container-fluid">
                <div className="text-center">
                    <span className="homeBadgeParentAlt">Our Product</span>
                    <h2 className="subheading">Made to Give Back</h2>
                    <p className="subtopic" style={{color:'var(--color-navy-blue)'}}>Every purchase helps us continue the work we care about.</p>
                </div>
                <br/>
                <div className="row justify-content-center g-4" >
                    {
                    products.map((data, index)=>(
                     <div
                        className="col-md-4 d-flex flex-column align-items-center animate-up mb-3 "
                        key={index}
                        >
                            <div className="h-100 product-card">
                                <div style={{backgroundImage:`url(${data.image})`,
                            backgroundSize: "cover",
                                height: "500px",
                                backgroundPosition: "center center",
                                borderTopRightRadius: "10px",
                                borderTopLeftRadius: "10px",
                            }}></div>



                            <div
                            style={{
                                padding: "30px",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                            >
                                <h3 className="subheading">{data.title}</h3>
                                <p>{data.description}</p>

                                {/* Pushes button to bottom */}
                            <div className="mt-auto">
                                <a href={data.link} target="_blank" rel="noreferrer noopener">
                                    <FlatButton
                                title="Buy now"
                                className=" buttonsuccess w-100"
                                icon={<ArrowRightOutlined/>}
                                />
                                </a>
                            </div>
                            </div>


                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </section>
    )
}