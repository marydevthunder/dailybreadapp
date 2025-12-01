import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  CreditCard,
  Church,
  Coins,
  Heart,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Bell,
  Calculator,
  CheckCircle2,
  Wheat,
} from "lucide-react";
import appMockup from "@/assets/app-mockup.png";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Smartphone,
      title: "Create Your Account",
      description: "Sign up in seconds with just your email. No credit check, no lengthy forms.",
      details: [
        "Quick email verification",
        "Secure password setup",
        "Optional social login",
      ],
    },
    {
      number: "02",
      icon: CreditCard,
      title: "Connect Your Card",
      description: "Securely link your debit or credit card through Plaid's bank-level encryption.",
      details: [
        "256-bit encryption",
        "Read-only access",
        "Major banks supported",
      ],
    },
    {
      number: "03",
      icon: Church,
      title: "Find Your Church",
      description: "Search for your church, scan their QR code, or add them to our directory.",
      details: [
        "850+ partner churches",
        "QR code quick-join",
        "Request new church",
      ],
    },
    {
      number: "04",
      icon: Coins,
      title: "Set Your Threshold",
      description: "Choose when to donate: $7, $10, or $25. We'll charge when you hit it.",
      details: [
        "Customize your amount",
        "Optional multipliers (2x, 3x)",
        "Pause anytime",
      ],
    },
    {
      number: "05",
      icon: Heart,
      title: "Give Automatically",
      description: "Every purchase rounds up. When you reach your threshold, we donate to your church.",
      details: [
        "100% goes to church",
        "Instant notifications",
        "Track your impact",
      ],
    },
  ];

  const faqItems = [
    {
      question: "How does the round-up work?",
      answer: "Every time you make a purchase with your connected card, we round up to the nearest dollar. Buy a $4.25 coffee? That's $0.75 in spare change. These round-ups accumulate until they reach your threshold, then we donate them to your church.",
    },
    {
      question: "Is my bank information secure?",
      answer: "Absolutely. We use Plaid, the same technology trusted by Venmo, Coinbase, and other major financial apps. We never see or store your bank credentials – Plaid handles all the security.",
    },
    {
      question: "How much of my donation goes to my church?",
      answer: "100% of your round-ups go directly to your church. Daily Bread operates on a small platform fee paid by churches, not donors.",
    },
    {
      question: "Can I pause or stop my giving?",
      answer: "Yes! You can pause round-ups at any time from your settings. Any accumulated spare change will remain in your account until you're ready to resume.",
    },
    {
      question: "What cards can I connect?",
      answer: "Most major debit and credit cards from US banks are supported through Plaid. This includes Visa, Mastercard, and American Express cards from banks like Chase, Bank of America, Wells Fargo, and hundreds more.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-gold mb-4 inline-block">How It Works</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Effortless Giving in <span className="text-gradient-gold">5 Simple Steps</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your everyday purchases into meaningful support for your church. 
              Set it up once, give forever.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent hidden sm:block" />
                )}

                <div className="flex gap-6 mb-16">
                  {/* Step Number */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="card-elevated p-6 sm:p-8 hover-lift">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="sm:hidden w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-primary">Step {step.number}</span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold">{step.title}</h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6">{step.description}</p>

                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Calculation */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-forest mb-4 inline-block">See It In Action</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Your Spare Change Adds Up
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Morning Coffee</span>
                    <div className="text-right">
                      <span className="text-foreground">$4.25</span>
                      <span className="text-accent font-medium ml-2">+$0.75</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lunch</span>
                    <div className="text-right">
                      <span className="text-foreground">$12.37</span>
                      <span className="text-accent font-medium ml-2">+$0.63</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Gas Station</span>
                    <div className="text-right">
                      <span className="text-foreground">$38.92</span>
                      <span className="text-accent font-medium ml-2">+$0.08</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Grocery Store</span>
                    <div className="text-right">
                      <span className="text-foreground">$67.43</span>
                      <span className="text-accent font-medium ml-2">+$0.57</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Daily Total</span>
                    <span className="font-display text-xl font-bold text-primary">$2.03</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <Calculator className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">At just $2/day, that's</p>
                  <p className="font-display text-4xl font-bold text-foreground mb-2">$60/month</p>
                  <p className="font-display text-5xl font-bold text-accent mb-4">$720/year</p>
                  <p className="text-sm text-muted-foreground">
                    to your church, without changing your lifestyle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge-gold mb-4 inline-block">Security First</span>
                <h2 className="font-display text-3xl font-bold mb-6">
                  Your Data is Safe With Us
                </h2>
                <p className="text-muted-foreground mb-8">
                  We partner with Plaid, the same security provider trusted by Venmo, 
                  Robinhood, and thousands of financial apps. Your bank credentials 
                  are never stored on our servers.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "256-bit bank-level encryption" },
                    { icon: RefreshCw, text: "Read-only access to transactions" },
                    { icon: Bell, text: "Instant notifications for all activity" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-gold opacity-10 blur-3xl rounded-full" />
                <div className="relative bg-card rounded-2xl p-8 border border-border shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Protected by Plaid</p>
                      <p className="text-sm text-muted-foreground">Enterprise security</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-muted rounded-full w-full" />
                    <div className="h-3 bg-muted rounded-full w-3/4" />
                    <div className="h-3 bg-muted rounded-full w-1/2" />
                  </div>
                  <div className="mt-6 p-3 bg-accent/10 rounded-lg text-center">
                    <p className="text-sm text-accent font-medium">Connection Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-forest mb-4 inline-block">FAQ</span>
              <h2 className="font-display text-3xl font-bold">Common Questions</h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="card-elevated p-6">
                  <h3 className="font-display text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold mx-auto mb-6 flex items-center justify-center">
              <Wheat className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold text-card mb-4">
              Ready to Start?
            </h2>
            <p className="text-card/70 mb-8">
              Join thousands of generous givers making an impact with their spare change.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/get-started">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
