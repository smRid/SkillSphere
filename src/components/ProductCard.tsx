import Image from "next/image";
import Link from "next/link";
import { FiStar, FiArrowRight } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card bg-base-100 shadow-md card-hover border border-base-200 overflow-hidden group">
      <figure className="relative overflow-hidden h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="badge bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 text-xs font-semibold">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge badge-ghost bg-white/90 backdrop-blur-sm text-xs font-semibold gap-1">
            <FiStar className="text-yellow-500 fill-yellow-500" />
            {product.rating}
          </span>
        </div>
      </figure>
      <div className="card-body p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
        <h3 className="card-title text-base font-bold leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-extrabold text-orange-500">${product.price}</span>
          <Link
            href={`/products/${product.id}`}
            className="btn btn-sm rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 hover:from-orange-600 hover:to-rose-600 gap-1"
          >
            View Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
