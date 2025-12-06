import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Projects<span className="text-accent">.</span>
      </h1>
      <p className="text-xl text-secondary mb-16">
        A collection of work I&apos;ve done over the years
      </p>

      {projects.length === 0 ? (
        <p className="text-secondary">
          No projects yet. Add your first project in the{" "}
          <Link href="/admin" className="text-accent hover:underline">
            admin panel
          </Link>
          .
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <div
              key={project._id.toString()}
              className="border border-border rounded-lg p-6 hover:border-accent transition-all group"
            >
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h2>
            <p className="text-secondary mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-border rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  View Code →
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
