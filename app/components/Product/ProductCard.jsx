'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Products from './Products.jsx';
import { useRouter } from 'next/navigation.js';

const ProductCard = () => {
  const [filters, setFilters] = useState({
    minPrice: 100,
    maxPrice: 1000,
    colors: [],
    sizes: [],
    discounts: [],
  });

  const router = useRouter();

  
  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="flex">
      <Sidebar filters={filters} setFilters={setFilters} />
      <main className="flex-1 p-4">
       
        <Products filters={filters} onProductClick={handleClick} />
      </main>
    </div>
  );
};

export default ProductCard;
