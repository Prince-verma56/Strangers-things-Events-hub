import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { label: "FAQ", href: "#" },
  { label: "RULES", href: "#" },
  { label: "CODE OF CONDUCT", href: "#" },
  { label: "PRIVACY", href: "#" },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

const FooterSection = () => {
  return (
    <footer className="relative py-20 px-4 overflow-hidden">
      {/* Void background */}
      <div className="absolute inset-0 bg-void" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-12">
          <h3 className="font-stranger text-3xl sm:text-4xl text-foreground tracking-widest flicker">
            UPSIDE DOWN
          </h3>
          <p className="font-horror text-sm text-muted-foreground mt-2">
            CAMPUS EVENTS
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-12">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="font-stranger text-sm tracking-wider text-muted-foreground hover:text-crimson underline-draw transition-colors hoverable"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="group p-3 border border-border/30 hover:border-crimson/50 transition-colors hoverable"
            >
              <social.icon 
                size={20} 
                className="text-muted-foreground group-hover:text-crimson transition-colors"
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-sans text-xs text-muted-foreground/50">
            © 2025 Campus Events. All rights reserved.
          </p>
          <p className="font-horror text-xs text-muted-foreground/30 mt-2">
            Built with darkness and code.
          </p>
        </div>
      </div>

      {/* Floating particles effect - subtle */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-crimson/30 rounded-full float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default FooterSection;