import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CarouselHome = () => {
  const [carousel, setCarousel] = useState([])
  useEffect(() => {
    axios.get('api/getCarousel').then(res => {
      if (res.data.status === 200) {
        setCarousel(res.data.carousel)
      }
    })
  }, [])

  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          {
            carousel.map(item => {
              return (
                <div key={item.id}>
                  <div className="carousel-item active bg-dark">
                    <img src={`http://127.0.0.1:8000/${item.image}`} className="d-block w-50  m-auto" alt={item.name} height='400px' />
                    <div className="carousel-caption d-none d-md-block bg-dark">
                      <Link to={`collections/${item.category.slug}/${item.slug}`} className='text-decoration-none text-white'>
                      <h5>{item.name}</h5>
                      </Link>
                      <p>{item.category.name}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }


        </div>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselHome;