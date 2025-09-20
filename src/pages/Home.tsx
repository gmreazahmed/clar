import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";
import { CatalogAPI } from "../api";

interface Product {
  id: number;
  title: string;
  image: string;
  selling: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: any = {};
        if (query) params.search = query;
        if (category) params.category_id = category;

        const res = await CatalogAPI.products(params);
        setProducts(res.data.data.result.data || []);
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchProducts();
  }, [query, category]);

  return (
    <div className="flex">
      <Sidebar onSelectCategory={(id) => setCategory(id)} />
      <div className="flex-1 p-4">
        <SearchInput onSearch={setQuery} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} id={p.id} title={p.title} image={p.image} price={p.selling} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
