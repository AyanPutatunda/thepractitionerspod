import Link from 'next/link'
import { Mic2, Target, Users, TrendingUp, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About | The Practitioners Pod',
  description: 'Learn about The Practitioners Pod - our mission, values, and the team behind the conversations with tech industry leaders.',
}

export default function AboutPage() {
  const stats = [
    { label: 'Episodes Published', value: '50+' },
    { label: 'Countries Reached', value: '45+' },
    { label: 'Industries Represented', value: '15+' },
    { label: 'Total Downloads', value: '100K+' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Authenticity',
      description: 'Real conversations with real practitioners. No corporate speak, just honest insights from the trenches.',
    },
    {
      icon: Users,
      title: 'Experience',
      description: 'We feature senior practitioners with deep hands-on experience building and scaling technical systems.',
    },
    {
      icon: Mic2,
      title: 'Depth',
      description: 'Long-form conversations that go beyond surface-level discussions to explore complex technical topics.',
    },
    {
      icon: TrendingUp,
      title: 'Practical Value',
      description: 'Every episode delivers actionable insights and lessons learned that you can apply in your own work.',
    },
  ]

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container-custom mb-20">
        <div className="max-w-4xl">
          <h1 className="text-primary mb-6">About The Practitioners Pod</h1>
          <p className="text-2xl text-text-secondary leading-relaxed mb-8">
            We bring you authentic conversations with the people building the future of technology.
          </p>
          <p className="text-xl text-text-secondary leading-relaxed">
            The Practitioners Pod is a platform for experienced tech practitioners to share their real-world insights, challenges, and lessons learned from years in the field.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-50 py-16 mb-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container-custom mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary mb-8 text-center">Our Mission</h2>
          <div className="card bg-gradient-to-br from-primary to-accent text-white p-12">
            <p className="text-2xl leading-relaxed text-center">
              To create a space where tech practitioners can share authentic insights, learn from each other's experiences, and elevate the entire industry through knowledge sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container-custom mb-20">
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Our Values</h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            These principles guide every conversation we have and every decision we make.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value) => (
            <div key={value.title} className="card">
              <value.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Host Section */}
      <section className="container-custom mb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-primary mb-12 text-center">Meet Your Host</h2>
          
          <div className="card">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="aspect-square rounded-sm overflow-hidden bg-neutral-200 mb-4">
                  {/* Placeholder for host photo */}
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-24 h-24 text-neutral-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  [Host Name]
                </h3>
                <p className="text-accent font-medium mb-4">
                  Founder & Host
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80"
                  >
                    Twitter
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-text-secondary leading-relaxed mb-4">
                  [Host Name] is a [title/role] with [X] years of experience in the tech industry. They've [brief career highlights].
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The idea for The Practitioners Pod came from [origin story - why they started the podcast, what problem they saw, what they wanted to create].
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  When not recording episodes, [host name] enjoys [personal interests that humanize them].
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Connect with [host name] at <a href="mailto:host@thepractitionerspod.com" className="text-accent hover:text-accent/80">host@thepractitionerspod.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="bg-neutral-50 py-20 mb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-primary mb-8 text-center">Topics We Cover</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                'System Design & Architecture',
                'Engineering Leadership',
                'Technical Decision Making',
                'Building & Scaling Teams',
                'Career Growth & Development',
                'Emerging Technologies',
                'DevOps & Infrastructure',
                'Engineering Culture',
                'Product Development',
              ].map((topic) => (
                <div key={topic} className="card text-center">
                  <p className="text-primary font-medium">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interview Style */}
      <section className="container-custom mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary mb-8">Our Interview Style</h2>
          <div className="space-y-6 text-text-secondary leading-relaxed">
            <p className="text-lg">
              We believe the best insights come from authentic, in-depth conversations. Our episodes typically run 45-60 minutes, giving guests the space to really dive deep into their experiences and insights.
            </p>
            <p className="text-lg">
              We don't do surface-level interviews. We ask the hard questions, explore the challenges and failures, and dig into the decision-making processes that led to success.
            </p>
            <p className="text-lg">
              Our guests appreciate the opportunity to share their complete story - the good, the bad, and the lessons learned along the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom">
        <div className="card bg-primary text-white text-center">
          <h2 className="mb-6">Want to Be Part of the Show?</h2>
          <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
            We're always looking for experienced practitioners with unique insights to share.
          </p>
          <Link href="/apply" className="btn-primary bg-white text-primary hover:bg-neutral-100">
            Apply to Be a Guest
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

