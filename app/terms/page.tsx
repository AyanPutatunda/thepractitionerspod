export const metadata = {
  title: 'Terms of Service | The Practitioners Pod',
  description: 'Terms and conditions for using The Practitioners Pod website.',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-primary mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using The Practitioners Pod website, you accept and agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Use of Website
              </h2>
              <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to scrape or collect data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos, videos, and software, 
                is the property of The Practitioners Pod or its content suppliers and is protected by 
                copyright and intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Guest Applications
              </h2>
              <p>
                Submitting a guest application does not guarantee you will be featured on the podcast. 
                We reserve the right to accept or decline any application at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Content Usage
              </h2>
              <p>
                Podcast episodes and content are available for personal, non-commercial use. 
                You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Disclaimer
              </h2>
              <p>
                The website is provided "as is" without warranties of any kind. We do not guarantee 
                the accuracy, completeness, or reliability of any content on the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Limitation of Liability
              </h2>
              <p>
                The Practitioners Pod shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising out of your use of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Contact Information
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at:{' '}
                <a href="mailto:legal@thepractitionerspod.com" className="text-accent hover:text-accent/80">
                  legal@thepractitionerspod.com
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

