// src/Products.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://shop.sprwforge.com/api/v1/products");
        console.log("API Response:", res.data);

        // products array আসছে res.data.data.result.data থেকে
        const productsArray = res.data?.data?.result?.data;
        if (Array.isArray(productsArray)) {
          const fetchedProducts = productsArray.map((p: any) => ({
            id: p.id,
            title: p.title,
            image: p.image
              ? `https://shop.sprwforge.com/uploads/thumb-${p.image}`
              : "https://via.placeholder.com/300",
          }));
          setProducts(fetchedProducts);
        } else {
          console.error("Products array not found in API response");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading products...</p>;
  if (!products.length)
    return <p className="text-center mt-10 text-red-500 text-lg">No products found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.title}
              title={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
