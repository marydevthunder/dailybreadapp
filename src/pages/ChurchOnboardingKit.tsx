import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  QrCode,
  Download,
  Copy,
  FileText,
  Image,
  MessageSquare,
  Mail,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Presentation,
  Church,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ChurchOnboardingKit = () => {
  const { toast } = useToast();

  const churchLink = "dailybread.app/join/shoreline-church";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${churchLink}`);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  const resources = [
    {
      icon: QrCode,
      title: "QR Code Pack",
      description: "PNG and SVG versions in multiple sizes",
      action: "Download",
    },
    {
      icon: Presentation,
      title: "Announcement Slides",
      description: "Ready-to-use PowerPoint and Google Slides",
      action: "Download",
    },
    {
      icon: Image,
      title: "Social Graphics",
      description: "Instagram, Facebook, and Twitter images",
      action: "Download",
    },
    {
      icon: Mail,
      title: "Email Templates",
      description: "Copy-paste emails for your newsletter",
      action: "View",
    },
  ];

  const announcementScript = `Good morning, church family!

We're excited to share a new way to support our ministry. It's called Daily Bread, and it makes giving as easy as buying your morning coffee.

Here's how it works: You connect your debit card, and every time you make a purchase, Daily Bread rounds up to the nearest dollar. Those spare coins add up, and when they reach your chosen amount – say, $7 or $10 – they're automatically donated to our church.

It's effortless generosity. You won't even notice it, but together, our spare change can make a real difference.

Scan the QR code in your bulletin or visit [YOUR LINK] to get started. It takes less than 2 minutes, and it's completely free for you – 100% of your round-ups come directly to us.

Thank you for being part of this community. Your generosity, in all its forms, helps us continue our mission.`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="badge-forest mb-4 inline-block">Launch Kit</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your Church Launch Kit
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to introduce Daily Bread to your congregation and start receiving round-up donations.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Left Column - QR & Link */}
            <div className="lg:col-span-1 space-y-6">
              {/* QR Code Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Your QR Code</CardTitle>
                  <CardDescription>Members scan to join instantly</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="p-8 rounded-xl bg-card border border-border mb-4">
                    <QrCode className="w-40 h-40 mx-auto text-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="soft" size="sm" className="flex-1">
                      <Download className="w-4 h-4" />
                      PNG
                    </Button>
                    <Button variant="soft" size="sm" className="flex-1">
                      <Download className="w-4 h-4" />
                      SVG
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Link Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Your Unique Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-muted flex items-center gap-2 mb-3">
                    <code className="text-sm text-primary flex-1 truncate">{churchLink}</code>
                    <Button variant="ghost" size="icon-sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add this to your website, emails, and social media.
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Church className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Shoreline Church</p>
                      <p className="text-sm text-muted-foreground">Active since Nov 2024</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-accent">127</p>
                      <p className="text-xs text-muted-foreground">Members</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">$47.8K</p>
                      <p className="text-xs text-muted-foreground">Total Given</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Resources */}
            <div className="lg:col-span-2 space-y-6">
              {/* Downloadable Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Downloadable Resources</CardTitle>
                  <CardDescription>Print-ready materials for your launch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {resources.map((resource, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <resource.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold mb-1">{resource.title}</p>
                            <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                            <Button variant="ghost" size="sm" className="h-7 px-2 -ml-2">
                              {resource.action}
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Announcement Script */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Sunday Announcement Script
                  </CardTitle>
                  <CardDescription>Ready-to-read script for your pastor or announcements leader</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border mb-4">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-body">
                      {announcementScript}
                    </pre>
                  </div>
                  <Button variant="soft" onClick={() => {
                    navigator.clipboard.writeText(announcementScript);
                    toast({
                      title: "Script copied!",
                      description: "The announcement script has been copied to your clipboard.",
                    });
                  }}>
                    <Copy className="w-4 h-4" />
                    Copy Script
                  </Button>
                </CardContent>
              </Card>

              {/* Tips for Success */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Tips for a Successful Launch</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Make it visible",
                        description: "Display the QR code on screens during service and in printed bulletins.",
                      },
                      {
                        title: "Lead by example",
                        description: "Have your leadership team sign up first and share their experience.",
                      },
                      {
                        title: "Follow up via email",
                        description: "Send a reminder email with the link to those who might have missed the announcement.",
                      },
                      {
                        title: "Share success stories",
                        description: "Periodically share how much the community has given through Daily Bread.",
                      },
                      {
                        title: "Add to your website",
                        description: "Include the QR code and link on your church's giving page.",
                      },
                    ].map((tip, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">{tip.title}</p>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button variant="gold" asChild>
                  <Link to="/church-admin">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/fundraising-resources">
                    More Resources
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChurchOnboardingKit;
