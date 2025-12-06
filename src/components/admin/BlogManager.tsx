"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt?: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog?all=true");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/blog/${currentPost.slug}` : "/api/blog";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPost),
      });

      const data = await res.json();

      if (data.success) {
        alert(isEditing ? "Post updated!" : "Post created!");
        fetchPosts();
        resetForm();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("Post deleted!");
        fetchPosts();
      }
    } catch (error) {
      alert("Error deleting post");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setTagInput(post.tags.join(", "));
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setCurrentPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: [],
      published: false,
    });
    setTagInput("");
    setIsEditing(false);
  };

  const handleTagsChange = (value: string) => {
    setTagInput(value);
    setCurrentPost({
      ...currentPost,
      tags: value.split(",").map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={currentPost.title}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={currentPost.slug}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, slug: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
                required
                disabled={isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={currentPost.excerpt}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, excerpt: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Content (Markdown)
            </label>
            <textarea
              value={currentPost.content}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, content: e.target.value })
              }
              rows={10}
              className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent resize-none font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="Next.js, React, TypeScript"
              className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={currentPost.published}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, published: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-sm">
              Published
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-border rounded hover:border-accent transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">All Posts</h2>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-secondary">No posts yet. Create your first one!</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id || post.slug}
                className="border border-border rounded p-4 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                    <p className="text-sm text-secondary mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-secondary">/{post.slug}</span>
                      <span
                        className={
                          post.published ? "text-green-500" : "text-yellow-500"
                        }
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-border rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
