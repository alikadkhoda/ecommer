import React from 'react';

import CarouselHome from './CarouselHome';
import CategoryHome from './CategoryHome';
import News from './News';


const Home = () => {
  return (
    <div>
      <div>
        <CarouselHome/>
      </div>
      <div className='mt-5'>
        <CategoryHome/>
      </div>
      <div className='mt-5'>
        <News/>
      </div>
    </div>

  );
}

export default Home;