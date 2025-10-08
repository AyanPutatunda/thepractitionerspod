export const metadata = {
  title: 'Privacy Policy | The Practitioners Pod',
  description: 'Our privacy policy and how we handle your data.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Introduction
              </h2>
              <p>
                The Practitioners Pod ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Professional information (company, job title, LinkedIn profile)</li>
                <li>Usage data (pages visited, time spent, interactions)</li>
                <li>Device information (browser type, IP address, operating system)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                How We Use Your Information
              </h2>
              <p>We use collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing guest applications</li>
                <li>Sending newsletters and updates</li>
                <li>Responding to inquiries and support requests</li>
                <li>Improving our website and services</li>
                <li>Analyzing usage patterns and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Data Sharing and Disclosure
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>With service providers who assist in our operations</li>
                <li>To protect our rights and property</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@thepractitionerspod.com" className="text-accent hover:text-accent/80">
                  privacy@thepractitionerspod.com
                </a>
              </p>
            </section>

            <p className="text-sm text-text-secondary">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

