import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { Button } from "../ui/button";

interface CardProductProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  detailLink?: string;
  currentPath?: string;
}

export default function CardProduct({
  id,
  image,
  title,
  description,
  price,
}: CardProductProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price: price,
      image,
    });
  };

  return (
    <>
      <div className="group relative max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={image}
          alt={title}
          className="relative z-[2] h-56 w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="relative z-[2] flex flex-col justify-between space-y-4 p-5">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 transition-colors">
              <Link
                to={`/products/${id}`}
                className="line-clamp-1 transition-colors duration-200 hover:text-primary"
              >
                {title}
              </Link>
            </h2>
            <p className="line-clamp-3 text-sm text-slate-500">
              {description}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              ${price.toFixed(2)}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1 group-hover:bg-primary"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </>
  );
}
