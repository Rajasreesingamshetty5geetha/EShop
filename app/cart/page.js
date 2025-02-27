'use client';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Cart from "../components/Cart/Cart";

function CartPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  );
}
function CartContent() {
  const searchParams = useSearchParams(); // Now inside Suspense
  const paramValue = searchParams.get("someParam");

  return <div>Cart Page - Param: {paramValue}</div>;
}
export default CartPage;
