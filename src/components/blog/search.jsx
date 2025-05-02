import React from "react";

import { SearchIcon } from "lucide-react";

export const Search = ({ value, onChange, placeholder }) => (
  <div className="mb-6 relative md:w-lg w-full">
    <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);
