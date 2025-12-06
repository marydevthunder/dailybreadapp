import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="badge-blue mb-4 inline-block">Legal</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <div className="space-y-8 text-foreground">
              <div>
                <h2 className="font-display text-xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Daily Bread ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you use our mobile application and website (collectively, the "Service").
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Information We Collect</h2>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you create an account, we collect:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Name and email address</li>
                  <li>Phone number (optional)</li>
                  <li>Church affiliation</li>
                </ul>
                
                <h3 className="font-semibold text-lg mb-2 mt-6">Financial Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Through our secure integration with Plaid, we access read-only transaction data 
                  from your linked bank accounts, including merchant names, transaction amounts, 
                  and dates. We do not store your bank login credentials.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Calculate round-ups from your transactions</li>
                  <li>Process donations to your selected church</li>
                  <li>Provide customer support</li>
                  <li>Send donation confirmations and account updates</li>
                  <li>Improve our Service</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell your personal information. We may share information with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Your selected church:</strong> Donation amounts and your name (for acknowledgment)</li>
                  <li><strong>Service providers:</strong> Plaid (banking), Stripe (payments), cloud hosting</li>
                  <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement bank-level security measures including 256-bit encryption, 
                  secure data centers, and regular security audits. However, no method of 
                  transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service is not intended for children under 18. We do not knowingly 
                  collect personal information from children under 18.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of 
                  any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground mt-2">
                  Email: privacy@dailybread.app<br />
                  Address: San Francisco, CA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;