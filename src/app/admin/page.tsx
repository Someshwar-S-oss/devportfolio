"use client";

import { useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";
import BlogManager from "@/components/admin/BlogManager";
import ProjectManager from "@/components/admin/ProjectManager";
import AboutManager from "@/components/admin/AboutManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"blog" | "projects" | "about">("blog");

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            Admin Dashboard<span className="text-accent">.</span>
          </h1>
          <Link
            href="/"
            className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
          >
            ← Back to Site
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "blog"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-foreground"
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "projects"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-foreground"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "about"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-foreground"
            }`}
          >
            About Page
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "blog" && <BlogManager />}
          {activeTab === "projects" && <ProjectManager />}
          {activeTab === "about" && <AboutManager />}
        </div>
        </div>
      </div>
    </AdminGuard>
  );
}
