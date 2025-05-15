import { trusteeData } from "../../Shared/globals"

export function Trustee() {
  return (
    <section>
      <>
  
  <h2>Our Trustees</h2>
 

  <div
    id="carouselExampleFade"
    className="carousel slide "
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">
      {trusteeData.map((data, index) => (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <div className="text-center p-4">
              <div
                style={{
                  backgroundImage: `url(${data.profile_pic})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  height: '200px',
                  width: '200px',
                  borderRadius: '50%',
                  margin: '0 auto',
                  border: '4px solid #ccc',
                  backgroundColor:'#ccc'
                }}
              ></div>

              <p className="fst-italic fs-5 mt-3 text-muted">“{data.title}”</p>

              <h3>{data.name}</h3>
              <p>{data.role}</p>

              <p className="">{data.description}</p>
            </div>

        </div>
      ))}
    </div>

    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="prev"
     
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</>
    </section>
  );
}