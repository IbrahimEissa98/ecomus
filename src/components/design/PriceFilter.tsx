"use client";

import React, { useState, useEffect } from "react";

interface PriceFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (from: number, to: number) => void;
  className?: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice = 100,
  maxPrice = 45000,
  onPriceChange,
  className = "",
}) => {
  const [fromPrice, setFromPrice] = useState<number>(minPrice);
  const [toPrice, setToPrice] = useState<number>(maxPrice);

  // Validate and update prices when inputs change
  useEffect(() => {
    if (onPriceChange) {
      onPriceChange(fromPrice, toPrice);
    }
  }, [fromPrice, toPrice, onPriceChange]);

  const handleFromPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(minPrice, Math.min(Number(e.target.value), toPrice));
    setFromPrice(value);
  };

  const handleToPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      maxPrice,
      Math.max(Number(e.target.value), fromPrice)
    );
    setToPrice(value);
  };

  const handleFromBlur = () => {
    if (fromPrice > toPrice) {
      setFromPrice(toPrice);
    }
  };

  const handleToBlur = () => {
    if (toPrice < fromPrice) {
      setToPrice(fromPrice);
    }
  };

  return (
    <div className={`price-filter ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="from-price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            From
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              EGP
            </span>
            <input
              id="from-price"
              type="number"
              min={minPrice}
              max={maxPrice}
              value={fromPrice}
              onChange={handleFromPriceChange}
              onBlur={handleFromBlur}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min price"
            />
          </div>
        </div>

        <div className="flex-1">
          <label
            htmlFor="to-price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              EGP
            </span>
            <input
              id="to-price"
              type="number"
              min={minPrice}
              max={maxPrice}
              value={toPrice}
              onChange={handleToPriceChange}
              onBlur={handleToBlur}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max price"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-200 rounded-full h-2 relative mb-2">
        <div
          className="bg-blue-500 absolute h-2 rounded-full"
          style={{
            left: `${((fromPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
            right: `${
              100 - ((toPrice - minPrice) / (maxPrice - minPrice)) * 100
            }%`,
          }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>₹{minPrice.toLocaleString()}</span>
        <span>₹{maxPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
