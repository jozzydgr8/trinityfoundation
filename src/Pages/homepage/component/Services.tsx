import {services} from '../../../data'
export const Services = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className='text-center animate-up'>
                    <h2 className='subheading'>Practical support for <br/> <span style={{color:'var(--color-navy)'}}>everyday needs</span></h2>
                <p className='subtopic'>
                    We provide a range of essential services designed to meet immediate needs while helping people build stability and hope for the future.
                </p>
                </div>
                <div className="row">
                    {
                        services.map((service, index)=>(
                            <div className="col-md-4 animate-up " key={index}>
                                <div className='service-card mb-3'>
                                    <div style={{width:"fit-content", fontSize: '2rem',color:'var(--color-navy)', backgroundColor: 'var(--color-navy-transparent)', padding: '7px 15px', borderRadius: '10px' }}>{service.icon}</div>
                                    <br/>
                                    <h3 className='subheading'>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </section>
    )
}