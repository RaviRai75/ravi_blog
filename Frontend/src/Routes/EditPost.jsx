import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../Components/Upload";

const CATEGORIES = [
  { value: "general", label: "General", emoji: "📝" },
  { value: "web-design", label: "Web Design", emoji: "🎨" },
  { value: "devlopment", label: "Development", emoji: "💻" },
  { value: "database", label: "Database", emoji: "🗄️" },
  { value: "sec", label: "Search Engines", emoji: "🔍" },
  { value: "marketing", label: "Marketing", emoji: "📣" },
];

const EditPost = () => {
  const { slug } = useParams();
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [postId, setPostId] = useState(null);

  // fetch existing post
  const { isPending: loadingPost, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${slug}`,
      );
      return res.data;
    },
    onSuccess: (data) => {
      setTitle(data.title);
      setDesc(data.desc);
      setContent(data.content);
      setSelectedCategory(data.category);
      setPostId(data._id);
      if (data.img) setCover({ filePath: data.img, existing: true });
    },
  });

  // also handle via useEffect since onSuccess is deprecated in v5
  const { data: postData } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${slug}`,
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setDesc(postData.desc);
      setContent(postData.content);
      setSelectedCategory(postData.category);
      setPostId(postData._id);
      if (postData.img) setCover({ filePath: postData.img, existing: true });
    }
  }, [postData]);

  useEffect(() => {
    img && setContent((prev) => prev + `<p><img src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setContent(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`,
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const token = await getToken();
      return axios.put(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        updatedPost,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    },
    onSuccess: (res) => {
      toast.success("Post updated successfully!");
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error("Failed to update post.");
    },
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500">You need to be signed in to edit posts.</p>
        <Link
          to="/sign-in"
          className="px-6 py-2 bg-purple-500 text-white rounded-xl"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (loadingPost || !postData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-400 mt-20">Post not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      img: cover?.existing ? cover.filePath : cover?.filePath || "",
      title,
      category: selectedCategory,
      desc,
      content,
    });
  };

  const isUploading = progress > 0 && progress < 100;
  const charCount = content.replace(/<[^>]*>/g, "").length;
  const coverUrl = cover?.existing
    ? `${import.meta.env.VITE_IK_URL_ENDPOINT}${cover.filePath}`
    : cover?.filePath
      ? `${import.meta.env.VITE_IK_URL_ENDPOINT}${cover.filePath}`
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Edit Post
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Update your post content ✏️
          </p>
        </div>
        <Link
          to={`/${slug}`}
          className="text-sm text-gray-400 hover:text-purple-500 transition-colors"
        >
          ← Back to Post
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Cover image */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-purple-100 bg-white">
          {coverUrl ? (
            <div className="relative group h-64">
              <img
                src={coverUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                <Upload
                  type="image"
                  setProgress={setProgress}
                  setData={setCover}
                >
                  <button
                    type="button"
                    className="px-5 py-2 bg-white/90 backdrop-blur text-gray-800 rounded-xl text-sm font-semibold hover:bg-white shadow-lg"
                  >
                    🔄 Change Cover
                  </button>
                </Upload>
              </div>
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                ✓ Cover set
              </span>
            </div>
          ) : (
            <Upload type="image" setProgress={setProgress} setData={setCover}>
              <div className="flex flex-col items-center justify-center py-14 cursor-pointer hover:bg-purple-50/60 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 group-hover:bg-purple-200 transition-colors flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold">Add a cover image</p>
                <p className="text-gray-400 text-sm mt-1">
                  Recommended: 1200×630 · PNG, JPG
                </p>
              </div>
            </Upload>
          )}
          {isUploading && (
            <div className="px-5 py-3 bg-purple-50 border-t border-purple-100">
              <div className="flex items-center justify-between text-xs font-medium text-purple-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post title..."
            className="w-full text-3xl font-extrabold bg-transparent outline-none text-gray-800 placeholder-gray-200 tracking-tight"
          />
        </div>

        {/* Category pills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === cat.value
                    ? "bg-purple-500 text-white shadow-md shadow-purple-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
            Short Description
          </label>
          <textarea
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write a short summary..."
            rows={3}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-300 resize-none text-sm leading-relaxed"
          />
        </div>

        {/* Content editor */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 pt-5 pb-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
              Content
            </label>
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 pt-10">
                <Upload type="image" setProgress={setProgress} setData={setImg}>
                  <button
                    type="button"
                    title="Insert image"
                    className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition-all text-lg shadow-sm"
                  >
                    🖼️
                  </button>
                </Upload>
                <Upload
                  type="video"
                  setProgress={setProgress}
                  setData={setVideo}
                >
                  <button
                    type="button"
                    title="Insert video"
                    className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition-all text-lg shadow-sm"
                  >
                    🎬
                  </button>
                </Upload>
              </div>
              <ReactQuill
                theme="snow"
                className="flex-1 min-h-[280px]"
                value={content}
                onChange={setContent}
                readOnly={isUploading}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4">
          <p className="text-xs text-gray-400">{charCount} characters</p>
          <div className="flex items-center gap-3">
            {mutation.isError && (
              <span className="text-red-400 text-sm">
                Failed to update. Try again.
              </span>
            )}
            <button
              type="submit"
              disabled={mutation.isPending || isUploading}
              className="px-8 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-md shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {mutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <span>💾</span> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
