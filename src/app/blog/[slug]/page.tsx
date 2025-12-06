import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import connectDB from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";

async function getBlogPost(slug: string): Promise<any> {
  try {
    await connectDB();
    const post = await BlogPostModel.findOne({ slug, published: true }).lean();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-secondary">
          <time>
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
      </header>

      <div className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-lg leading-relaxed mb-4 text-secondary">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-secondary">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-secondary">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="ml-4">{children}</li>
            ),
            code: ({ inline, children, ...props }: any) => 
              inline ? (
                <code className="bg-border px-2 py-1 rounded text-accent font-mono text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <code className="block bg-border p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4" {...props}>
                  {children}
                </code>
              ),
            pre: ({ children }) => (
              <pre className="bg-border p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-secondary">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                className="text-accent hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-foreground">{children}</strong>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await BlogPostModel.find({ published: true }).select("slug").lean();
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
