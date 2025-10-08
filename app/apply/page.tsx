import GuestApplicationForm from '@/components/GuestApplicationForm'
import { CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Apply to Be a Guest | The Practitioners Pod',
  description: 'Share your expertise and insights on The Practitioners Pod. Apply to be featured as a guest on our show.',
}

export default function ApplyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-primary mb-4">Apply to Be a Guest</h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Share your expertise and insights with our audience of tech practitioners and leaders.
            </p>
          </div>

          {/* What to Expect */}
          <div className="card mb-12 bg-neutral-50">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              What to Expect
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Deep Conversations
                  </h4>
                  <p className="text-sm text-text-secondary">
                    45-60 minute in-depth discussions about your work, challenges, and insights.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Remote Recording
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Record from anywhere via Zoom with high-quality video and audio.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Professional Production
                  </h4>
                  <p className="text-sm text-text-secondary">
                    We handle all editing and production to showcase your expertise.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Promotion
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Episode promoted across YouTube, social media, and our newsletter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who We're Looking For */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Who We're Looking For
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span>Senior engineers, architects, and technical leaders with 8+ years of experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span>CTOs, VPs of Engineering, and founding engineers</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span>Industry experts with unique insights on technology, architecture, or engineering culture</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span>Practitioners who have built or scaled significant technical systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span>Leaders who are passionate about sharing their knowledge with the community</span>
              </li>
            </ul>
          </div>

          {/* Application Form */}
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Application Form
            </h3>
            <p className="text-text-secondary mb-8">
              Please fill out the form below. We review all applications carefully and will respond within 5-7 business days.
            </p>
            <GuestApplicationForm />
          </div>
        </div>
      </div>
    </div>
  )
}

