import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import pic_1 from '../../assets/Slider-img-1.png';
import pic_2 from '../../assets/Slider-img-2.png';
import pic_3 from '../../assets/Slider-img-3.png';
import pic_4 from '../../assets/Slider-img-4.png';
import pic_5 from '../../assets/Slider-img-5.png';
import pic_6 from '../../assets/Slider-img-6.png';
import pic_7 from '../../assets/Slider-img-7.png';


const Hero = () => {
  const sliding = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <>
      <div className='mx-32 w-auto h-custom-height mt-20 hero-container '>
        <Slider {...sliding}>
        <div className="relative h-custom-height w-1/2 slide-1">
            <img 
            src={pic_1} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>
    

        <div className="relative h-custom-height w-1/2 slide-2">
            <img 
            src={pic_2} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>

        <div className="relative h-custom-height w-1/2 slide-3">
            <img 
            src={pic_3} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>

        <div className="relative h-custom-height w-1/2 slide-4">
            <img 
            src={pic_4} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>

        <div className="relative h-custom-height w-1/2 slide-5">
            <img 
            src={pic_5} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>

        <div className="relative h-custom-height w-1/2 slide-6">
            <img 
            src={pic_6} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>

        <div className="relative h-custom-height w-1/2 slide-7">
            <img 
            src={pic_7} 
            alt="Sliding Image" 
            className="w-full h-full object-contain" 
            />
        </div>



        </Slider>
      </div>
    </>
  );
}

export default Hero;
