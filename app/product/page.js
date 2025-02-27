"use client"; 

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "../components/Product/ProductCard"; 

const ProductPage = () => {
  return (
    <div>
      <ProductContent />
      <Suspense fallback={<div>Loading Product...</div>}>
        <ProductCard />
      </Suspense>
    </div>
  );
};

function ProductContent() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("someParam");

  return <div>{paramValue}</div>;
}

export default ProductPage;
