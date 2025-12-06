"use client";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Get In Touch<span className="text-accent">.</span>
      </h1>
      <p className="text-xl text-secondary mb-16">
        Have a project in mind? Let&apos;s work together.
      </p>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:border-accent transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:border-accent transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-background font-medium rounded hover:bg-accent hover:text-white transition-colors"
        >
          Send Message
        </button>
      </form>

      <div className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>
        <div className="space-y-4 text-secondary">
          <div>
            <strong className="text-foreground">Email:</strong>{" "}
            <a href="mailto:hello@example.com" className="text-accent hover:underline">
              hello@example.com
            </a>
          </div>
          <div>
            <strong className="text-foreground">GitHub:</strong>{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              github.com/yourusername
            </a>
          </div>
          <div>
            <strong className="text-foreground">LinkedIn:</strong>{" "}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              linkedin.com/in/yourprofile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
