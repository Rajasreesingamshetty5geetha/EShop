'use client';
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { products } from "../Product/ProductsData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../Navbar";

const Cart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || ''; 
  const [cart, setCart] = useState([]);

  const allProducts = Object.values(products).flat();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCart = storedCart.map((cartItem) => {
      const productDetails = allProducts.find((p) => p.id === cartItem.id);
      return productDetails ? { ...productDetails, quantity: cartItem.quantity } : null;
    }).filter(Boolean); 

    setCart(updatedCart);
  }, []);

  const getDiscountedPrice = (crossPrice, discount) => {
    const numericCrossPrice = Number(crossPrice.replace(/[^0-9.]/g, ""));
    const numericDiscount = parseFloat(discount);
    if (!isNaN(numericCrossPrice) && !isNaN(numericDiscount)) {
      return numericCrossPrice - (numericDiscount / 100) * numericCrossPrice;
    }
    return numericCrossPrice;
  };


  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(({ id, quantity }) => ({ id, quantity }))));
  };

  const updateQuantity = (id, newQty) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(({ id, quantity }) => ({ id, quantity }))));
  };

  const subtotal = cart.reduce((total, item) => {
    const discountedPrice = getDiscountedPrice(item.cross, item.discount);
    return total + discountedPrice * item.quantity;
  }, 0);

  const totalDiscount = cart.reduce((discountTotal, item) => {
    const numericCrossPrice = Number(item.cross.replace(/[^0-9.]/g, ""));
    const numericDiscount = parseFloat(item.discount);
    if (isNaN(numericCrossPrice) || isNaN(numericDiscount)) return discountTotal;

    return discountTotal + (numericCrossPrice * numericDiscount / 100) * item.quantity;
  }, 0);

  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const shipping = 0;
  const orderTotal = subtotal + tax;
  const savings = totalDiscount;


  return (
    <div>
      <Navbar/>
      <div className="max-w-full mx-auto p-6 bg-white">
        <h1 className="text-2xl font-bold mb-6 flex items-center text-gray-900">Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-600">
                Your cart is empty. <Link href="/" className="text-blue-400">Start Shopping⬅️🛒 </Link>
              </p>
            ) : (
              cart.map((item) => {
                const discountedPrice = getDiscountedPrice(item.cross, item.discount);
                return (
                  <div key={item.id} className="flex p-4 items-center border rounded-lg">
                    <img src={item.imageSrc} alt={item.imageAlt} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-md object-cover object-top" />
                    <div className="ml-4 flex-1">
                      <h2 className="text-lg font-medium text-gray-600">{item.name}</h2>
                      <p className="text-gray-600">{item.color} | {item.size || "Free Size"}</p>
                      <div className="flex gap-2">
                        <p className="font-semibold text-gray-700">
                          ₹{(discountedPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-green-500 text-sm mt-[2.5px]">{item.discount.replace(" or More", "")} off</p>
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
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-500 cursor-pointer">✖</button>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Summary */}
          <div className="p-4 border rounded-lg max-h-[340px] min-w-[300px]">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Price</span>
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
    </div>
  );
};

export default Cart;
