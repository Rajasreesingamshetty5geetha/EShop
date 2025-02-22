'use client';
import React, {  useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Products from './Products.jsx';

const ProductCard = () => {
  const [filters,setFilters] = useState({
    minPrice: 100,
    maxPrice: 1000,
    colors: [],
    sizes:[],
    discounts:[],
  });

  return (
    <div className="flex">
      <Sidebar filters={filters} setFilters={setFilters} />
      <main className="flex-1 p-4 ">
        {/* Product Section */} 
        <Products filters={filters}/>
      </main>
    </div>
  );
};

export default ProductCard;
