import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { CatalogAPI } from "../api";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../store/cartStore"; // <-- type-only import

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

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

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64" />
      <p>Price: €{product.selling}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
