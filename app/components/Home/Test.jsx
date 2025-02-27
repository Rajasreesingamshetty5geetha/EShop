import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Filter } from '@mui/icons-material';
import React, { useState } from 'react';

const Test = () => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(600);
  const options = [100, 200, 300, 400, 500, 600];
  const [isOpen, setIsOpen] = useState(false);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value < maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value > minPrice) setMaxPrice(value);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:hidden z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        <Filter className='h-6 w-6' />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`
        fixed md:sticky top-0 
        h-screen md:h-auto
        w-[280px] 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        bg-white
        border-r border-gray-300
        p-4
        overflow-y-auto
        z-40 md:z-0
      `}>
        <h2 className="text-gray-800 text-lg font-semibold">Filters</h2>
        <hr className=" my-4 mx-[-1rem] border-gray-400" />

        {/* Price Filter */}
        <section className="mb-4">
          <h3 className="font-semibold text-md text-black mb-2">Price</h3>

          {/* Dual Range Slider */}
          <div className="relative w-full">
            <input
              type="range"
              min="100"
              max="600"
              step="100"
              value={minPrice}
              onChange={handleMinChange}
              className="absolute w-full bg-transparent appearance-none z-10"
            />
            <input
              type="range"
              min="100"
              max="600"
              step="100"
              value={maxPrice}
              onChange={handleMaxChange}
              className="absolute w-full bg-transparent appearance-none z-20"
            />
            <div className="relative w-full h-4 bg-gray-200 mt-4">
              <div
                className="absolute top-1 h-2 bg-blue-500"
                style={{
                  left: `${((minPrice - 100) / 500) * 100}%`,
                  width: `${((maxPrice - minPrice) / 500) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Dropdown Selectors */}
          <div className="flex justify-between items-center mt-4">
            <label htmlFor="minPrice" className="sr-only">Minimum Price</label>
            <select
              id="minPrice"
              value={minPrice}
              onChange={handleMinChange}
              className="p-2 border border-gray-500 rounded text-gray-700"
            >
              {options.map((price) => (
                <option key={price} value={price}>
                  {price === 100 ? "Min" : `₹${price}`}
                </option>
              ))}
            </select>
            <span className="text-black">to</span>
            <label htmlFor="maxPrice" className="sr-only">Maximum Price</label>
            <select
              id="maxPrice"
              value={maxPrice}
              onChange={handleMaxChange}
              className="p-2 border border-gray-500 rounded text-gray-700"
            >
              {options.map((price) => (
                <option key={price} value={price}>
                  {price === 600 ? "600+" : `₹${price}`}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Color Section */}
        <section>
          <div className="flex justify-between">
            <h3 className="font-semibold text-md text-black ">Color</h3>
            <button>
              <ChevronDownIcon className="size-4 text-gray-600 cursor-pointer" />
            </button>

          </div>
        </section>
      </aside>

    </div>

  );
};

export default Test;
