"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "../components/Product/ProductCard";

function ProductPage() {
  const searchParams = useSearchParams(); 
  const paramValue = searchParams.get("someParam");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductCard />
      </Suspense>
      <div>Product Page - Param: {paramValue}</div> 
    </div>
  );
}

export default ProductPage;
