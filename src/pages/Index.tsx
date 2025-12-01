import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  Smartphone,
  CreditCard,
  Church,
  TrendingUp,
  Shield,
  Heart,
  Users,
  CheckCircle2,
  Wheat,
  Coins,
  Building2,
  BarChart3,
  Zap,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import communityHands from "@/assets/community-hands.png";
import appMockup from "@/assets/app-mockup.png";
import churchInterior from "@/assets/church-interior.jpg";

const Index = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Connect Your Card",
      description: "Securely link your debit or credit card through our bank-level encrypted connection.",
    },
    {
      icon: Church,
      title: "Choose Your Church",
      description: "Find your church by name, scan a QR code, or add it to our directory.",
    },
    {
      icon: Coins,
      title: "Set Your Threshold",
      description: "Pick when to donate – when your spare change hits $7, $10, or $25.",
    },
    {
      icon: Heart,
      title: "Give Automatically",
      description: "Every purchase rounds up. When you hit your threshold, we donate to your church.",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption and secure Plaid integration keep your financial data protected.",
    },
    {
      icon: TrendingUp,
      title: "Track Your Impact",
      description: "Watch your giving grow with detailed dashboards and milestone celebrations.",
    },
    {
      icon: Zap,
      title: "Effortless Giving",
      description: "Set it once and forget it. Your spare change does the work.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "See how your church community is coming together to make a difference.",
    },
  ];

  const stats = [
    { value: "$2.4M+", label: "Total Donated" },
    { value: "12,500+", label: "Active Givers" },
    { value: "850+", label: "Partner Churches" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const testimonials = [
    {
      quote: "Daily Bread made tithing feel natural. I don't even notice it, but the impact is real.",
      author: "Sarah M.",
      role: "Member, Grace Community Church",
      avatar: "SM",
    },
    {
      quote: "Our congregation's engagement with giving increased by 40% in the first three months.",
      author: "Pastor David K.",
      role: "Lead Pastor, New Hope Fellowship",
      avatar: "DK",
    },
    {
      quote: "The round-ups add up quickly. I've given more this year without feeling the pinch.",
      author: "Michael T.",
      role: "Member, Shoreline Church",
      avatar: "MT",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hands holding wheat in golden light"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/70 to-foreground/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-card/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Wheat className="w-4 h-4 text-primary" />
              <span className="text-sm text-card font-medium">Generosity made simple</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-card mb-6 leading-tight animate-slide-up">
              Turn Your Spare Change Into{" "}
              <span className="text-gradient-gold">Kingdom Impact</span>
            </h1>

            <p className="text-lg sm:text-xl text-card/80 max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
              Daily Bread automatically rounds up your purchases and donates the spare change 
              to your church. Effortless giving that adds up to real impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
              <Button variant="hero-primary" size="xl" asChild>
                <Link to="/get-started">
                  Start Giving Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-12 border-t border-card/10 animate-fade-in stagger-3">
              <div className="flex items-center gap-2 text-card/70">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2 text-card/70">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 text-card/70">
                <Heart className="w-5 h-5 text-terracotta" />
                <span className="text-sm">100% to Your Church</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-card/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-card/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-foreground to-foreground/95">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-card/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge-gold mb-4 inline-block">How It Works</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Start Giving in Minutes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your everyday purchases into meaningful support for your church.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                )}
                
                <div className="card-elevated p-6 text-center hover-lift relative z-10 bg-card">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-gold mx-auto mb-4 flex items-center justify-center shadow-glow">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="inline-block w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm leading-8 mb-3">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="gold" size="lg" asChild>
              <Link to="/get-started">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-24 bg-gradient-warm overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge-forest mb-4 inline-block">Your Dashboard</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Watch Your Impact Grow
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Track every round-up, celebrate milestones, and see exactly how your spare 
                change is making a difference in your church community.
              </p>

              <ul className="space-y-4">
                {[
                  "Real-time donation tracking",
                  "Monthly and yearly giving summaries",
                  "Achievement badges and streaks",
                  "Church community leaderboards",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline-gold" size="lg" className="mt-8" asChild>
                <Link to="/dashboard">
                  View Demo Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
              <img
                src={appMockup}
                alt="Daily Bread App Interface"
                className="relative z-10 mx-auto max-w-sm animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge-gold mb-4 inline-block">Features</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Give Generously
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-2xl bg-background hover:shadow-card transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Churches CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={churchInterior}
            alt="Modern church interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 to-foreground/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">For Churches</span>
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-card mb-6">
              Grow Your Church's Giving with Zero Effort
            </h2>
            <p className="text-card/80 text-lg mb-8">
              Join hundreds of churches who've increased their giving by engaging members 
              through effortless round-up donations. Get started in minutes with our 
              complete onboarding kit.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/for-churches">
                  Register Your Church
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/church-admin">
                  Church Admin Demo
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-card/20">
              <div>
                <p className="font-display text-2xl font-bold text-primary">$1,847</p>
                <p className="text-card/60 text-sm">Avg. Monthly/Church</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">89%</p>
                <p className="text-card/60 text-sm">Member Retention</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">2.3x</p>
                <p className="text-card/60 text-sm">Giving Increase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge-forest mb-4 inline-block">Testimonials</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Loved by Givers & Churches Alike
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated p-6 hover-lift">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
              <img
                src={communityHands}
                alt="Community hands coming together"
                className="relative z-10 mx-auto max-w-md"
              />
            </div>

            <div>
              <span className="badge-forest mb-4 inline-block">Community</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Be Part of Something Bigger
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                When you give through Daily Bread, you join a community of generous givers 
                transforming small change into significant impact. Together, we're building 
                something beautiful.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <p className="font-display text-2xl font-bold">12,500+</p>
                  <p className="text-muted-foreground text-sm">Active Members</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <BarChart3 className="w-8 h-8 text-accent mb-2" />
                  <p className="font-display text-2xl font-bold">$2.4M+</p>
                  <p className="text-muted-foreground text-sm">Given This Year</p>
                </div>
              </div>

              <Button variant="gold" size="lg" asChild>
                <Link to="/get-started">
                  Join the Movement
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
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold mx-auto mb-8 flex items-center justify-center">
              <Wheat className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-card mb-6">
              Ready to Transform Your Giving?
            </h2>
            <p className="text-card/70 text-lg mb-10 max-w-xl mx-auto">
              Start with just your spare change. No minimum commitment. Cancel anytime. 
              100% of your donations go directly to your church.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/get-started">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
