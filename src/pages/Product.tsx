import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import CardProduct from "@/components/products/CardProduct";
import {
  useProducts,
  type Product as ProductItem,
} from "@/components/hooks/useProducts";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

export default function Products() {
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo<string[]>(() => {
    return [
      "all",
      ...Array.from(new Set(products.map((item) => item.category || "General"))),
    ];
  }, [products]);

  const filteredProducts = useMemo<ProductItem[]>(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <>
      <Navbar01 />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Our Products
        </h1>
        {loading ? (
          <p className="p-20 text-center text-lg text-gray-500">
            Memuat produk…
          </p>
        ) : null}
        {error ? (
          <p className="text-center text-lg text-red-500">
            Gagal memuat produk: {error}
          </p>
        ) : null}
        {!loading && !error ? (
          <>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Cari produk…"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 md:max-w-xs"
              />
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 md:w-auto"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "Semua Kategori"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-sm text-slate-500">
                Produk tidak ditemukan. Coba ubah kata kunci atau kategori.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    detailLink={`${product.id}`}
                    currentPath={location.pathname}
                  />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
      <Outlet />
    </>
  );
}
