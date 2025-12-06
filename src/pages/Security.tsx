import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Server, CheckCircle2, ArrowRight } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit Encryption",
      description: "All data is encrypted using bank-level AES-256 encryption, the same standard used by major financial institutions.",
    },
    {
      icon: Shield,
      title: "Plaid Integration",
      description: "We use Plaid, trusted by millions, to securely connect to your bank without ever storing your login credentials.",
    },
    {
      icon: Eye,
      title: "Read-Only Access",
      description: "We only have read access to your transaction data. We cannot move money, make purchases, or access your funds.",
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Our servers are hosted in SOC 2 compliant data centers with 24/7 monitoring and regular security audits.",
    },
  ];

  const certifications = [
    "SOC 2 Type II Compliant",
    "PCI DSS Certified",
    "GDPR Compliant",
    "SSL/TLS Encrypted",
    "Regular Penetration Testing",
    "24/7 Security Monitoring",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-blue mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="badge-blue mb-4 inline-block">Security</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Security is Our Priority
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take the security of your financial data seriously. Learn about the 
              measures we take to protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How We Protect You
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Multiple layers of security work together to keep your data safe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We maintain the highest standards of security and compliance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 p-4 rounded-lg bg-background border border-border">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Practices */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              Our Data Practices
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">What data we collect</h3>
                <p className="text-muted-foreground text-sm">
                  We collect only the transaction data necessary to calculate round-ups: merchant name, 
                  transaction amount, and date. We do not access or store your account balance, 
                  full account numbers, or login credentials.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">How we use your data</h3>
                <p className="text-muted-foreground text-sm">
                  Your transaction data is used solely to calculate round-ups and process donations 
                  to your selected church. We never sell your data to third parties or use it for 
                  advertising purposes.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold mb-2">Your control over your data</h3>
                <p className="text-muted-foreground text-sm">
                  You can request a full export or deletion of your data at any time. When you 
                  disconnect your account, we remove all associated transaction data from our systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-card mb-4">
              Questions About Security?
            </h2>
            <p className="text-card/70 mb-8">
              We're happy to answer any questions you have about how we protect your data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;