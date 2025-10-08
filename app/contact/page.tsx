import ContactForm from '@/components/ContactForm'
import { Mail, MessageSquare, HelpCircle, Briefcase } from 'lucide-react'

export const metadata = {
  title: 'Contact | The Practitioners Pod',
  description: 'Get in touch with The Practitioners Pod. We\'d love to hear from you.',
}

export default function ContactPage() {
  const faqs = [
    {
      question: 'How do I apply to be a guest?',
      answer: 'Visit our Apply page and fill out the guest application form. We review all applications and respond within 5-7 business days.',
    },
    {
      question: 'What is the recording process like?',
      answer: 'We record remotely via Zoom. Sessions are typically 60-75 minutes, with the final episode being 45-60 minutes after editing. We handle all post-production.',
    },
    {
      question: 'How long does it take for an episode to be published?',
      answer: 'Episodes are typically published 2-4 weeks after recording. We\'ll notify you of the exact release date and provide you with promotional materials.',
    },
    {
      question: 'Do you accept sponsorships?',
      answer: 'Yes, we work with select sponsors whose products and services align with our audience. Please use the contact form with the subject "Sponsorship Inquiry" for more information.',
    },
    {
      question: 'Can I suggest a guest?',
      answer: 'Absolutely! We love guest recommendations. Send us their name, background, and why you think they\'d be a great fit using the contact form.',
    },
    {
      question: 'How can I stay updated on new episodes?',
      answer: 'Subscribe to our newsletter on the homepage, follow us on YouTube, or connect with us on LinkedIn and Twitter.',
    },
  ]

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-primary mb-4">Get in Touch</h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="card text-center">
              <MessageSquare className="w-10 h-10 text-accent mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-primary mb-2">
                General Inquiry
              </h3>
              <p className="text-xs text-text-secondary">
                Questions about the podcast
              </p>
            </div>
            <div className="card text-center">
              <Briefcase className="w-10 h-10 text-accent mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-primary mb-2">
                Guest Application
              </h3>
              <p className="text-xs text-text-secondary">
                Apply to be featured
              </p>
            </div>
            <div className="card text-center">
              <Mail className="w-10 h-10 text-accent mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-primary mb-2">
                Sponsorship
              </h3>
              <p className="text-xs text-text-secondary">
                Advertising opportunities
              </p>
            </div>
            <div className="card text-center">
              <HelpCircle className="w-10 h-10 text-accent mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-primary mb-2">
                Press
              </h3>
              <p className="text-xs text-text-secondary">
                Media inquiries
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold text-primary mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Email</h4>
                  <a
                    href="mailto:hello@thepractitionerspod.com"
                    className="text-accent hover:text-accent/80"
                  >
                    hello@thepractitionerspod.com
                  </a>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Social Media</h4>
                  <div className="space-y-2">
                    <a
                      href="https://youtube.com/@thepractitionerspod"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:text-accent/80"
                    >
                      YouTube
                    </a>
                    <a
                      href="https://linkedin.com/company/thepractitionerspod"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:text-accent/80"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/practitionerspod"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:text-accent/80"
                    >
                      Twitter
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-2">Response Time</h4>
                  <p className="text-text-secondary text-sm">
                    We typically respond to inquiries within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="card group">
                  <summary className="font-semibold text-primary cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-accent group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-text-secondary mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

