'use client';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductContent />
      </Suspense>
    </div>
  );
};

function ProductContent() {
  const searchParams = useSearchParams(); // Now inside Suspense
  const paramValue = searchParams.get("someParam");

  return <div>Product Page - Param: {paramValue}</div>;
}

export default ProductPage;
