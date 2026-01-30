import { Github, Twitter, Linkedin, Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const footerSections = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "Events", href: "#events" },
    { label: "About Us", href: "#about" },
    { label: "Mentors", href: "#judges" },
  ],
  resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Guidelines", href: "#guidelines" },
    { label: "Code of Conduct", href: "#conduct" },
    { label: "Past Events", href: "#past-events" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
    { label: "Refund Policy", href: "#refund" },
    { label: "Contact Us", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

const contactInfo = [
  { icon: Mail, text: "events@college.edu", href: "mailto:events@college.edu" },
  { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, text: "College Campus, City - 123456", href: "#" },
];

const FooterSection = () => {
  return (
    <footer className="relative py-20 px-4 overflow-hidden bg-zinc-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent">
        <div className="absolute inset-0 blur-sm bg-crimson/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="font-['Kraken'] text-3xl sm:text-4xl text-foreground tracking-widest mb-4">
              STRANGE <span className="text-crimson text-glow-red">EVENTS</span>
            </h3>
            <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Your ultimate destination for discovering, participating, and excelling in campus events. 
              Join hackathons, workshops, competitions, and networking opportunities.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-crimson transition-colors group"
                >
                  <contact.icon size={16} className="text-crimson group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-sm">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['empire'] text-lg text-foreground tracking-wider mb-6">
              QUICK LINKS
            </h4>
            <nav className="space-y-3">
              {footerSections.quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-sans text-sm text-gray-400 hover:text-crimson transition-colors hover:translate-x-1 transform duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-['empire'] text-lg text-foreground tracking-wider mb-6">
              RESOURCES
            </h4>
            <nav className="space-y-3">
              {footerSections.resources.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-sans text-sm text-gray-400 hover:text-crimson transition-colors hover:translate-x-1 transform duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-['empire'] text-lg text-foreground tracking-wider mb-6">
              LEGAL
            </h4>
            <nav className="space-y-3">
              {footerSections.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-sans text-sm text-gray-400 hover:text-crimson transition-colors hover:translate-x-1 transform duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-crimson/50 hover:bg-crimson/10 transition-all duration-300"
              >
                <social.icon 
                  size={18} 
                  className="text-gray-400 group-hover:text-crimson transition-colors group-hover:scale-110 transform duration-300"
                />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-sans text-xs text-gray-400">
              © {new Date().getFullYear()} Strange Events. All rights reserved.
            </p>
            <p className="font-sans text-xs text-gray-500 mt-1">
              Made with <span className="text-crimson">❤</span> by the Events Team
            </p>
          </div>
        </div>

        {/* Newsletter Section (Optional) */}
        <div className="mt-12 p-8 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="font-['empire'] text-2xl text-foreground tracking-wider mb-3">
              STAY <span className="text-crimson">UPDATED</span>
            </h4>
            <p className="font-sans text-sm text-gray-400 mb-6">
              Subscribe to our newsletter for the latest events, opportunities, and campus news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-crimson/50 transition-colors font-sans text-sm"
              />
              <button className="px-6 py-3 bg-crimson hover:bg-red-700 text-white font-['empire'] text-sm tracking-wider rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-crimson/30 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient Glows */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .text-glow-red {
          text-shadow: 
            0 0 10px hsl(0 100% 50% / 1),
            0 0 20px hsl(0 100% 50% / 0.8),
            0 0 40px hsl(0 100% 50% / 0.6);
        }
      `}</style>
    </footer>
  );
};

export default FooterSection;
