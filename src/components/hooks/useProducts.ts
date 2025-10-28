import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductInput = Omit<Product, "id">;
export type ProductUpdate = Partial<ProductInput>;

interface ProductContextValue {
  products: Product[];
  data: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addProduct: (input: ProductInput) => Product;
  updateProduct: (id: number, updates: ProductUpdate) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | null;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const payload = (await response.json()) as Product[];
      setProducts(payload);
      setError(null);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback((input: ProductInput) => {
    let createdProduct: Product | null = null;

    setProducts((prev) => {
      const nextId =
        prev.length > 0
          ? Math.max(...prev.map((product) => product.id)) + 1
          : 1;

      createdProduct = {
        ...input,
        id: nextId,
        rating: input.rating ?? { rate: 0, count: 0 },
      };

      return [createdProduct!, ...prev];
    });

    return createdProduct!;
  }, []);

  const getProductById = useCallback(
    (id: number) => products.find((product) => product.id === id) ?? null,
    [products]
  );

  const updateProduct = useCallback((id: number, updates: ProductUpdate) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
              rating: updates.rating ?? product.rating,
            }
          : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const value = useMemo<ProductContextValue>(
    () => ({
      products,
      data: products,
      loading,
      error,
      refresh: fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
    }),
    [
      products,
      loading,
      error,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
    ]
  );

  return createElement(ProductContext.Provider, { value }, children);
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};
