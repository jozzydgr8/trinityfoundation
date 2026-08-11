import { trusteeData } from ".././../../Shared/globals"

export function Trustee() {
  return (
    <section>
      <div className="container-fluid">

        <div className="text-center mb-4">
        <span className='homeBadgeParentAlt'>Our Trustees</span>
        <h2 className="subheading">
        Experienced Leaders Driving Our Vision Forward
        </h2>
        </div>
        <div className="row">
            {
              trusteeData.map((data, index)=>(
                <div className='col-md-4 mb-2 animate-up' key={index}>
                  {/* <img src={data.profile_pic} alt={data.name} className="homeImage"style={{width:'100%'}}  /> */}
                  <div className='trusteeImage' style={{backgroundImage: `url(${data.profile_pic})`, backgroundPosition:'top',
                backgroundSize: 'cover',}}></div>
                  
                </div>
              ))
            }
        </div>
      </div>
    </section>
  );
}