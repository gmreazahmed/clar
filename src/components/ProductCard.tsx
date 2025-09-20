import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, image, price }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded p-2 cursor-pointer" onClick={() => navigate(`/product/${id}`)}>
      <img src={`https://shop.sprwforge.com/uploads/thumb-${image}`} alt={title} className="w-full h-40 object-cover mb-2" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-green-600">${price}</p>
    </div>
  );
};

export default ProductCard;
