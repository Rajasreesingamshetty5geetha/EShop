'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { products } from './ProductsData';
import { accessories } from './AccessoriesData';
import Breadcrumb from './Breadcrumb.jsx';
import { data } from './SidebarData.js';
import { ShoppingCart } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';

const Products = ({ filters, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortOpen, setSortOpen] = useState(false);
  const [optionSort, setOptionSort] = useState('New Arrivals');
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const itemExists = cart.some((item) => item.id === product.id);
    if (!itemExists) {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleSortChange = (option) => {
    setOptionSort(option);
    setCurrentPage(1); // Reset to first page
    setSortOpen(false);
  };
  

  const category = searchParams.get("category") || "all";
  const productList = category === "all"
    ? [...products.all, ...(products.kurta || []), ...(products.kurti || []), ...(accessories.all || [])]
    : products[category] || accessories[category] || [];

  const filteredProducts = productList.filter((product) => {
    const crossPrice = Number(product.cross.replace(/[^0-9.]/g, ""));
    const discountPercentage = parseFloat(product.discount);
    const productPrice =
      !isNaN(crossPrice) && !isNaN(discountPercentage)
        ? crossPrice - (discountPercentage / 100) * crossPrice
        : null;

    let matchesPrice = false;

    if (filters.maxPrice === "600+") {
      matchesPrice = productPrice !== null && productPrice >= Number(filters.minPrice);
    } else {
      matchesPrice =
        productPrice !== null &&
        productPrice >= Number(filters.minPrice) &&
        productPrice <= Number(filters.maxPrice);
    }

    return (
      matchesPrice &&
      (filters.colors.length === 0 || filters.colors.includes(product.color)) &&
      (filters.sizes.length === 0 || filters.sizes.includes(product.size)) &&
      (filters.discounts.length === 0 || filters.discounts.includes(product.discount))
    );
  });

  const sortedProducts = useMemo(() => {
    // Copy filtered array to avoid mutating the original
    const sorted = [...filteredProducts].sort((a, b) => {
      const getFinalPrice = (product) => {
        const crossPrice = product.cross
          ? parseFloat(product.cross.replace(/[^0-9.]/g, ''))
          : 0;
        const discountPercentage = product.discount
          ? parseFloat(product.discount)
          : 0;
        return crossPrice - (discountPercentage / 100) * crossPrice;
      };

      const priceA = getFinalPrice(a);
      const priceB = getFinalPrice(b);

      switch (optionSort) {
        case 'Price: Low to High':
          return priceA - priceB;
        case 'Price: High to Low':
          return priceB - priceA;
        case 'New Arrivals':
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA; // Newest first
        default:
          return 0;
      }
    });
    return sorted;
  }, [filteredProducts, optionSort]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <section className="flex flex-row justify-between gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <Breadcrumb />
        </div>
        <button className='relative' onClick={() => window.open('/cart', '_blank')}>
          {cart.length > 0 && (
            <div className="absolute top-8 ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </div>
          )}
          <ShoppingCart className="h-5 w-5 text-gray-600 mt-1" />
        </button>
      </section>
      <div className="bg-white -mt-20">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-gray-700 text-lg font-semibold mb-4 ">{category.toUpperCase()}</h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {currentProducts.map((product) => (
                <a
                  key={product.id}
                  className="group block rounded-lg border bg-white p-4 shadow-md transition-transform hover:scale-105"
                >
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    onClick={() => onProductClick(product.id)}
                    className="w-full rounded-md bg-gray-200 object-cover aspect-[2/3]"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <div className="flex justify-between">
                    <p className="mt-1 text-md font-medium text-gray-700">
                      <span className="text-md md:text-lg  text-gray-700">
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
                      <span className="line-through text-gray-400 ml-2">{product.cross}</span>
                      <br />
                      <span className="text-green-500 text-sm">{product.discount.replace(" or More", "")} off</span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No Products match</p>
          )}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-20 space-x-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-400 hover:bg-gray-600 rounded disabled:opacity-50 text-white font-semibold">Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-400 hover:bg-gray-600 rounded text-white font-semibold disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;