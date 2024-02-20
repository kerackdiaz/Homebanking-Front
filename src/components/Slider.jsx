import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div className='bg-banner02 h-[300px] w-full bg-conver bg-center bg-no-repeat'>
        <Link to="/cards/new" className='absolute top-2/4 left-[127vw] border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply Now </Link>
      </div>
      <div className='bg-banner03 h-[300px] w-full bg-conver bg-center bg-no-repeat'>
        <Link to="https://play.google.com/store/apps" className='absolute top-2/4 left-[240vw] border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply Now </Link>
      </div>
    </Slider>
  );
};

export default Carousel;
