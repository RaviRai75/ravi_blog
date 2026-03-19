import { useUser, useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import Image from "../Components/Image";

const MyPosts = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["myPosts", user?.username],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts?author=${user.username}&limit=100`,
      );
      return res.data;
    },
    enabled: !!user?.username,
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
    onError: () => toast.error("Failed to delete post"),
  });

  const handleDelete = (postId, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteMutation.mutate(postId);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500">Sign in to see your posts.</p>
        <Link
          to="/login"
          className="px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const posts = data?.posts || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">My Posts</h1>
          <p className="text-gray-400 text-sm mt-1">
            {isPending
              ? "Loading..."
              : `${posts.length} post${posts.length !== 1 ? "s" : ""} published`}
          </p>
        </div>
        <Link
          to="/write"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-md shadow-purple-200 text-sm"
        >
          <span>✍️</span> New Post
        </Link>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 animate-pulse flex gap-4"
            >
              <div className="w-28 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-20 text-red-400">
          Failed to load posts.
        </div>
      )}

      {/* Empty */}
      {!isPending && !error && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-4xl">
            📝
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-semibold text-lg">No posts yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Start writing and your posts will appear here.
            </p>
          </div>
          <Link
            to="/write"
            className="px-6 py-2.5 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
          >
            Write your first post
          </Link>
        </div>
      )}

      {/* Post list */}
      {!isPending && posts.length > 0 && (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              {post.img ? (
                <Link to={`/${post.slug}`} className="flex-shrink-0">
                  <Image
                    src={post.img}
                    w="112"
                    h="80"
                    alt={post.title}
                    className="w-28 h-20 object-cover rounded-xl"
                  />
                </Link>
              ) : (
                <div className="w-28 h-20 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-3xl">
                  📄
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={`/${post.slug}`}
                    className="font-bold text-gray-800 hover:text-purple-600 transition-colors line-clamp-1 text-base"
                  >
                    {post.title}
                  </Link>
                  {post.isFeatured && (
                    <span className="flex-shrink-0 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {post.desc}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {format(post.createdAt)}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    👁️ {post.visit || 0} views
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0 justify-center">
                <button
                  onClick={() => navigate(`/edit/${post.slug}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id, post.title)}
                  disabled={deleteMutation.isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
