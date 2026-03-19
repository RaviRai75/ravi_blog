import React from "react";
import Search from "./Search";
import { useSearchParams } from "react-router-dom";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "";
  const currentCat = searchParams.get("cat") || "";

  const handleFilterChange = (e) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: e.target.value,
    });
  };

  const handleCategoryChange = (category) => {
    const params = Object.fromEntries(searchParams.entries());
    if (category === "general") {
      delete params.cat;
    } else {
      params.cat = category;
    }
    setSearchParams(params);
  };

  const catLinkClass = (cat) =>
    (cat === "general" ? !currentCat : currentCat === cat)
      ? "cursor-pointer font-semibold text-green-600"
      : "cursor-pointer hover:text-green-500 transition-colors";

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2">
        {[
          { value: "newest", label: "Newest" },
          { value: "popular", label: "Most Popular" },
          { value: "trending", label: "Trending" },
          { value: "oldest", label: "Oldest" },
        ].map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              onChange={handleFilterChange}
              value={value}
              checked={currentSort === value}
              className="appearance-none w-4 h-4 border-[1.5px] border-green-700 cursor-pointer rounded-sm checked:bg-green-400 bg-white"
            />
            {label}
          </label>
        ))}
      </div>

      <h1 className="mb-4 mt-8 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          className={catLinkClass("general")}
          onClick={() => handleCategoryChange("general")}
        >
          All
        </span>
        <span
          className={catLinkClass("web-design")}
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </span>
        <span
          className={catLinkClass("devlopment")}
          onClick={() => handleCategoryChange("devlopment")}
        >
          Development
        </span>
        <span
          className={catLinkClass("database")}
          onClick={() => handleCategoryChange("database")}
        >
          Databases
        </span>
        <span
          className={catLinkClass("sec")}
          onClick={() => handleCategoryChange("sec")}
        >
          Search Engines
        </span>
        <span
          className={catLinkClass("marketing")}
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
