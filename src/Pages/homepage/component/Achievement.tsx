import CountUp from "react-countup";
export const Achievement = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 achievement-item ">
                        <div className="text-center">
                            <h1 className="subheading" style={{color:'var(--color-gold)'}}>
                            <CountUp
                            end={1000}
                            duration={2}
                            separator=","
                            enableScrollSpy
                            scrollSpyOnce
                            />+
                            </h1>
                            <p className="subtitle">Individuals empowered</p>
                        </div>

                    </div>
                    

                    <div className="col-md-3 achievement-item">
                        <div className="text-center">
                            <h1 className="subheading" style={{color:'var(--color-navy)'}}>
                                <CountUp
                            end={10}
                            duration={2}
                            separator=","
                            enableScrollSpy
                            scrollSpyOnce
                            />+
                            </h1>
                            <p className="subtitle">Community Projects delivered</p>
                        </div>
                    </div>

                    <div className="col-md-3 achievement-item">
                        <div className="text-center">
                            <h1 className="subheading" style={{color:'var(--color-gold)'}}>0+</h1>
                            <p className="subtitle">Active Partner Organisations</p>
                        </div>
                    </div>

                    <div className="col-md-3 achievement-item">
                         <div className="text-center">
                            <h1 className="subheading" style={{color:'var(--color-navy)'}}>
                                <CountUp
                            end={500}
                            duration={2}
                            separator=","
                            enableScrollSpy
                            scrollSpyOnce
                            />+</h1>
                            <p className="subtitle">Advocacy Reach Across the UK</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}