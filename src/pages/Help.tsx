import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Book, CreditCard, Church, User, Settings, Shield, MessageCircle, ArrowRight } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: CreditCard,
      title: "Getting Started",
      description: "Learn how to set up your account and connect your card",
      articles: 8,
    },
    {
      icon: Church,
      title: "Finding Your Church",
      description: "How to find, join, or add your church",
      articles: 5,
    },
    {
      icon: User,
      title: "Account & Profile",
      description: "Manage your account settings and personal info",
      articles: 12,
    },
    {
      icon: Settings,
      title: "Donations & Thresholds",
      description: "Understanding round-ups and donation settings",
      articles: 7,
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "How we protect your data and transactions",
      articles: 6,
    },
    {
      icon: Book,
      title: "For Churches",
      description: "Resources for church administrators",
      articles: 10,
    },
  ];

  const popularArticles = [
    "How do round-up donations work?",
    "How to connect my bank account",
    "Can I change my donation threshold?",
    "How to cancel or pause my account",
    "Is my financial information secure?",
    "How to download my donation history",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-4 inline-block">Help Center</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How Can We Help You?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                className="pl-12 pr-4 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            Browse by Category
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-display text-lg group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-muted-foreground">{category.articles} articles</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
              Popular Articles
            </h2>
            
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-card transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium">{article}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/faqs">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-blue mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-card mb-4">
              Still Need Help?
            </h2>
            <p className="text-card/70 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Contact Support
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/faqs">Browse FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Help;