import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import BlogPost from "@/models/BlogPost";

async function getFeaturedProjects() {
  try {
    await connectDB();
    const projects = await Project.find({ featured: true })
      .sort({ order: 1 })
      .limit(3)
      .lean();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getLatestPosts() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getFeaturedProjects(),
    getLatestPosts(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-32">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            Full-Stack Developer
            <span className="text-accent">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary max-w-2xl">
            Building modern web applications with clean code and innovative solutions.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-primary text-background font-medium rounded hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
            >
              View Projects <ArrowRight />
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-border font-medium rounded hover:border-accent transition-colors"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-32">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          Featured Projects
          <span className="text-accent">_</span>
        </h2>
        {featuredProjects.length === 0 ? (
          <p className="text-secondary">
            No featured projects yet. Add some in the{" "}
            <Link href="/admin" className="text-accent hover:underline">
              admin panel
            </Link>
            .
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project: any) => (
              <Link
                key={project._id.toString()}
                href={`/projects`}
                className="group border border-border rounded-lg p-6 hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-border rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Latest Blog Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          Latest Articles
          <span className="text-accent">_</span>
        </h2>
        {latestPosts.length === 0 ? (
          <p className="text-secondary">
            No blog posts yet. Create your first post in the{" "}
            <Link href="/admin" className="text-accent hover:underline">
              admin panel
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-6">
            {latestPosts.map((post: any) => (
              <Link
                key={post._id.toString()}
                href={`/blog/${post.slug}`}
                className="group block border-b border-border pb-6 hover:border-accent transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-secondary mb-2">{post.excerpt}</p>
                <span className="text-sm text-accent">Read more →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
