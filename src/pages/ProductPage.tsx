import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CatalogAPI } from "../api";
import { useCartStore } from "../store/cartStore";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await CatalogAPI.productById(id!);
        setProduct(res.data.data);
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img src={`https://shop.sprwforge.com/uploads/thumb-${product.image}`} alt={product.title} className="w-full h-80 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-green-600 mb-4">${product.selling}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => addToCart({ ...product, quantity: 1 })}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
