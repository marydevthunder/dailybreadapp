import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  QrCode,
  BarChart3,
  Shield,
  Gift,
  CheckCircle2,
  Zap,
  DollarSign,
  Calendar,
  Download,
  Star,
} from "lucide-react";
import churchInterior from "@/assets/church-interior.jpg";
import communityHands from "@/assets/community-hands.png";

const ForChurches = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Giving by 40%",
      description: "Churches see an average 40% increase in member contributions within the first year.",
    },
    {
      icon: Users,
      title: "Engage Younger Members",
      description: "Round-ups appeal to millennials and Gen Z who prefer automated, digital giving.",
    },
    {
      icon: Zap,
      title: "Zero Admin Work",
      description: "Funds are deposited directly to your account. No manual processing required.",
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Built on Stripe Connect for enterprise-grade payment security and compliance.",
    },
  ];

  const features = [
    {
      icon: QrCode,
      title: "Custom QR Code",
      description: "Get a unique QR code and link for your church. Members scan to join instantly.",
    },
    {
      icon: BarChart3,
      title: "Real-time Dashboard",
      description: "Track donations, see top givers, and monitor growth with beautiful analytics.",
    },
    {
      icon: Download,
      title: "Launch Kit",
      description: "Ready-to-use announcement scripts, graphics, and promotional materials.",
    },
    {
      icon: Gift,
      title: "Member Recognition",
      description: "Celebrate milestones and streaks to keep members engaged and motivated.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Register Your Church",
      description: "Fill out a quick form with your church details and contact information.",
    },
    {
      number: "2",
      title: "Connect Stripe",
      description: "Set up your Stripe account to receive direct deposits (takes 10 minutes).",
    },
    {
      number: "3",
      title: "Share Your Link",
      description: "Get your unique QR code and share it with your congregation.",
    },
    {
      number: "4",
      title: "Watch Giving Grow",
      description: "Track donations in real-time as members sign up and start giving.",
    },
  ];

  const testimonials = [
    {
      quote: "We added $22,000 in annual giving within 6 months. The best part? It required almost no effort from our team.",
      author: "Pastor James Wilson",
      church: "Hillside Community Church",
      members: "850 members",
    },
    {
      quote: "Our younger members love it. They tell me they don't even notice the round-ups, but their impact is huge.",
      author: "Rev. Maria Santos",
      church: "Grace Fellowship",
      members: "420 members",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={churchInterior}
            alt="Modern church interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/90 to-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">For Churches</span>
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-card mb-6 leading-tight">
              Grow Your Church's Giving{" "}
              <span className="text-gradient-gold">Effortlessly</span>
            </h1>

            <p className="text-lg text-card/80 mb-8">
              Join 850+ churches using Daily Bread to engage members and increase 
              contributions through automatic round-up donations.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="gold" size="xl" asChild>
                <Link to="/church-onboarding">
                  Register Your Church
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/church-admin">View Demo Dashboard</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-card/20">
              <div>
                <p className="font-display text-3xl font-bold text-primary">$1,847</p>
                <p className="text-card/60 text-sm">Avg. Monthly/Church</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">89%</p>
                <p className="text-card/60 text-sm">Member Retention</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">10 min</p>
                <p className="text-card/60 text-sm">Setup Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge-gold mb-4 inline-block">Why Daily Bread?</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Built for Modern Churches
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Daily Bread makes it easy for your congregation to give consistently, 
              without the friction of traditional donation methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-elevated p-6 text-center hover-lift">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold mx-auto mb-4 flex items-center justify-center shadow-md">
                  <benefit.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge-forest mb-4 inline-block">Powerful Features</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground mb-8">
                From your own QR code to detailed analytics, Daily Bread provides all 
                the tools your church needs to launch and grow a successful round-up 
                giving program.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full" />
              <img
                src={communityHands}
                alt="Community coming together"
                className="relative z-10 mx-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge-gold mb-4 inline-block">Getting Started</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Launch in 4 Simple Steps
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/church-onboarding">
                Start Registration
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge-forest mb-4 inline-block">Testimonials</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Church Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.church} • {testimonial.members}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-gold mb-4 inline-block">Simple Pricing</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              No Setup Fees. No Monthly Costs.
            </h2>
            <p className="text-muted-foreground mb-8">
              Daily Bread is free to set up. We only take a small 2.9% + $0.30 processing 
              fee per donation (industry standard). Your church receives the rest directly.
            </p>

            <div className="p-8 rounded-2xl bg-background border border-border">
              <div className="flex items-center justify-center gap-4 mb-6">
                <DollarSign className="w-12 h-12 text-primary" />
                <div className="text-left">
                  <p className="text-4xl font-display font-bold">2.9% + $0.30</p>
                  <p className="text-muted-foreground">per transaction</p>
                </div>
              </div>

              <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
                {[
                  "No setup or monthly fees",
                  "Direct deposit to your bank",
                  "Full dashboard access",
                  "Launch kit included",
                  "Unlimited members",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="gold" size="lg" asChild>
                <Link to="/church-onboarding">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-card mb-4">
              Ready to Transform Your Church's Giving?
            </h2>
            <p className="text-card/70 mb-8">
              Join 850+ churches already using Daily Bread to engage members and 
              grow contributions effortlessly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/church-onboarding">
                  Register Your Church
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForChurches;
