import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ProductTest = () => {
  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-[240px] shrink-0 pt-4 px-4 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="space-y-4">
            {/* Department Section */}
            <section>
              <h2 className="text-lg font-bold mb-2">Department</h2>
              <ul className="space-y-2 text-sm">
                <li className="text-blue-500 font-medium">Women's Fashion</li>
                <li className="hover:text-blue-500 cursor-pointer">Clothing</li>
                <li className="hover:text-blue-500 cursor-pointer">Shoes</li>
                <li className="hover:text-blue-500 cursor-pointer">Jewelry</li>
                <li className="hover:text-blue-500 cursor-pointer">Watches</li>
                <li className="hover:text-blue-500 cursor-pointer">Handbags</li>
              </ul>
            </section>

            {/* Your existing price filter */}
            <section>
              <h2 className="text-lg font-bold mb-2">Price</h2>
              {/* Your price filter content */}
            </section>

            {/* Brands Section */}
            <section>
              <h2 className="text-lg font-bold mb-2">Brands</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Brand 1</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Brand 2</span>
                </li>
                {/* Add more brands */}
              </ul>
            </section>

            {/* Your existing color section */}
            <section>
              <h2 className="text-lg font-bold mb-2">Color</h2>
              {/* Your color filter content */}
            </section>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Results Header */}
          <div className="mb-4">
            <h1 className="text-xl font-bold">Results</h1>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-600">1-48 of over 100,000 results</p>
              <select className="border p-2 text-sm rounded">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Avg. Customer Review</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow">
                <div className="aspect-square mb-4">
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1 line-clamp-2">
                    Product Name with Two Lines of Text Showing
                  </h3>
                  <div className="flex items-baseline mb-1">
                    <span className="text-sm">₹</span>
                    <span className="text-lg font-bold">499</span>
                    <span className="text-sm text-gray-500 ml-1">₹999</span>
                    <span className="text-sm text-green-600 ml-2">50% off</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Free Delivery by Amazon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductTest;
