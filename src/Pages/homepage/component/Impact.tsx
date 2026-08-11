import { impactStats } from "../../../data"

export const Impact = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className='text-center'>
                    <span className='homeBadgeParentAlt'>Our impact</span>
                    <br/>
                    <h2 className='subheading mt-4 mb-2'>Every act of support<br/>
                    <span style={{color:'var(--color-navy)'}}>creates lasting change</span>
                    </h2>
                   
                    <p className='subtopic'>
                        Through the generosity of our supporters and the dedication of our volunteers, we make a tangible difference in the lives of people across the UK.
                    </p>
                </div>


                <div className="row">
                    {
                        impactStats.map((data, index)=>(
                            <div className='col-md-3 animate-up' key={index}>
                                <div className='impact-card mb-3 text-center'>
                                   <span style={{width:"fit-content", fontSize: '2rem',color:'var(--color-navy)', backgroundColor: 'var(--color-navy-transparent)', padding: '7px 15px', borderRadius: '10px' }}>{data.icon}</span>
                                    <h3 className='subheading mt-3' style={{color:'var(--color-navy)'}}>{data.title}</h3>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}