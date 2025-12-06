import Link from "next/link";
import connectDB from "@/lib/mongodb";
import About from "@/models/About";

async function getAboutData(): Promise<any> {
  try {
    await connectDB();
    const about = await About.findOne().lean();
    return about;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          About Me<span className="text-accent">.</span>
        </h1>
        <p className="text-secondary">
          No about information yet. Configure it in the{" "}
          <Link href="/admin" className="text-accent hover:underline">
            admin panel
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {aboutData.name}
        <span className="text-accent">.</span>
      </h1>
      <p className="text-xl text-accent mb-8">{aboutData.title}</p>

      <div className="space-y-12">
        {/* Bio Section */}
        <section>
          <p className="text-lg text-secondary leading-relaxed whitespace-pre-wrap">
            {aboutData.bio}
          </p>
        </section>

        {/* Skills Section */}
        {aboutData.skills && aboutData.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Skills<span className="text-accent">_</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {aboutData.skills.map((skillCategory: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-3 text-accent">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-border rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {aboutData.experience && aboutData.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Experience<span className="text-accent">_</span>
            </h2>
            <div className="space-y-6">
              {aboutData.experience.map((job: any, index: number) => (
                <div key={index} className="border-l-2 border-accent pl-4">
                  <h3 className="text-lg font-semibold">{job.position}</h3>
                  <div className="text-accent mb-2">{job.company}</div>
                  <div className="text-sm text-secondary mb-2">
                    {job.duration}
                  </div>
                  <p className="text-secondary">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {aboutData.education && aboutData.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Education<span className="text-accent">_</span>
            </h2>
            <div className="space-y-4">
              {aboutData.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-2 border-accent pl-4">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <div className="text-accent mb-2">{edu.institution}</div>
                  <div className="text-sm text-secondary">{edu.duration}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {aboutData.contact && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Get in Touch<span className="text-accent">_</span>
            </h2>
            <div className="flex flex-wrap gap-4">
              {aboutData.contact.email && (
                <a
                  href={`mailto:${aboutData.contact.email}`}
                  className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
                >
                  Email
                </a>
              )}
              {aboutData.contact.github && (
                <a
                  href={aboutData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
                >
                  GitHub
                </a>
              )}
              {aboutData.contact.linkedin && (
                <a
                  href={aboutData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {aboutData.contact.twitter && (
                <a
                  href={aboutData.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-border rounded hover:border-accent transition-colors"
                >
                  Twitter
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
