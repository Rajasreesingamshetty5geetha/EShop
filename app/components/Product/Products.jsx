'use client';
import React, { useEffect, useState } from 'react';
import { products } from './ProductsData';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Breadcrumb from './Breadcrumb.jsx';
import { data } from './SidebarData.js';
import { ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
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
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem("cart", JSON.stringify([...cart, { ...product, quantity: 1 }]));
    }
  };

  const handleSortChange = (option) => {
    setOptionSort(option);
    setSortOpen(false);
  };

  const category = searchParams.get("category") || "all"; 
  const allProducts = products[category];
  const { SortOptions } = data;
  console.log(filters);
  
  const filteredProducts = allProducts.filter((product) => {
    const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    let matchesPrice = false;
    if (filters.maxPrice === "600+") {
      matchesPrice = productPrice >= Number(filters.minPrice);
    } else {
      matchesPrice =
        productPrice >= Number(filters.minPrice) &&
        productPrice <= Number(filters.maxPrice);
    }
    const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.color);
    const matchesSize = filters.sizes.length === 0 || filters.sizes.includes(product.size);
    const matchesDiscount = filters.discounts.length === 0 || filters.discounts.includes(product.discount);
    return matchesPrice && matchesColor && matchesSize && matchesDiscount;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <section className="flex flex-row justify-between gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <Breadcrumb />
          {/* Sort */}
          <div
            className="flex justify-between items-center w-60 cursor-pointer border rounded-md p-2 -ml-2 space-x-2 lg:mb-2 mb-6"
            onClick={() => setSortOpen(!sortOpen)}
          >
            <h3 className="font-semibold text-gray-800 text-sm">
              Sort By: <span className="text-gray-600">{optionSort}</span>
            </h3>
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-600 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {sortOpen && (
            <ul className="bg-white w-60 mt-20 -ml-2 absolute border-r border-l border-b p-1 shadow-md z-10">
              {SortOptions.map((sort, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer py-1"
                  onClick={() => handleSortChange(sort)}
                >
                  <span className="text-gray-500 hover:bg-blue-500 hover:w-60 hover:text-white">
                    {sort}
                  </span>
                </li>
              ))}
            </ul>
          )}
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
      {/* Products */}
      <div className="bg-white -mt-20">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-gray-700 text-lg font-semibold mb-4 ">{category.toUpperCase()}</h2>
          <div className="relative">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {currentProducts.map((product) => (
                  <a
                    key={product.id}
                    className="group block rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-transform duration-300 hover:ease-out hover:scale-105"
                  >
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      onClick={() => onProductClick(product.id)}
                      className="w-full rounded-md bg-gray-200 object-cover object-top aspect-[2/3]"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <div className="flex flex-row justify-between">
                      <p className="mt-1 text-md font-medium text-gray-700">
                        {product.price}{' '}
                        <span className="line-through text-gray-400">{product.cross}</span>
                        <br />
                        <span className="text-green-500 text-sm">{product.discount.replace(" or More", "")} off</span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="col-span-full text-center text-gray-500">No Products match</p>
            )}
            {/* Pagination Control */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center items-center mt-20 space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
