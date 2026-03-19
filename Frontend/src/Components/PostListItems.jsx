import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const PostListItems = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image — clickable */}
      {post.img && (
        <Link
          to={`/${post.slug}`}
          className="md:hidden xl:block xl:w-1/3 overflow-hidden rounded-2xl"
        >
          <Image
            src={post.img}
            className="rounded-2xl object-cover w-full hover:scale-105 transition-transform duration-300"
            w="735"
          />
        </Link>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          to={`/${post.slug}`}
          className="text-4xl font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link
            className="text-green-500 hover:underline"
            to={`/posts?author=${post.user.username}`}
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link
            className="text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-full transition-colors"
            to={`/posts?cat=${post.category}`}
          >
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p className="text-gray-600">{post.desc}</p>
        <Link
          to={`/${post.slug}`}
          className="underline text-green-600 text-sm hover:text-green-800"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
