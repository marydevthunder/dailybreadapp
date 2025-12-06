import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import breadLogo from "@/assets/bread-logo.png";
import communityHands from "@/assets/community-hands.png";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Generosity First",
      description: "We believe giving should be joyful and effortless, not a burden.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Every feature is designed to strengthen church communities.",
    },
    {
      icon: Target,
      title: "Mission Driven",
      description: "100% of donations go directly to churches. No hidden fees.",
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Co-Founder", initials: "SJ" },
    { name: "Michael Chen", role: "CTO & Co-Founder", initials: "MC" },
    { name: "Emily Rodriguez", role: "Head of Partnerships", initials: "ER" },
    { name: "David Kim", role: "Lead Engineer", initials: "DK" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-4 inline-block">About Us</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Making Generosity Effortless for Every Believer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Daily Bread was born from a simple idea: what if giving to your church was as 
              natural as your morning coffee? We're on a mission to make that a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  It started in 2021 when our founders noticed a gap between people's desire 
                  to give and their actual giving habits. Many wanted to support their churches 
                  more but found traditional tithing methods inconvenient or easy to forget.
                </p>
                <p>
                  We built Daily Bread to bridge that gap. By rounding up everyday purchases 
                  and automatically donating the spare change, we've made giving as effortless 
                  as buying a cup of coffee.
                </p>
                <p>
                  Today, we partner with over 850 churches across the country, helping thousands 
                  of members give more than $2.4 million to their communities—one round-up at a time.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <img
                src={communityHands}
                alt="Community coming together"
                className="relative z-10 mx-auto max-w-sm lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything we build is guided by these core principles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-2xl bg-background border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Passionate people dedicated to transforming church giving.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-blue mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-primary-foreground">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-semibold text-sm sm:text-base">{member.name}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-blue mx-auto mb-6 flex items-center justify-center">
              <img src={breadLogo} alt="" className="w-10 h-10 object-contain" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-card mb-4">
              Join Our Mission
            </h2>
            <p className="text-card/70 mb-8">
              Whether you're a giver or a church, we'd love to have you be part of our journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/get-started">
                  Start Giving
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/for-churches">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;