import { Suspense } from "react";
import Cart from "../components/Cart/Cart";
import CartParams from "./CartParams";

export default function CartPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
      <Suspense fallback={<div>Loading Params...</div>}>
        <CartParams />
      </Suspense>
    </div>
  );
}
