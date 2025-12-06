import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, Heart, Users, Zap, Coffee, ArrowRight } from "lucide-react";
import breadLogo from "@/assets/bread-logo.png";

const Careers = () => {
  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage" },
    { icon: Coffee, title: "Remote First", description: "Work from anywhere in the US" },
    { icon: Zap, title: "Growth Budget", description: "$2,000 annual learning and development stipend" },
    { icon: Users, title: "Team Retreats", description: "Quarterly in-person gatherings" },
  ];

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description: "Build the future of charitable giving with React, Node.js, and PostgreSQL.",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote (US)",
      type: "Full-time",
      description: "Create beautiful, intuitive experiences for givers and churches.",
    },
    {
      title: "Church Partnership Manager",
      department: "Partnerships",
      location: "Remote (US)",
      type: "Full-time",
      description: "Build relationships with churches and help them grow their giving programs.",
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote (US)",
      type: "Full-time",
      description: "Ensure our users have an amazing experience with Daily Bread.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-4 inline-block">Careers</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Help Us Transform Generosity
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a mission-driven team building technology that empowers churches and 
              makes giving effortless for believers everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Why Join Daily Bread?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're building something meaningful, and we want you to be part of it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find your next role and help us make generosity effortless.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow cursor-pointer group">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                          {position.title}
                        </h3>
                        <Badge variant="secondary">{position.department}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* No Position CTA */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-blue mx-auto mb-6 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-card mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-card/70 mb-8">
              We're always looking for talented people who share our mission. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;