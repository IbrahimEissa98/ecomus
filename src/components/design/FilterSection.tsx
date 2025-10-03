import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterSectionProps {
  onFilterChange?: (filters: ProductFilters) => void;
}

export interface ProductFilters {
  categories: string[];
  availability: string[];
  priceRange: { min: number; max: number };
  brands: string[];
  rating: number;
  search: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  // Sample data - replace with your actual data
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Beauty",
  ];
  const brands = ["Apple", "Samsung", "Nike", "Sony", "Adidas"];
  const availabilityOptions = ["In Stock", "Out of Stock"];

  const [activeFilters, setActiveFilters] = useState<ProductFilters>({
    categories: [],
    availability: [],
    priceRange: { min: 0, max: 1000 },
    brands: [],
    rating: 0,
    search: "",
  });

  const [openSections, setOpenSections] = useState({
    categories: true,
    availability: true,
    price: true,
    brand: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category];

    const updatedFilters = { ...activeFilters, categories: updatedCategories };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = activeFilters.brands.includes(brand)
      ? activeFilters.brands.filter((b) => b !== brand)
      : [...activeFilters.brands, brand];

    const updatedFilters = { ...activeFilters, brands: updatedBrands };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleAvailabilityChange = (availability: string) => {
    const updatedAvailability = activeFilters.availability.includes(
      availability
    )
      ? activeFilters.availability.filter((a) => a !== availability)
      : [...activeFilters.availability, availability];

    const updatedFilters = {
      ...activeFilters,
      availability: updatedAvailability,
    };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleRatingChange = (rating: number) => {
    const updatedFilters = { ...activeFilters, rating };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handlePriceChange = (min: number, max: number) => {
    const updatedFilters = { ...activeFilters, priceRange: { min, max } };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      categories: [],
      availability: [],
      priceRange: { min: 0, max: 1000 },
      brands: [],
      rating: 0,
      search: "",
    };
    setActiveFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-800 md:sticky md:top-[125px] h-[80vh] rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset
        </button>
      </div>

      {/* Categories Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-medium"
          onClick={() => toggleSection("categories")}
        >
          <span>Categories</span>
          {openSections.categories ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.categories && (
          <div className="mt-2 space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={activeFilters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm"
                >
                  {category}
                </label>
              </div>
            ))}
            <button className="text-sm text-blue-600 mt-2 flex items-center">
              + Show more
            </button>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-medium"
          onClick={() => toggleSection("availability")}
        >
          <span>Availability</span>
          {openSections.availability ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.availability && (
          <div className="mt-2 space-y-2">
            {availabilityOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`availability-${option}`}
                  checked={activeFilters.availability.includes(option)}
                  onChange={() => handleAvailabilityChange(option)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label
                  htmlFor={`availability-${option}`}
                  className="ml-2 text-sm"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-medium"
          onClick={() => toggleSection("price")}
        >
          <span>Price •</span>
          {openSections.price ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.price && (
          <div className="mt-2">
            <div className="flex justify-between mb-2">
              <span className="text-sm">${activeFilters.priceRange.min}</span>
              <span className="text-sm">${activeFilters.priceRange.max}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={activeFilters.priceRange.max}
              onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <button
                className="text-xs px-2 py-1 border border-gray-300 rounded"
                onClick={() => handlePriceChange(0, 25)}
              >
                Under $25
              </button>
              <button
                className="text-xs px-2 py-1 border border-gray-300 rounded"
                onClick={() => handlePriceChange(25, 50)}
              >
                $25 to $50
              </button>
              <button
                className="text-xs px-2 py-1 border border-gray-300 rounded"
                onClick={() => handlePriceChange(50, 100)}
              >
                $50 to $100
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-medium"
          onClick={() => toggleSection("brand")}
        >
          <span>Brand</span>
          {openSections.brand ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.brand && (
          <div className="mt-2 space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brand"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={activeFilters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                  {brand}
                </label>
              </div>
            ))}
            <button className="text-sm text-blue-600 mt-2 flex items-center">
              + Show more
            </button>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-medium"
          onClick={() => toggleSection("rating")}
        >
          <span>Rating</span>
          {openSections.rating ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.rating && (
          <div className="mt-2 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  checked={activeFilters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="h-4 w-4 text-blue-600"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="ml-2 text-sm flex items-center"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-1">& up</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters */}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Search (2 active)</h3>
        <div className="flex flex-wrap gap-2">
          {activeFilters.categories.map((category) => (
            <span
              key={category}
              className="flex items-center bg-blue-400 px-2 py-1 rounded text-xs"
            >
              {category}
              <button
                onClick={() => handleCategoryChange(category)}
                className="ml-1"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          {activeFilters.brands.map((brand) => (
            <span
              key={brand}
              className="flex items-center bg-blue-400 px-2 py-1 rounded text-xs"
            >
              {brand}
              <button onClick={() => handleBrandChange(brand)} className="ml-1">
                <X size={14} />
              </button>
            </span>
          ))}
          {activeFilters.rating > 0 && (
            <span className="flex items-center bg-blue-400 px-2 py-1 rounded text-xs">
              {activeFilters.rating} stars & up
              <button onClick={() => handleRatingChange(0)} className="ml-1">
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
