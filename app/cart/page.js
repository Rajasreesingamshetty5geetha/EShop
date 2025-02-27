'use client';
import { Suspense } from "react";
import Cart from "../components/Cart/Cart";

export default function CartPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  );
}
