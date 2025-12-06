import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DevPortfolio</h3>
            <p className="text-secondary text-sm">
              Full-stack developer focused on building modern web applications.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-secondary text-sm">
              <Link href="/about" className="block hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/projects" className="block hover:text-accent transition-colors">
                Projects
              </Link>
              <Link href="/blog" className="block hover:text-accent transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="block hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-secondary text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-accent transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-secondary text-sm">
          <p>© {currentYear} DevPortfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
