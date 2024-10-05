import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import pic_1 from '../../assets/Hero_Slide_1.jpg';
import pic_2 from '../../assets/Hero_Slide_3.jpg';
import pic_3 from '../../assets/Hero_Slide_4.jpg';
import pic_4 from '../../assets/Hero_Slide_5.jpg';
import pic_5 from '../../assets/Hero_Slide_6.jpg';
import pic_6 from '../../assets/Hero_Slide_7.jpg';
import { Link } from 'react-router-dom';

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
    pauseOnHover: true,
    pauseOnFocus: false,
  };

  return (
    <>
      <div className='mx-4 md:mx-16 lg:mx-32 w-auto h-custom-height mt-16 md:mt-24 hero-container'>
        <Slider {...sliding}>

          {/* Slide 1 */}
          <div className="relative h-custom-height w-full">
            <img 
              src={pic_1} 
              alt="Sliding Image" 
              className="w-full h-full object-fit" 
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-25">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4">Discover Our Collections</h2>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6">Everything Your Baby Needs, All in One Place</p>
              <Link to="/shop">
                <button className="bg-gray-500 text-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative h-custom-height w-full">
            <img 
              src={pic_2} 
              alt="Sliding Image" 
              className="w-full h-full object-fit" 
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-25">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4">The Best for Your Baby</h2>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6">Shop now for top-quality baby products that keep your little one cozy and happy</p>
              <Link to="/shop">
                <button className="bg-gray-500 text-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative h-custom-height w-full">
            <img 
              src={pic_3} 
              alt="Sliding Image" 
              className="w-full h-full object-fit" 
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-25">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4">Style, Comfort and Joy !</h2>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6">Explore our collection of baby clothes designed with love and care.</p>
              <Link to="/category/clothes">
                <button className="bg-gray-500 text-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-300 mt-2 sm:mt-4">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="relative h-custom-height w-full">
            <img 
              src={pic_4} 
              alt="Sliding Image" 
              className="w-full h-full object-fit" 
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-30">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">The World of Playtime Fun !</h2>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6">Discover safe, engaging toys that spark creativity and joy.</p>
              <Link to="/category/toys">
                <button className="bg-gray-500 text-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Slide 5 */}
          <div className="relative h-custom-height w-full">
            <img 
              src={pic_5} 
              alt="Sliding Image" 
              className="w-full h-full object-fit" 
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-30">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Bubbles of Joy !</h2>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6">Make bath time magical with our baby-friendly shampoos, soaps, and accessories.</p>
              <Link to="/shop">
                <button className="bg-gray-500 text-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Slide 6 */}
          <div className="relative h-custom-height w-full">
            <img 
              src={pic_6} 
              alt="Sliding Image" 
              className="w-full h-full object-fit" 
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-30">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Find Perfect Stroller for Babies !</h2>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6">Comfort, convenience, and safety come together in our premium stroller collection.</p>
              <Link to="/shop">
                <button className="bg-gray-500 text-gray-200 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

        </Slider>
      </div>
    </>
  );
}

export default Hero;
