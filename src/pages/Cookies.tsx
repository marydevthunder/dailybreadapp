import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="badge-blue mb-4 inline-block">Legal</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Cookie Policy
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
                <h2 className="font-display text-xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit 
                  a website. They help websites remember information about your visit, like 
                  your preferences and login status, making your next visit easier.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">How We Use Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Daily Bread uses cookies for the following purposes:
                </p>
                
                <h3 className="font-semibold text-lg mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies are necessary for the website to function properly. They enable 
                  core functionality such as security, account authentication, and remembering 
                  your preferences. You cannot opt out of essential cookies.
                </p>

                <h3 className="font-semibold text-lg mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use analytics cookies to understand how visitors interact with our website. 
                  This helps us improve our Service and provide a better user experience. These 
                  cookies collect information anonymously.
                </p>

                <h3 className="font-semibold text-lg mb-2">Functional Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies allow us to remember choices you make and provide enhanced features. 
                  For example, they may remember your login details so you don't have to enter them 
                  every time you visit.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold">Cookie Name</th>
                        <th className="text-left py-3 pr-4 font-semibold">Purpose</th>
                        <th className="text-left py-3 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground text-sm">
                      <tr className="border-b border-border">
                        <td className="py-3 pr-4">session_id</td>
                        <td className="py-3 pr-4">Maintains your login session</td>
                        <td className="py-3">Session</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 pr-4">preferences</td>
                        <td className="py-3 pr-4">Stores your settings</td>
                        <td className="py-3">1 year</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 pr-4">_ga</td>
                        <td className="py-3 pr-4">Google Analytics tracking</td>
                        <td className="py-3">2 years</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 pr-4">csrf_token</td>
                        <td className="py-3 pr-4">Security protection</td>
                        <td className="py-3">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li><strong>Google Analytics:</strong> For website traffic analysis</li>
                  <li><strong>Plaid:</strong> For secure bank account connection</li>
                  <li><strong>Stripe:</strong> For payment processing</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies</li>
                  <li><strong>Third-party tools:</strong> Use browser extensions to manage tracking</li>
                  <li><strong>Opt-out links:</strong> Many analytics services offer opt-out options</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please note that blocking certain cookies may impact the functionality of our Service.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time. Any changes will be posted 
                  on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, please contact us at 
                  privacy@dailybread.app.
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

export default Cookies;