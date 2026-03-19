import React, { useRef } from "react";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`,
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const formRef = useRef(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to post comment");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate({ desc: formData.get("desc") });
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="underline text-xl text-gray-500">Comments</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a comment..."
          required
          className="w-full p-4 rounded-xl bg-white resize-none"
          rows={3}
        />
        <button
          disabled={mutation.isPending}
          className="bg-green-300 px-4 py-3 text-white font-medium rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Sending..." : "Send"}
        </button>
      </form>

      {isPending ? (
        <p className="text-gray-400 text-sm">Loading comments...</p>
      ) : error ? (
        <p className="text-red-400 text-sm">Error loading comments</p>
      ) : (
        <>
          {mutation.isPending && mutation.variables && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: { img: null, username: user?.username },
              }}
            />
          )}
          {data.length === 0 && (
            <p className="text-gray-400 text-sm">
              No comments yet. Be the first!
            </p>
          )}
          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
