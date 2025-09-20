import React from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border p-2 w-full rounded mb-4"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchInput;
