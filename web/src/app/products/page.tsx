import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/models.types";

//fetch data
async function getProducts(): Promise<Product[]> {
  try {
    // Call directly to the products service API
    const res = await fetch("http://localhost:3002/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductPage() {
  const products = await getProducts();
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} /> 
          ))
        ) : (
          <p>There are no products to display.</p>
        )}
      </div>
    </main>
  );
}
