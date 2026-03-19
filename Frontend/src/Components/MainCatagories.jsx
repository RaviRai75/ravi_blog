import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const MainCatagories = () => {
  const [searchParams] = useSearchParams();
  const currentCat = searchParams.get("cat");

  const linkClass = (cat) =>
    cat === currentCat || (!currentCat && cat === null)
      ? "bg-green-400 text-white rounded-full px-4 py-2"
      : "hover:bg-green-200 rounded-full px-4 py-2 transition-colors";

  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link to="/posts" className={linkClass(null)}>
          All Posts
        </Link>
        <Link to="/posts?cat=web-design" className={linkClass("web-design")}>
          Web Design
        </Link>
        <Link to="/posts?cat=devlopment" className={linkClass("devlopment")}>
          Development
        </Link>
        <Link to="/posts?cat=database" className={linkClass("database")}>
          Databases
        </Link>
        <Link to="/posts?cat=sec" className={linkClass("sec")}>
          Search Engines
        </Link>
        <Link to="/posts?cat=marketing" className={linkClass("marketing")}>
          Marketing
        </Link>
      </div>
      <span className="text-xl font-bold">|</span>
      <Search />
    </div>
  );
};

export default MainCatagories;
