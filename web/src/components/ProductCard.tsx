import { Product } from "@/types/models.types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href="#">
      <div className="border bg-gray-800 border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-60">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold truncate text-white">
            {product.name}
          </h3>
          <p className="text-gray-400 mt-1 truncate">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-blue-400">
              ${product.price}
            </span>
            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {product.stock > 0
                ? `In stock (${product.stock})`
                : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
