import { useEffect, useState } from "react";
import api from "../api";

interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: string;
}

export default function Products({ categoryId }: { categoryId: number | null }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", {
        params: categoryId ? { category_id: categoryId } : {},
      })
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setProducts(res.data.data);
        } else {
          setError("Invalid product data format");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">
        {categoryId ? "Products by Category" : "All Products"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-2 rounded shadow-sm">
            <img
              src={`https://shop.sprwforge.com/uploads/${p.image}`}
              alt={p.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-gray-600">{p.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
