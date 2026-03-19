import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`,
  );
  return res.data;
};

const CategoryLink = ({ category }) => (
  <Link
    to={`/posts?cat=${category}`}
    className="text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-full transition-colors"
  >
    {category}
  </Link>
);

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return "Nothing";
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image — clickable */}
        {posts[0].img && (
          <Link
            to={`/${posts[0].slug}`}
            className="overflow-hidden rounded-3xl"
          >
            <Image
              src={posts[0].img}
              className="rounded-3xl object-cover w-full hover:scale-105 transition-transform duration-300"
              w="895"
            />
          </Link>
        )}
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <CategoryLink category={posts[0].category} />
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* title */}
        <Link
          to={`/${posts[0].slug}`}
          className="text-xl lg:text-3xl font-semibold lg:font-bold hover:underline"
        >
          {posts[0].title}
        </Link>
      </div>

      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {[posts[1], posts[2], posts[3]].map((post, i) =>
          post ? (
            <div key={post._id} className="lg:h-1/3 flex justify-between gap-4">
              {/* image — clickable */}
              {post.img && (
                <Link
                  to={`/${post.slug}`}
                  className="w-1/3 aspect-video overflow-hidden rounded-3xl"
                >
                  <Image
                    src={post.img}
                    className="rounded-3xl object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    w="298"
                  />
                </Link>
              )}
              {/* details and title */}
              <div className="w-2/3">
                <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                  <h1 className="font-semibold">0{i + 2}.</h1>
                  <CategoryLink category={post.category} />
                  <span className="text-gray-500 text-sm">
                    {format(post.createdAt)}
                  </span>
                </div>
                <Link
                  to={`/${post.slug}`}
                  className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium hover:underline"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
