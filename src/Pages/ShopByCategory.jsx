import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: 'Baby Clothing',
    route: 'clothes',
    imageUrl: 'https://www.jiomart.com/images/product/original/rvsk0biit5/whaou-kids-boys-cotton-printed-white-and-red-colour-top-shorts-set-boys-dress-baby-boy-dress-infant-dress-kids-wear-3-month-to-2-years-product-images-rvsk0biit5-0-202310032022.jpg?im=Resize=(1000,1000)', 
  },
  {
    name: 'Baby Gear',
    route: 'gear',
    imageUrl: 'https://d3r47b04tm9cwy.cloudfront.net/MLP/mlp-Images-backend/1707216943994-149869964-1.webp',
  },
  {
    name: 'Baby Toys',
    route: 'toys',
    imageUrl: 'https://babymoo.in/cdn/shop/files/H168114-2A_1.jpg?v=1720591703&width=2000',
  },
  {
    name: 'Baby Care',
    route: 'care',
    imageUrl: 'https://cdn.cdnparenting.com/articles/2018/04/27161841/Immediate-care-of-newborn.webp',
  },
  {
    name: 'Food & Nutritions',
    route: 'food',
    imageUrl: 'https://static.independent.co.uk/2023/05/24/07/24071740-a39fc580-c0b7-4aab-92d1-981d8f516df9.jpg',
  },
  {
    name: 'Furniture & Bedding',
    route: 'furniture',
    imageUrl: 'https://m.media-amazon.com/images/I/61n6IvQOSdL.jpg',
  },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleClickOnCategory = (categoryRoute) => {
    navigate(`/category/${categoryRoute}`);
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-bold mb-6">Shop By Category</h2>
      <div className="flex justify-center space-x-4 overflow-x-auto flex-wrap sm:flex-nowrap">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 p-4 cursor-pointer"
            onClick={() => handleClickOnCategory(category.route)} 
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs sm:text-sm md:text-md font-semibold">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
