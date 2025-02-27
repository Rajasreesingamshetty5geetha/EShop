'use client';
import ProductOverview from '@/app/components/Product/ProductOverview';
import { products } from '@/app/components/Product/ProductsData';
import { useParams } from 'next/navigation';

const ProductPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  // Flatten all categories into a single array
  const allProducts = Object.values(products).flat();

  // Optionally remove duplicates (not strictly necessary for find())
  const uniqueProducts = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values()
  );

  // Find the product by its id
  const product = uniqueProducts.find((p) => p.id === productId);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return <ProductOverview product={product} />;
};

export default ProductPage;
