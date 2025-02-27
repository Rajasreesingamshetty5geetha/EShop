import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Filter } from '@mui/icons-material';
import React, { useState,useEffect } from 'react';
import { data } from '@/app/components/Product/SidebarData'

const Sidebar = ({ filters, setFilters }) => {

  const [range, setRange] = useState([100, 700]);
  const [dropdownValue, setDropdownValue] = useState(600);
  const [isOpen, setIsOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [showClear, setShowClear] = useState(false);
  
  const handleSliderChange = (e, newValue) => {
    const [min, max] = newValue;
    if (max - min < 100) {
      return;
    }
    setRange([min, max]);
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1], // Set maxPrice to 600 or the selected range
    }));
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;

    // If user picked "600+", store it as a string
    if (value === "600+") {
      setDropdownValue("600+");
      setRange([range[0], 700]); // The slider can't go above 600, but that's okay
      setFilters((prev) => ({
        ...prev,
        maxPrice: "600+", // <-- store literal "600+"
      }));
    } else {
      // Otherwise, it's a numeric value
      const numericValue = Number(value);
      setDropdownValue(numericValue);
      setRange([range[0], numericValue]);
      setFilters((prev) => ({
        ...prev,
        maxPrice: numericValue,
      }));
    }

  };


  const handleColorChange = (color) => {
    setFilters((prev) => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];
      return { ...prev, colors: newColors };
    });
    setShowClear(true);
  };

  const handleSizeChange = (size) => {
    setFilters((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
    setShowClear(true);
  };

  const handleDiscountChange = (discount) => {
    setFilters((prev) => {
      const newDiscounts = prev.discounts.includes(discount)
        ? prev.discounts.filter((d) => d !== discount)
        : [...prev.discounts, discount];
      return { ...prev, discounts: newDiscounts };
    });
    setShowClear(true);
  };

  const {
    ColorOptions,
    MoreOptions,
    options,
    SizeOptions,
    Discount,
  } = data

  const handleClearAll = () => {
    setFilters({
      minPrice: 100,
      maxPrice: 1000,
      colors: [],
      sizes: [],
      discounts: [],
    });
    setShowClear(false);
  };
  return (
    <div className='flex mx-auto '>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-56 right-10 md:hidden z-50 bg-pink-500 text-white p-3 rounded-full shadow-lg"
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
          max-w-[280px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px]
          w-full md:w-auto flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          bg-white border-r border-gray-300 border-b
          p-4 overflow-y-auto z-40 md:z-0
      `}>
        <div className='flex justify-between '>
          <h2 className="text-gray-800 text-lg font-semibold">Filters</h2>
          {showClear && (<button onClick={handleClearAll} className='text-blue-500 underline-offset-1'> Clear </button>)}
        </div>
        <hr className=" my-4 mx-[-1rem] border-gray-300" />

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
              value={range[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (range[1] - newMin >= 100) {  // Ensure at least 100 gap
                  handleSliderChange(e, [newMin, range[1]]);
                }
              }}
              className="absolute -ml-4 w-full bg-transparent appearance-none z-20"
            />
            <input
              type="range"
              min="100"
              max="700"
              step="100"
              value={range[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax - range[0] >= 100) {  // Ensure at least 100 gap
                  setRange([range[0], newMax]);
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: newMax === 700 ? "600+" : newMax,
                  }));
                }
              }}
              className="absolute w-full bg-transparent appearance-none z-20"
            />
            <div className="relative w-full h-4 bg-gray-200 mt-4">
              <div
                className="absolute top-1 h-2 bg-blue-500"
                style={{
                  left: `${((range[0] - 100) / (700 - 100)) * 100}%`,
                  width: `${((range[1] - range[0]) / (700 - 100)) * 100}%`,
                }}
              ></div>
            </div>
            <div className="absolute w-full flex justify-between px-2 mt-3    -translate-y-1/2">
              {options.map((price) => (
                <div key={price} className="w-1 h-1 rounded-full bg-gray-500"></div>
              ))}
            </div>
          </div>

          {/* Dropdown Selectors */}
          <div className="flex justify-between items-center mt-5">
            <label htmlFor="minPrice" className="sr-only">Minimum Price</label>
            <select
              id="minPrice"
              value={range[0]}
              onChange={(e) => handleSliderChange(e, [Number(e.target.value), range[1]])}
              className="p-2 border border-gray-500 rounded text-gray-700"
            >
              {options.map((price) => (
                <option key={price} value={price}>
                  {price === 100 ? "Min" : `₹${price}`}
                </option>
              ))}
            </select>
            <span className="text-black p-1">to</span>
            <label htmlFor="maxPrice" className="sr-only">Maximum Price</label>
            <select
              id="maxPrice"
              value={range[1] > 600 ? "600+" : range[1]}
              onChange={handleDropdownChange}
              className="p-2 border border-gray-500 rounded text-gray-700"
            >
              {options.map((price) => (
                <option key={price} value={price}>
                  {price === 600 ? "600+" : `₹${price}`}
                </option>
              ))}
              <option value="600+">600+</option>
            </select>

          </div>
        </section>
        <hr className=" my-4 mx-[-1rem] border-gray-300" />
        {/* Color Section */}
        <section>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setColorOpen(!colorOpen)}>
            <h3 className="font-semibold text-md text-black">Color</h3>
            <ChevronDownIcon className={`h-5 w-5 text-gray-600 transition-transform ${colorOpen ? "rotate-180" : ""}`} />
          </div>

          {colorOpen && (
            <ul className="bg-white px-3">
              {ColorOptions.map((color, index) => (
                <li key={index} className="flex items-center space-x-2 cursor-pointer py-1">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-400" onChange={() => handleColorChange(color)} checked={filters.colors.includes(color)} />
                  <span className="text-gray-700">{color}</span>
                </li>
              ))}
              {showMore && MoreOptions.map((color, index) => (
                <li key={index} className='flex items-center space-x-2 cursor-pointer py-1'>
                  <input type='checkbox' className='form-checkbox h-4 w-4 text-blue-400'
                    onChange={() => handleColorChange(color)}
                    checked={filters.colors.includes(color)} />
                  <span className='text-gray-700'>{color}</span>
                </li>
              ))}
              {!showMore && (
                <li
                  className='text-blue-400 cursor-pointer py-1 hover:underline'
                  onClick={() => setShowMore(true)}
                >
                  More
                </li>
              )}
              {showMore && (
                <li
                  className='text-blue-400 cursor-pointer py-1 hover:underline'
                  onClick={() => setShowMore(false)}
                >
                  Show Less
                </li>
              )}
            </ul>
          )}
        </section>
        <hr className=" my-4 mx-[-1rem] border-gray-300" />
        {/*Size Selection*/}
        <section>
          <div className="flex justify-between items-center cursor-pointer mt-2" onClick={() => setSizeOpen(!sizeOpen)}>
            <h3 className="font-semibold text-md text-black">Size</h3>
            <ChevronDownIcon className={`h-5 w-5 text-gray-600 transition-transform ${sizeOpen ? "rotate-180" : ""}`} />
          </div>

          {sizeOpen && (
            <ul className="bg-white px-3">
              {SizeOptions.map((size, index) => (
                <li key={index} className="flex items-center space-x-2 cursor-pointer py-1">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-400 " onChange={() => handleSizeChange(size)} checked={filters.sizes.includes(size)} />
                  <span className="text-gray-700">{size}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <hr className=" my-4 mx-[-1rem] border-gray-300" />
        {/* Discount Selection*/}
        <section>
          <div className="flex justify-between items-center cursor-pointer mt-2" onClick={() => setDiscountOpen(!discountOpen)}>
            <h3 className="font-semibold text-md text-black">Discount</h3>
            <ChevronDownIcon className={`h-5 w-5 text-gray-600 transition-transform ${discountOpen ? "rotate-180" : ""}`} />
          </div>

          {discountOpen && (
            <ul className="bg-white px-3">
              {Discount.map((discount, index) => (
                <li key={index} className="flex items-center space-x-2 cursor-pointer py-1">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-400" onChange={() => handleDiscountChange(discount)} checked={filters.discounts.includes(discount)} />
                  <span className="text-gray-700">{discount}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <hr className=" my-4 mx-[-1rem] border-gray-300" />
      </aside>

    </div>

  );
};

export default Sidebar;
