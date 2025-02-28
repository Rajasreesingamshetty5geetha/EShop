'use client';
import { ShoppingCart } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useRouter, useSearchParams } from 'next/navigation';

const ProductOverview = ({ product }) => {
  const [selectImage, setSelectImage] = useState(product.imageSrc);
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.some((item) => item.id === product.id);
      if (!itemExists) {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prevCart;
    });

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      router.push('/cart'); // Navigate to cart page
    }, 1000);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8 bg-gray-100 w-full min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left Section (Images) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <img
              src={selectImage}
              alt={product.name}
              className="w-full rounded-md object-cover aspect-square lg:aspect-[5/6] object-top"
            />
          </div>
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            {product.thumbnails?.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Thumbnail"
                className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-gray-300 rounded-lg cursor-pointer object-cover hover:opacity-80 transition"
                onClick={() => setSelectImage(src)}
              />
            ))}
          </div>
        </div>

        {/* Right Section (Product Details) */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center lg:text-left">
            {product.name}
          </h2>

          {/* Price & Rating */}
          <div className="flex items-start gap-3 mt-1 justify-center lg:justify-start">
            <span className="text-xl md:text-2xl font-semibold text-gray-800">
              {(() => {
                const crossPrice = Number(product.cross.replace(/[^0-9.]/g, ""));
                const discountPercentage = parseFloat(product.discount);

                if (!isNaN(crossPrice) && !isNaN(discountPercentage)) {
                  const finalPrice = crossPrice - (discountPercentage / 100) * crossPrice;
                  return `₹${finalPrice.toFixed(2)}`;
                }
                return "Invalid Price";
              })()}
            </span>
            <span className="text-xl md:text-2xl font-medium line-through text-gray-400">
              {product.cross}
            </span>
          </div>
          <div className="flex flex-row gap-2 justify-center mt-4 lg:justify-start">
            <span className="text-md text-green-600 bg-green-100 px-2 py-1 rounded-md">
              {product.discount.replace(" or More", "")}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-md text-yellow-600 bg-gray-50">
              ⭐ {product.rating}
            </span>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-medium text-gray-700 text-center lg:text-left">
              Select Color:
            </h3>
            <div className="flex gap-4 mt-3 justify-center lg:justify-start">
              {["Black", "Blue", "Red"].map((color, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border rounded-full bg-gray-300"></div>
                  <span className="text-sm text-gray-600">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-medium text-gray-700 text-center lg:text-left">
              Select Size:
            </h3>
            <div className="flex gap-3 mt-3 flex-wrap justify-center lg:justify-start">
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <div
                  key={size}
                  className="border w-12 h-12 flex justify-center items-center border-gray-400 rounded-md cursor-pointer hover:bg-gray-400 hover:text-white text-gray-700 font-semibold"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center lg:justify-start">
            {showPopup && (
              <div className="fixed top-20 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
                <ShoppingCart className="w-5 h-5"/><span>Item added to cart! </span>
              </div>
            )}
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button
              className="px-6 lg:px-12 py-3 w-full sm:w-auto bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
 
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
