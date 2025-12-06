"use client";

import { useState, useEffect } from "react";

interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    title: "",
    slug: "",
    description: "",
    technologies: [],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false,
    order: 0,
  });
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/projects/${currentProject.slug}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      const data = await res.json();

      if (data.success) {
        alert(isEditing ? "Project updated!" : "Project created!");
        fetchProjects();
        resetForm();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("Project deleted!");
        fetchProjects();
      }
    } catch (error) {
      alert("Error deleting project");
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setTechInput(project.technologies.join(", "));
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setCurrentProject({
      title: "",
      slug: "",
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      order: 0,
    });
    setTechInput("");
    setIsEditing(false);
  };

  const handleTechChange = (value: string) => {
    setTechInput(value);
    setCurrentProject({
      ...currentProject,
      technologies: value.split(",").map((tech) => tech.trim()).filter(Boolean),
    });
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit Project" : "Create New Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={currentProject.title}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={currentProject.slug}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, slug: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
                required
                disabled={isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={currentProject.description}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => handleTechChange(e.target.value)}
              placeholder="Next.js, TypeScript, MongoDB"
              className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={currentProject.githubUrl}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, githubUrl: e.target.value })
                }
                placeholder="https://github.com/user/repo"
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Live URL</label>
              <input
                type="url"
                value={currentProject.liveUrl}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, liveUrl: e.target.value })
                }
                placeholder="https://project-demo.com"
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={currentProject.imageUrl}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, imageUrl: e.target.value })
              }
              placeholder="https://images.example.com/project.jpg"
              className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={currentProject.featured}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, featured: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm">
                Featured Project
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input
                type="number"
                value={currentProject.order}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
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

      {/* Projects List */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">All Projects</h2>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-secondary">No projects yet. Create your first one!</p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id || project.slug}
                className="border border-border rounded p-4 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-secondary mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-border rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-secondary">
                      {project.featured && (
                        <span className="text-accent">★ Featured</span>
                      )}
                      <span>Order: {project.order}</span>
                      {project.githubUrl && <span>GitHub ✓</span>}
                      {project.liveUrl && <span>Live ✓</span>}
                      {project.imageUrl && <span>Image ✓</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.slug)}
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
