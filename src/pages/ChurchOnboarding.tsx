import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  User,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  QrCode,
  Sparkles,
} from "lucide-react";

const ChurchOnboarding = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: "Church Info" },
    { number: 2, title: "Contact Details" },
    { number: 3, title: "Connect Stripe" },
    { number: 4, title: "Get Your Kit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="badge-forest mb-4 inline-block">Church Registration</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Register Your Church
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Set up your church in just a few minutes and start receiving round-up donations from your congregation.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                        step > s.number
                          ? "bg-accent text-accent-foreground"
                          : step === s.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {step > s.number ? <CheckCircle2 className="w-5 h-5" /> : s.number}
                    </div>
                    <span className={cn(
                      "text-xs mt-2 hidden sm:block",
                      step >= s.number ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-1 w-12 sm:w-24 mx-2 rounded-full",
                        step > s.number ? "bg-accent" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="max-w-2xl mx-auto">
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-accent" />
                    Church Information
                  </CardTitle>
                  <CardDescription>Tell us about your church</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="churchName">Church Name *</Label>
                    <Input id="churchName" placeholder="e.g., Shoreline Community Church" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="e.g., San Francisco" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input id="state" placeholder="e.g., California" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" placeholder="United States" defaultValue="United States" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="e.g., 94102" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="website" placeholder="https://yourchurch.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button variant="gold" onClick={() => setStep(2)}>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    Contact Details
                  </CardTitle>
                  <CardDescription>Who should we contact about your account?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="First name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input id="role" placeholder="e.g., Pastor, Finance Director" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="you@church.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" className="pl-10" />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button variant="gold" onClick={() => setStep(3)}>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" />
                    Connect Stripe
                  </CardTitle>
                  <CardDescription>Set up payments to receive donations directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Stripe Connect</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          We use Stripe to securely process payments. Donations are deposited 
                          directly to your church's bank account.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Bank-level encryption",
                            "Direct deposits in 2-3 days",
                            "Industry-standard 2.9% + $0.30 per transaction",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline-forest" size="lg" className="w-full">
                    <CreditCard className="w-5 h-5" />
                    Connect with Stripe
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You'll be redirected to Stripe to complete the setup. Takes about 10 minutes.
                  </p>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button variant="gold" onClick={() => setStep(4)}>
                      Skip for Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {step === 4 && (
              <>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="font-display text-2xl">
                    You're All Set!
                  </CardTitle>
                  <CardDescription>
                    Your church is now registered. Here's your launch kit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted text-center">
                      <QrCode className="w-32 h-32 mx-auto text-foreground mb-3" />
                      <p className="text-sm font-medium">Your Church QR Code</p>
                      <Button variant="soft" size="sm" className="mt-2">
                        Download PNG
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-muted">
                        <p className="text-sm font-medium mb-1">Your Unique Link</p>
                        <code className="text-xs text-primary break-all">
                          dailybread.app/join/shoreline-church
                        </code>
                      </div>

                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/church-onboarding-kit">
                          View Full Launch Kit
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>

                      <Button variant="gold" className="w-full" asChild>
                        <Link to="/church-admin">
                          Go to Dashboard
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2">What's Next?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        Share your QR code during Sunday announcements
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        Add the link to your website and emails
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        Complete Stripe setup to receive donations
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default ChurchOnboarding;
