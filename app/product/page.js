"use client";

import { Suspense } from "react";
import ProductCard from "../components/Product/ProductCard";

export default function ProductPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductCard/>
      </Suspense>
      <Suspense fallback={<div>Loading Params...</div>}>
        <ProductParams /> 
      </Suspense>
    </div>
  );
}

