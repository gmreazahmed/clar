import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CatalogAPI } from "../api";
import { useCartStore } from "../store/cartStore";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await CatalogAPI.productById(id!);
        console.log("Product Details:", res.data);
        setProduct(res.data?.data || res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.thumb}
          alt={product.name}
          className="w-full h-80 object-cover rounded shadow"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">${product.price}</p>
          <p className="mt-4">{product.description || "No description."}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
