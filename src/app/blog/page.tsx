import Link from "next/link";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

async function getBlogPosts() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Blog<span className="text-accent">.</span>
      </h1>
      <p className="text-xl text-secondary mb-16">
        Thoughts on web development, programming, and technology
      </p>

      {posts.length === 0 ? (
        <p className="text-secondary">
          No blog posts yet. Create your first post in the{" "}
          <Link href="/admin" className="text-accent hover:underline">
            admin panel
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-12">
          {posts.map((post: any) => (
            <article key={post._id.toString()} className="border-b border-border pb-12">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-3xl font-bold mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-secondary mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <time className="text-sm text-secondary">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div className="flex gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-border rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-accent text-sm group-hover:underline">
                Read more →
              </span>
            </Link>
          </article>
          ))}
        </div>
      )}
    </div>
  );
}
