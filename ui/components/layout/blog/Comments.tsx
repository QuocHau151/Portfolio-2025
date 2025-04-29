"use client";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = () => {
  const [comment, setComment] = useState("");

  const dummyComments: Comment[] = [
    {
      id: "1",
      author: {
        name: "Alex Thompson",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
      content:
        "This is a fantastic article! The insights on TypeScript patterns are particularly helpful.",
      date: "2 hours ago",
      likes: 12,
    },
    {
      id: "2",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      },
      content:
        "Great explanation of advanced concepts. Would love to see more content like this.",
      date: "5 hours ago",
      likes: 8,
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="mb-8 flex items-center text-2xl font-bold text-white">
        <MessageCircle size={24} className="mr-2" />
        Comments ({dummyComments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-8">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="focus:ring-primary min-h-[120px] w-full rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-white placeholder-neutral-500 focus:ring-2 focus:outline-none"
        />
        <button className="bg-primary hover:bg-primary mt-4 rounded-lg px-6 py-2 font-medium text-black transition-colors duration-300">
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {dummyComments.map((comment) => (
          <div key={comment.id} className="rounded-lg bg-neutral-900 p-6">
            <div className="mb-4 flex items-center">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h4 className="font-medium text-white">
                  {comment.author.name}
                </h4>
                <p className="text-sm text-neutral-500">{comment.date}</p>
              </div>
            </div>
            <p className="text-neutral-300">{comment.content}</p>
            <div className="mt-4 flex items-center text-sm text-neutral-500">
              <button className="hover:text-primary flex items-center transition-colors duration-300">
                ❤️ {comment.likes}
              </button>
              <button className="hover:text-primary ml-4 transition-colors duration-300">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
