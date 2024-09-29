import Hero from '../Components/Hero/Hero';
import ShopByCategory from '../Pages/ShopByCategory';
import TopProducts from '../Components/Top_Products/TopProducts';
import OfferProducts from '../Offer_Products/OfferProducts';

const Home = () => {


  return (
    <>
        <Hero />
        <ShopByCategory />
        <TopProducts />
        <OfferProducts/>
    </>
  )
}

export default Home