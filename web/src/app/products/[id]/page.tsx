import { Product } from "@/types/models.types";
import Image from "next/image";

interface ProductDetailPageProps {
  params: { id: string };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3002/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="text-center p-8">Product does not exist.</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-96">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-blue-400 mb-6">
            ${product.price}
          </div>
          <div className="text-lg mb-6">
            Status:
            <span
              className={`font-semibold ${
                product.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {product.stock > 0
                ? ` In stock (${product.stock} product)`
                : " Out of stock"}
            </span>
          </div>
          <button
            disabled={product.stock === 0}
            className="w-full max-w-xs px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
