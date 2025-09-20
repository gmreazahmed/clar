import { useEffect, useState } from "react";
import api from "../api";

interface Category {
  id: number;
  title: string;
  slug: string;
}

export default function Sidebar({ onSelectCategory }: { onSelectCategory: (id: number) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/common")
      .then((res) => {
        if (Array.isArray(res.data?.data?.categories)) {
          setCategories(res.data.data.categories);
        } else {
          setError("Invalid category data format");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="mb-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
