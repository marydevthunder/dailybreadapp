import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";

const FAQs = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How does Daily Bread work?",
          answer: "Daily Bread connects to your bank account and rounds up your everyday purchases to the nearest dollar. When your round-ups reach your chosen threshold ($7, $10, or $25), we automatically donate that amount to your selected church. It's effortless giving that adds up over time."
        },
        {
          question: "How do I sign up?",
          answer: "Simply click 'Get Started', create an account with your email, connect your bank account through our secure Plaid integration, select your church, and choose your round-up threshold. The entire process takes about 5 minutes."
        },
        {
          question: "Is there a minimum donation amount?",
          answer: "Your round-ups accumulate until they reach your chosen threshold ($7, $10, or $25). Once you hit that threshold, we process the donation. There's no minimum to start—just connect your card and let the round-ups begin."
        },
      ]
    },
    {
      title: "Security & Privacy",
      faqs: [
        {
          question: "Is my bank information secure?",
          answer: "Absolutely. We use Plaid, the same service used by major financial apps like Venmo and Robinhood, to securely connect to your bank. We use bank-level 256-bit encryption and never store your login credentials."
        },
        {
          question: "Can Daily Bread access my full bank account?",
          answer: "No. We have read-only access to your transaction data to calculate round-ups. We cannot move money, make purchases, or access any funds without your explicit authorization for donations."
        },
        {
          question: "How is my personal data protected?",
          answer: "We follow strict data protection protocols and are fully compliant with financial regulations. Your data is encrypted both in transit and at rest, and we never sell your information to third parties."
        },
      ]
    },
    {
      title: "Donations & Payments",
      faqs: [
        {
          question: "How much does Daily Bread cost?",
          answer: "Daily Bread is completely free for individual givers. 100% of your donations go directly to your church. We partner with churches who pay a small platform fee to cover our operating costs."
        },
        {
          question: "Can I change my donation threshold?",
          answer: "Yes! You can change your threshold at any time from your dashboard. Choose between $7, $10, or $25 based on what works best for your budget."
        },
        {
          question: "How do I get a receipt for my donations?",
          answer: "Donation receipts are automatically generated and available in your dashboard. You can download individual receipts or an annual summary for tax purposes at any time."
        },
        {
          question: "Can I make one-time donations in addition to round-ups?",
          answer: "Yes! While our core feature is round-up giving, you can also make one-time donations directly through the app whenever you'd like to give extra."
        },
      ]
    },
    {
      title: "Churches & Organizations",
      faqs: [
        {
          question: "How do I find my church on Daily Bread?",
          answer: "You can search for your church by name in our directory. If your church isn't listed yet, you can request to add them, and we'll reach out to help get them set up."
        },
        {
          question: "How does my church receive the donations?",
          answer: "Churches connect their bank account through Stripe. Donations are batched and transferred to the church's account on a regular schedule (typically weekly or bi-weekly)."
        },
        {
          question: "Can I give to multiple churches?",
          answer: "Currently, you can select one primary church for your round-up donations. However, you can change your church at any time if you switch congregations."
        },
      ]
    },
    {
      title: "Account Management",
      faqs: [
        {
          question: "How do I pause or cancel my account?",
          answer: "You can pause round-ups anytime from your dashboard settings. This stops new donations while keeping your account active. To fully cancel, simply disconnect your bank account from the settings page."
        },
        {
          question: "Can I see my donation history?",
          answer: "Yes! Your dashboard shows a complete history of all round-ups and donations, including dates, amounts, and running totals. You can also export this data for your records."
        },
        {
          question: "What happens if I change banks or cards?",
          answer: "Simply disconnect your old card and connect your new one through the settings page. Any accumulated round-ups will transfer to your new connection."
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-4 inline-block">FAQs</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Daily Bread. Can't find what you're 
              looking for? Reach out to our support team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-card border border-border rounded-lg px-4 sm:px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 text-sm sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-blue mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-card mb-4">
              Still Have Questions?
            </h2>
            <p className="text-card/70 mb-8">
              Our support team is ready to help you with anything you need.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                Contact Support
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

export default FAQs;