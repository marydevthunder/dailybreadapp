import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="badge-blue mb-4 inline-block">Legal</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Terms of Service
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
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 text-foreground">
              <div>
                <h2 className="font-display text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Daily Bread's services, you agree to be bound by these 
                  Terms of Service and all applicable laws and regulations. If you do not agree 
                  with any of these terms, you are prohibited from using our services.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Daily Bread provides a platform that connects to your bank account, rounds up 
                  your transactions to the nearest dollar, and donates the accumulated spare change 
                  to your selected church when you reach your chosen threshold.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">3. Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use our Service, you must:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly notify us of any unauthorized access</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">4. Donations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By using our Service, you authorize Daily Bread to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your transaction data through Plaid</li>
                  <li>Calculate round-ups based on your transactions</li>
                  <li>Initiate donations when you reach your threshold</li>
                  <li>Process payments through your connected payment method</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  All donations are final and non-refundable unless required by law or at our 
                  sole discretion.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">5. Fees</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Daily Bread is free for individual users. 100% of your donations go to your 
                  selected church. Churches pay a platform fee that covers our operating costs.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">6. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper working of the Service</li>
                  <li>Transmit any viruses or malicious code</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, features, and functionality of the Service are owned by Daily Bread 
                  and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT 
                  GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  IN NO EVENT SHALL DAILY BREAD BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">10. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account at any time for any reason. You may 
                  also terminate your account at any time by disconnecting your bank account and 
                  contacting us.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify you of 
                  significant changes via email or through the Service.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by the laws of the State of California, without 
                  regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">13. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms, please contact us at legal@dailybread.app.
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

export default Terms;