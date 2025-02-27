"use client"; 

import { useSearchParams } from "next/navigation";

const ProductPage = () => {
  return (
    <div>
      <ProductContent />
    </div>
  );
};

function ProductContent() {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("someParam");

  return <div>Product Page - Param: {paramValue}</div>;
}

export default ProductPage;
