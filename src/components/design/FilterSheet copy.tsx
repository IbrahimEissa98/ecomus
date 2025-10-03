"use client";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Filter, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
// import PriceFilter from "./PriceFilter";
import PriceFilter2 from "./PriceFilter2";
import { apiServices } from "@/services";
import { CategoryAndBrand } from "@/interfaces";
import { Input } from "../ui/input";

// interface NavMobileMenuProps {
//   handleSearch: (e: React.FormEvent) => void;
//   searchQuery: string;
//   setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
//   categories: { name: string; href: string }[];
//   wishlistItems: number;
//   cartItems: number;
// }

interface FilterSectionProps {
  onFilterChange?: (filters: ProductFilters) => void;
}

export interface ProductFilters {
  categories: string[];
  // availability: string[];
  priceRange: { min: number; max: number };
  brands: string[];
  rating: number;
  // search: string;
}

export default function FilterSheet({ onFilterChange }: FilterSectionProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryAndBrand[]>();
  const [brands, setBrands] = useState<CategoryAndBrand[]>();
  const [searchBrand, setSearchBrand] = useState<string>("");

  async function fetchingCategoriesAndBrands() {
    // get all categories
    const categories = await apiServices.getAllCategories();
    setCategories(categories.data);

    // get all brands
    const allBrands: CategoryAndBrand[] = [];
    const brands = await apiServices.getAllBrands();
    allBrands.push(...brands.data);
    let currentPage: number = Number(brands.metadata.currentPage);
    while (currentPage != brands.metadata.numberOfPages) {
      allBrands.push(
        ...(await apiServices.getAllBrands(Number(brands.metadata.nextPage)))
          .data
      );
      currentPage++;
    }
    setBrands(allBrands);
  }

  // const [openSections, setOpenSections] = useState({
  //   categories: true,
  //   availability: false,
  //   price: false,
  //   brand: false,
  //   rating: false,
  // });

  // const toggleSection = (section: keyof typeof openSections) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };

  const [activeFilters, setActiveFilters] = useState<ProductFilters>({
    categories: [],
    // availability: [],
    priceRange: { min: 0, max: 1000 },
    brands: [],
    rating: 0,
    // search: "",
  });

  const handleCategoryChange = (category: string) => {
    const updatedCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category];

    const updatedFilters = { ...activeFilters, categories: updatedCategories };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };
  // const handleCategoryChange = (category: string) => {
  //   const updatedCategories = activeFilters.categories.includes(category)
  //     ? activeFilters.categories.filter((c) => c !== category)
  //     : [...activeFilters.categories, category];

  //   const updatedFilters = { ...activeFilters, categories: updatedCategories };
  //   setActiveFilters(updatedFilters);
  //   onFilterChange?.(updatedFilters);
  // };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = activeFilters.brands.includes(brand)
      ? activeFilters.brands.filter((b) => b !== brand)
      : [...activeFilters.brands, brand];

    const updatedFilters = { ...activeFilters, brands: updatedBrands };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  // const handleAvailabilityChange = (availability: string) => {
  //   const updatedAvailability = activeFilters.availability.includes(
  //     availability
  //   )
  //     ? activeFilters.availability.filter((a) => a !== availability)
  //     : [...activeFilters.availability, availability];

  //   const updatedFilters = {
  //     ...activeFilters,
  //     availability: updatedAvailability,
  //   };
  //   setActiveFilters(updatedFilters);
  //   onFilterChange?.(updatedFilters);
  // };

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

  const closeSheet = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  useEffect(() => {
    fetchingCategoriesAndBrands();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="default" className=" border shadow-md ">
          <Filter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-80 w-full p-0 max-h-screen">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b bg-gray-100 dark:bg-slate-800">
            <h2 className="text-3xl font-bold flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 466 511.53"
                className="w-8 h-8 inline-block me-3 fill-accent-foreground"
              >
                <path d="M323.15 272.83c-26.26 31.89-39.58 52.53-37.91 96.74v76.57c-.58 3.76-2.07 7.67-5.13 12.16l-84.78 50.94c-5.26 5.12-15.16 1.21-15.16-7.58V369.09c-1.53-30.48-4.19-49.37-18.26-70.8C134.22 264.72 14.13 131.75 1.37 106.55A9.573 9.573 0 010 101.61V51.16h.03c0-.8.1-1.6.31-2.41C10.02 11.61 138.23-2.61 257.06.39c38.07.96 75.04 3.51 106.54 7.45 32.15 4.03 59.16 9.57 76.63 16.43 17.59 6.92 27.09 16.12 25.62 27.78l.02 49.17c.08 1.92-.42 3.88-1.54 5.6-25.62 39.57-105.73 122.96-141.18 166.01zM456.3 101.61l-.02-50.45c7.51-49.19-430.65-61.46-446.67 0v50.45c26.47 57.71 402.54 68.16 446.69 0zM232.99 22.9c125.38 0 193.39 13.41 193.39 29.96 0 16.54-68.01 29.96-193.39 29.96C107.61 82.82 39.6 69.4 39.6 52.86c0-16.55 68.01-29.96 193.39-29.96z" />
              </svg>{" "}
              <span>Filters</span>
            </h2>
          </div>

          {/* Filtering items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {/* Categories Filter */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-xl">
                  Categories
                </AccordionTrigger>
                <AccordionContent className="flex flex-col mt-0 gap-2 px-4 text-balance max-h-40 h-full hover:overflow-y-auto custom-scrollbar">
                  {categories?.map((category) => (
                    <div key={category._id} className="flex items-center ">
                      <input
                        type="radio"
                        name="category"
                        id={`category-${category._id}`}
                        checked={activeFilters.categories.includes(
                          category.name
                        )}
                        onChange={() => handleCategoryChange(category.name)}
                        className="h-4 w-4 text-blue-600 rounded cursor-pointer"
                      />
                      <label
                        htmlFor={`category-${category._id}`}
                        className="ml-2 text-sm cursor-pointer hover:underline"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Brand Filter */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-semibold text-xl">
                  Brands
                </AccordionTrigger>
                <AccordionContent className="flex flex-col mt-0 gap-2 px-4 text-balance max-h-40 h-full hover:overflow-y-auto custom-scrollbar">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search Brand name..."
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                      className="w-full ps-7"
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-gray-500 w-4" />
                  </div>
                  {brands?.map(
                    (brand) =>
                      brand.name
                        .toLowerCase()
                        .trim()
                        .includes(searchBrand.toLowerCase().trim()) && (
                        <div key={brand._id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`brand-${brand._id}`}
                            checked={activeFilters.brands.includes(brand.name)}
                            onChange={() => handleBrandChange(brand.name)}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label
                            htmlFor={`brand-${brand._id}`}
                            className="ml-2 text-sm"
                          >
                            {brand.name}
                          </label>
                        </div>
                      )
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Price Filter */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold text-xl">
                  Price •
                </AccordionTrigger>
                <AccordionContent className="flex flex-col mt-0 gap-2 px-4 text-balance">
                  <div className="mt-3">
                    <PriceFilter2 />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Rating Filter */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="font-semibold text-xl">
                  Rating
                </AccordionTrigger>
                <AccordionContent className="flex flex-col mt-0 gap-2 px-4 text-balance max-h-40 hover:overflow-y-auto custom-scrollbar">
                  {[4, 3, 2, 1].map((rating) => (
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Active Filters */}
          <div className="my-3">
            <div className="flex flex-wrap gap-2 mb-3">
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
                  <button
                    onClick={() => handleBrandChange(brand)}
                    className="ml-1"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              {activeFilters.rating > 0 && (
                <span className="flex items-center bg-blue-400 px-2 py-1 rounded text-xs">
                  {activeFilters.rating} stars & up
                  <button
                    onClick={() => handleRatingChange(0)}
                    className="ml-1"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
            {/* Search Button */}
            <Button
              onClick={() => {
                closeSheet();
              }}
              className="text-sm max-w-52 w-full mx-auto block font-medium mb-2 bg-blue-500 hover:bg-blue-400 text-white"
            >
              Search
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
