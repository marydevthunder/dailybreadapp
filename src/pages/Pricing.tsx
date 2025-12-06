import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  Users,
  Building2,
  Crown,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const Pricing = () => {
  const memberFeatures = [
    "Unlimited round-up donations",
    "Connect multiple cards",
    "Real-time activity tracking",
    "Achievement badges & streaks",
    "Monthly giving summaries",
    "Email notifications",
    "24/7 customer support",
  ];

  const churchFeatures = [
    "Custom QR code & link",
    "Real-time analytics dashboard",
    "Member activity tracking",
    "Downloadable launch kit",
    "Direct bank deposits",
    "Stripe Connect integration",
    "Dedicated onboarding support",
    "No member limits",
  ];

  const faqs = [
    {
      question: "Is there really no cost for members?",
      answer: "Yes! Daily Bread is completely free for church members. We don't charge any fees to donors – 100% of your round-ups go directly to your chosen church.",
    },
    {
      question: "What are the fees for churches?",
      answer: "Churches pay standard payment processing fees of 2.9% + $0.30 per transaction. This is the same rate charged by Stripe, PayPal, and other major payment processors. There are no setup fees, monthly fees, or hidden costs.",
    },
    {
      question: "How do churches receive their funds?",
      answer: "Funds are deposited directly into your church's bank account through Stripe Connect. Payouts typically arrive within 2-3 business days.",
    },
    {
      question: "Can members pause or cancel anytime?",
      answer: "Absolutely. Members can pause their round-ups at any time with a single tap. Any accumulated spare change will remain in their account until they resume. Canceling is just as easy.",
    },
    {
      question: "Is there a minimum donation amount?",
      answer: "Members choose their threshold – the amount at which round-ups are donated. Options include $7, $10, or $25. There's no minimum below the threshold; spare change accumulates until it's reached.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "Members can connect most major debit and credit cards from US banks through Plaid. This includes Visa, Mastercard, and American Express cards from banks like Chase, Bank of America, Wells Fargo, and hundreds more.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-4 inline-block">Pricing</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent <span className="text-gradient-blue">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Free for members. Affordable for churches. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Member Card */}
            <Card className="relative overflow-hidden border-2 border-border hover:border-primary/50 transition-colors">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-blue" />
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">For Members</CardTitle>
                <p className="text-muted-foreground">Church donors & givers</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-8">
                  <span className="font-display text-5xl font-bold">Free</span>
                  <p className="text-muted-foreground mt-2">Forever. No catches.</p>
                </div>

                <ul className="space-y-3 text-left mb-8">
                  {memberFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="gold" size="lg" className="w-full" asChild>
                  <Link to="/get-started">
                    Start Giving
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Church Card */}
            <Card className="relative overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-forest" />
              <div className="absolute top-4 right-4">
                <span className="badge-forest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </span>
              </div>
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="font-display text-2xl">For Churches</CardTitle>
                <p className="text-muted-foreground">Organizations & ministries</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-8">
                  <span className="font-display text-5xl font-bold">2.9%</span>
                  <span className="text-muted-foreground text-lg"> + $0.30</span>
                  <p className="text-muted-foreground mt-2">per transaction</p>
                </div>

                <ul className="space-y-3 text-left mb-8">
                  {churchFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="forest" size="lg" className="w-full" asChild>
                  <Link to="/church-onboarding">
                    Register Church
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-forest mb-4 inline-block">Compare</span>
            <h2 className="font-display text-3xl font-bold mb-4">
              Industry-Standard Processing
            </h2>
            <p className="text-muted-foreground mb-12">
              Our fees match what you'd pay with any major payment processor.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Provider</th>
                    <th className="text-center py-4 px-4 font-semibold">Transaction Fee</th>
                    <th className="text-center py-4 px-4 font-semibold">Monthly Fee</th>
                    <th className="text-center py-4 px-4 font-semibold">Setup Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="py-4 px-4 font-semibold text-primary">Daily Bread</td>
                    <td className="text-center py-4 px-4">2.9% + $0.30</td>
                    <td className="text-center py-4 px-4">$0</td>
                    <td className="text-center py-4 px-4">$0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4">Stripe</td>
                    <td className="text-center py-4 px-4">2.9% + $0.30</td>
                    <td className="text-center py-4 px-4">$0</td>
                    <td className="text-center py-4 px-4">$0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4">PayPal</td>
                    <td className="text-center py-4 px-4">2.89% + $0.49</td>
                    <td className="text-center py-4 px-4">$0</td>
                    <td className="text-center py-4 px-4">$0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4">Tithe.ly</td>
                    <td className="text-center py-4 px-4">2.9% + $0.30</td>
                    <td className="text-center py-4 px-4">$0-$149</td>
                    <td className="text-center py-4 px-4">$0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-blue mb-4 inline-block">FAQ</span>
              <h2 className="font-display text-3xl font-bold">Pricing Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card-elevated p-6">
                  <div className="flex gap-4">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Crown className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-card mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-card/70 mb-8">
              Whether you're a church looking to grow giving or a member ready 
              to start, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/get-started">
                  Start Giving Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/church-onboarding">Register a Church</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
