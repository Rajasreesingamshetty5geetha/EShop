<div className="relative">
            {/* Sort Dropdown Button */}
            <div className="relative">
              <div
                className="flex justify-between items-center w-60 cursor-pointer border rounded-md p-2 -ml-2 space-x-2 lg:mb-2 mb-6"
                onClick={() => setSortOpen(!sortOpen)}
              >
                <h3 className="font-semibold text-gray-800 text-sm">
                  Sort By: <span className="text-gray-600">{optionSort}</span>
                </h3>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-600 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </div>
              {sortOpen && (
                <ul className="bg-white w-60 mt-2 -ml-2 absolute border p-1 shadow-md z-10">
                  {SortOptions.map((sort, index) => (
                    <li
                      key={index}
                      className={`flex items-center space-x-2 cursor-pointer py-1 hover:bg-blue-500 text-gray-500 hover:text-white ${optionSort === sort ? "bg-blue-500 text-white" : ""
                        }`}
                      onClick={() => handleSortChange(sort)}
                    >
                      {sort}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>