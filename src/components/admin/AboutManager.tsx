"use client";

import { useState, useEffect } from "react";

interface Skill {
  category: string;
  items: string[];
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
}

interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

interface AboutData {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  contact: Contact;
}

export default function AboutManager() {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: "",
    title: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
    contact: {
      email: "",
      github: "",
      linkedin: "",
      twitter: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data && data._id) {
        setAboutData(data);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutData),
      });

      if (res.ok) {
        setMessage("About information saved successfully!");
        fetchAboutData();
      } else {
        setMessage("Failed to save information");
      }
    } catch (error) {
      setMessage("Error saving information");
      console.error(error);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const addSkillCategory = () => {
    setAboutData({
      ...aboutData,
      skills: [...aboutData.skills, { category: "", items: [] }],
    });
  };

  const updateSkillCategory = (index: number, field: string, value: string) => {
    const newSkills = [...aboutData.skills];
    if (field === "category") {
      newSkills[index].category = value;
    } else {
      newSkills[index].items = value.split(",").map((s) => s.trim());
    }
    setAboutData({ ...aboutData, skills: newSkills });
  };

  const removeSkillCategory = (index: number) => {
    setAboutData({
      ...aboutData,
      skills: aboutData.skills.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    setAboutData({
      ...aboutData,
      experience: [
        ...aboutData.experience,
        { company: "", position: "", duration: "", description: "" },
      ],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...aboutData.experience];
    newExperience[index][field] = value;
    setAboutData({ ...aboutData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    setAboutData({
      ...aboutData,
      experience: aboutData.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    setAboutData({
      ...aboutData,
      education: [
        ...aboutData.education,
        { institution: "", degree: "", duration: "" },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...aboutData.education];
    newEducation[index][field] = value;
    setAboutData({ ...aboutData, education: newEducation });
  };

  const removeEducation = (index: number) => {
    setAboutData({
      ...aboutData,
      education: aboutData.education.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className="bg-accent/10 border border-accent text-accent px-4 py-2 rounded">
          {message}
        </div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              value={aboutData.name}
              onChange={(e) =>
                setAboutData({ ...aboutData, name: e.target.value })
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Your Full Name"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              value={aboutData.title}
              onChange={(e) =>
                setAboutData({ ...aboutData, title: e.target.value })
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Full-Stack Developer"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Bio</label>
          <textarea
            value={aboutData.bio}
            onChange={(e) =>
              setAboutData({ ...aboutData, bio: e.target.value })
            }
            rows={6}
            className="w-full bg-background border border-border rounded px-3 py-2"
            placeholder="Tell your story..."
          />
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Skills</h3>
          <button
            onClick={addSkillCategory}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80"
          >
            Add Category
          </button>
        </div>
        {aboutData.skills.map((skill, index) => (
          <div key={index} className="border border-border rounded p-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={skill.category}
                onChange={(e) =>
                  updateSkillCategory(index, "category", e.target.value)
                }
                className="flex-1 bg-background border border-border rounded px-3 py-2"
                placeholder="Category (e.g., Frontend)"
              />
              <button
                onClick={() => removeSkillCategory(index)}
                className="px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={skill.items.join(", ")}
              onChange={(e) =>
                updateSkillCategory(index, "items", e.target.value)
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Skills (comma-separated: React, Next.js, TypeScript)"
            />
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Experience</h3>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80"
          >
            Add Experience
          </button>
        </div>
        {aboutData.experience.map((exp, index) => (
          <div key={index} className="border border-border rounded p-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="flex-1 bg-background border border-border rounded px-3 py-2"
                placeholder="Company Name"
              />
              <button
                onClick={() => removeExperience(index)}
                className="px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={exp.position}
              onChange={(e) =>
                updateExperience(index, "position", e.target.value)
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Position"
            />
            <input
              type="text"
              value={exp.duration}
              onChange={(e) =>
                updateExperience(index, "duration", e.target.value)
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Duration (e.g., 2020 - 2023)"
            />
            <textarea
              value={exp.description}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              rows={3}
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Job description and achievements..."
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Education</h3>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80"
          >
            Add Education
          </button>
        </div>
        {aboutData.education.map((edu, index) => (
          <div key={index} className="border border-border rounded p-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                className="flex-1 bg-background border border-border rounded px-3 py-2"
                placeholder="Institution Name"
              />
              <button
                onClick={() => removeEducation(index)}
                className="px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(index, "degree", e.target.value)}
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Degree/Certificate"
            />
            <input
              type="text"
              value={edu.duration}
              onChange={(e) =>
                updateEducation(index, "duration", e.target.value)
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="Duration (e.g., 2016 - 2020)"
            />
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={aboutData.contact.email}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  contact: { ...aboutData.contact, email: e.target.value },
                })
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">GitHub URL</label>
            <input
              type="url"
              value={aboutData.contact.github}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  contact: { ...aboutData.contact, github: e.target.value },
                })
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={aboutData.contact.linkedin}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  contact: { ...aboutData.contact, linkedin: e.target.value },
                })
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Twitter URL</label>
            <input
              type="url"
              value={aboutData.contact.twitter}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  contact: { ...aboutData.contact, twitter: e.target.value },
                })
              }
              className="w-full bg-background border border-border rounded px-3 py-2"
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-accent text-white rounded hover:bg-accent/80 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
