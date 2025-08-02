import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white p-4 flex flex-col group"
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow mt-3">
              <h2 className="text-base sm:text-lg font-semibold line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                {p.title}
              </h2>
              <p className="text-green-600 text-center font-bold mt-2 text-sm sm:text-base">
                ${p.price.toFixed(2)}
              </p>

              <Link
                href={`/product/${p.id}`}
                className="mt-auto text-center text-sm sm:text-base font-medium text-blue-600 hover:underline transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
