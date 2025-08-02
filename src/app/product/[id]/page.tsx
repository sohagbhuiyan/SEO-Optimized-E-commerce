import { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/types";
import Image from "next/image";

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products.map((p: Product) => ({ id: p.id.toString() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await res.json();
  
  return {
    title: `${product.title} - E-commerce Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  return (
    <section className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Image 
            src={product.image} 
            alt={product.title} 
            className="w-full max-w-md h-96 object-contain rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">★</span>
            <span>{product.rating.rate}</span>
            <span className="text-gray-500">({product.rating.count} reviews)</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-sm text-gray-500">Category:</span>
            <p className="font-medium capitalize">{product.category}</p>
          </div>
          <p className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
