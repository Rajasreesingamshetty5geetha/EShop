"use client"; 

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Cart from "../components/Cart/Cart";

function CartPage() {
  const searchParams = useSearchParams();  
  const paramValue = searchParams.get("someParam");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
      <div>Cart Page - Param: {paramValue}</div> 
    </div>
  );
}

export default CartPage;
