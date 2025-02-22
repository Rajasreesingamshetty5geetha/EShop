'use client';
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { products } from "../Product/ProductsData";
import { useSearchParams } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || ''; // Get category from URL
  const [cart, setCart] = useState([]);

  // Merge all product categories into a single array
  const allProducts = Object.values(products).flat();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCart = storedCart.map((cartItem) => {
      const productDetails = allProducts.find((p) => p.id === cartItem.id);
      return productDetails ? { ...productDetails, quantity: cartItem.quantity } : null;
    }).filter(Boolean); // Remove null values if product not found

    setCart(updatedCart);
  }, []);

  // Remove product from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(({ id, quantity }) => ({ id, quantity }))));
  };

  // Handle quantity change
  const updateQuantity = (id, newQty) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(({ id, quantity }) => ({ id, quantity }))));
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + parseFloat(item.price.replace("₹", "")) * item.quantity, 0);

  // Calculate total discount dynamically based on each product
  const totalDiscount = cart.reduce((discountTotal, item) => {
    const productDetails = allProducts.find((p) => String(p.id) === String(item.id));
    const discountString = productDetails?.discount ?? "0%"; // Default to "0%" if undefined
    const discountPercentage = parseFloat(discountString.replace("%", "")); // Remove '%' and convert to number

    const itemPrice = parseFloat(item.price.replace("₹", "").replace(",", "")); // Remove ₹ and commas
    const itemDiscount = (itemPrice * item.quantity * discountPercentage) / 100;

    return discountTotal + itemDiscount;
  }, 0);

  // Additional charges
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax estimate

  // Final total calculation
  const orderTotal = subtotal - totalDiscount + tax;
  const savings = totalDiscount; // Total savings  

  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-gray-900">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="col-span-2 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex p-4 items-center border rounded-lg">
                <img src={item.imageSrc} alt={item.imageAlt} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-md object-cover object-top" />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-600">{item.name}</h2>
                  <p className="text-gray-600">{item.color} | {item.size || "Free Size"}</p>
                  <div className="flex gap-2">
                    <p className="font-semibold text-gray-700">₹{(parseFloat(item.price.replace("₹", "")) * item.quantity).toFixed(2)}</p>
                    <p className="text-green-500 text-sm mt-[2.5px] ">{item.discount} off</p>
                  </div>
                </div>
                {/* Quantity Selector */}
                <select
                  className="border p-1 rounded text-gray-600"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
                {/* Remove Button */}
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-500 cursor-pointer">✖</button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="p-4 border rounded-lg max-h-[340px] min-w-[300px]">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charges</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold mt-4 text-lg text-gray-600">
            <span>Total Amount</span>
            <span>₹{orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600 mt-2">
            <span>You will save</span>
            <span>₹{savings.toFixed(2)} on this order</span>
          </div>
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
