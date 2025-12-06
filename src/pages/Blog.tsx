import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "How Micro-Giving is Transforming Church Donations in 2024",
    excerpt: "Discover how churches across America are seeing a 40% increase in donations through round-up giving programs.",
    category: "Trends",
    author: "Sarah Johnson",
    date: "Dec 1, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  };

  const posts = [
    {
      title: "5 Ways to Encourage Generosity in Your Congregation",
      excerpt: "Practical tips for church leaders looking to foster a culture of giving.",
      category: "Church Leadership",
      author: "Pastor David Kim",
      date: "Nov 28, 2024",
      readTime: "4 min read",
    },
    {
      title: "The Psychology of Round-Up Donations",
      excerpt: "Why small, automatic donations feel more sustainable than large one-time gifts.",
      category: "Research",
      author: "Dr. Emily Chen",
      date: "Nov 22, 2024",
      readTime: "6 min read",
    },
    {
      title: "Setting Up Your Church for Digital Giving Success",
      excerpt: "A step-by-step guide to modernizing your church's donation system.",
      category: "How-To",
      author: "Michael Rodriguez",
      date: "Nov 15, 2024",
      readTime: "8 min read",
    },
    {
      title: "Member Spotlight: Grace Community Church",
      excerpt: "How one church increased member engagement by 60% with Daily Bread.",
      category: "Success Stories",
      author: "Daily Bread Team",
      date: "Nov 10, 2024",
      readTime: "3 min read",
    },
    {
      title: "Understanding Millennial and Gen Z Giving Patterns",
      excerpt: "What younger generations expect from charitable giving platforms.",
      category: "Research",
      author: "Amanda Williams",
      date: "Nov 5, 2024",
      readTime: "5 min read",
    },
    {
      title: "Tax Benefits of Charitable Round-Up Donations",
      excerpt: "Everything you need to know about deducting your micro-donations.",
      category: "Finance",
      author: "James Thompson, CPA",
      date: "Oct 30, 2024",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-4 inline-block">Blog</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Insights on Generosity & Giving
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, stories, and research to help you and your church community 
              grow in the practice of generosity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-muted">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">{featuredPost.category}</Badge>
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-3">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Button variant="gold" className="w-fit">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow cursor-pointer group">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-card mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-card/70 mb-8">
              Get the latest articles and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-card/10 border border-card/20 text-card placeholder:text-card/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="gold">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;