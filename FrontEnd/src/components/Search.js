import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="m-3">
      <label htmlFor="search" className="form-label m-3">
        إبحث
      </label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="اكتب الإسم او الرقم القومي او رقم الهاتف "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-primary m-1"
          type="button"
          onClick={handleSearch}
        >
          بحث
        </button>
      </div>
    </div>
  );
}

export default Search;
