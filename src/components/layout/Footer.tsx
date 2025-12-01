import { Link } from "react-router-dom";
import { Wheat, Heart, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "How It Works", path: "/how-it-works" },
      { name: "For Churches", path: "/for-churches" },
      { name: "Pricing", path: "/pricing" },
      { name: "Get Started", path: "/get-started" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Blog", path: "/blog" },
      { name: "Careers", path: "/careers" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "FAQs", path: "/faqs" },
      { name: "Security", path: "/security" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
    legal: [
      { name: "Terms of Service", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Cookie Policy", path: "/cookies" },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <Wheat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Daily Bread</span>
            </Link>
            <p className="text-background/70 max-w-sm mb-6 leading-relaxed">
              Transforming spare change into meaningful impact. Join thousands of givers 
              supporting their churches through effortless round-up donations.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <Heart className="w-4 h-4 text-primary" />
              <span>Made with love for the church community</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@dailybread.app" className="hover:text-primary transition-colors">
                  hello@dailybread.app
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="w-4 h-4 mt-1" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © {currentYear} Daily Bread. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
