import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';

export default function FilterBar() {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-sm text-gray-700">
      {/* Category Dropdown */}
      <div className="flex items-center space-x-2">
        <Globe className="h-5 w-5 text-brand-600" />
        <span>Shop by Categories</span>
        <ChevronDown className="h-4 w-4" />
        {/* Dropdown items hidden, would appear on click */}
      </div>
      {/* Free Shipping Label */}
      <div className="text-brand-700 font-medium">Free international shipping</div>
    </div>
  );
}
