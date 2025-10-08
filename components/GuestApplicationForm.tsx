'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Upload, Loader2 } from 'lucide-react'

const applicationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  linkedinUrl: z.string().url('Valid LinkedIn URL is required'),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  currentRole: z.string().min(2, 'Current role is required'),
  company: z.string().min(2, 'Company name is required'),
  yearsOfExperience: z.number().min(1, 'Years of experience is required'),
  expertise: z.string().min(10, 'Please describe your expertise'),
  achievements: z.string().min(10, 'Please list your achievements'),
  reasonForGuest: z.string().min(50, 'Please provide at least 50 characters'),
  uniqueInsights: z.string().min(50, 'Please provide at least 50 characters'),
  topicsToDiscuss: z.string().min(20, 'Please list topics you want to discuss'),
  previousExperience: z.string().optional(),
  preferredTimeframe: z.string().min(1, 'Preferred timeframe is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  recordingFormat: z.enum(['video', 'audio-only']),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function GuestApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = async (data: ApplicationFormData) => {
    setLoading(true)

    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          expertise: data.expertise.split('\n').filter(Boolean),
          achievements: data.achievements.split('\n').filter(Boolean),
          topicsToDiscuss: data.topicsToDiscuss.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Application submitted successfully!')
        setSubmitted(true)
        reset()
      } else {
        toast.error(result.error || 'Failed to submit application')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="card bg-neutral-50 text-center py-12">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold text-primary mb-4">
          Application Submitted!
        </h3>
        <p className="text-text-secondary max-w-md mx-auto mb-6">
          Thank you for your application. We'll review it carefully and get back to you within 5-7 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-8">
      {/* Personal Information */}
      <div>
        <h4 className="text-xl font-semibold text-primary mb-4">
          Personal Information
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="input-field"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('email')}
              className="input-field"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              LinkedIn Profile <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              {...register('linkedinUrl')}
              className="input-field"
              placeholder="https://linkedin.com/in/johndoe"
            />
            {errors.linkedinUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="label-field">Twitter/X Handle (Optional)</label>
            <input
              type="url"
              {...register('twitterUrl')}
              className="input-field"
              placeholder="https://twitter.com/johndoe"
            />
            {errors.twitterUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.twitterUrl.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div>
        <h4 className="text-xl font-semibold text-primary mb-4">
          Professional Details
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">
              Current Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('currentRole')}
              className="input-field"
              placeholder="Senior Software Engineer"
            />
            {errors.currentRole && (
              <p className="text-red-500 text-sm mt-1">{errors.currentRole.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('company')}
              className="input-field"
              placeholder="Tech Corp Inc."
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="label-field">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('yearsOfExperience', { valueAsNumber: true })}
              className="input-field"
              placeholder="10"
              min="1"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="label-field">
              Area of Expertise <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('expertise')}
              className="input-field"
              rows={3}
              placeholder="e.g., Distributed Systems, Cloud Architecture, Engineering Leadership (one per line)"
            />
            {errors.expertise && (
              <p className="text-red-500 text-sm mt-1">{errors.expertise.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="label-field">
              Notable Achievements <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('achievements')}
              className="input-field"
              rows={4}
              placeholder="List your key achievements (one per line)"
            />
            {errors.achievements && (
              <p className="text-red-500 text-sm mt-1">{errors.achievements.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Podcast Fit */}
      <div>
        <h4 className="text-xl font-semibold text-primary mb-4">
          Podcast Fit
        </h4>
        <div className="space-y-6">
          <div>
            <label className="label-field">
              Why do you want to be on the podcast? <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('reasonForGuest')}
              className="input-field"
              rows={4}
              placeholder="Share your motivation for being a guest..."
            />
            {errors.reasonForGuest && (
              <p className="text-red-500 text-sm mt-1">{errors.reasonForGuest.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              What unique insights can you share? <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('uniqueInsights')}
              className="input-field"
              rows={4}
              placeholder="What makes your perspective valuable to our audience?"
            />
            {errors.uniqueInsights && (
              <p className="text-red-500 text-sm mt-1">{errors.uniqueInsights.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              Topics You'd Like to Discuss <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('topicsToDiscuss')}
              className="input-field"
              placeholder="e.g., Microservices, Team Building, Technical Debt (comma-separated)"
            />
            {errors.topicsToDiscuss && (
              <p className="text-red-500 text-sm mt-1">{errors.topicsToDiscuss.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              Previous Podcast/Speaking Experience (Optional)
            </label>
            <textarea
              {...register('previousExperience')}
              className="input-field"
              rows={3}
              placeholder="List any previous podcasts, conferences, or speaking engagements..."
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xl font-semibold text-primary mb-4">
          Availability
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">
              Preferred Timeframe <span className="text-red-500">*</span>
            </label>
            <select {...register('preferredTimeframe')} className="input-field">
              <option value="">Select timeframe</option>
              <option value="next-2-weeks">Next 2 weeks</option>
              <option value="next-month">Next month</option>
              <option value="next-2-3-months">Next 2-3 months</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.preferredTimeframe && (
              <p className="text-red-500 text-sm mt-1">{errors.preferredTimeframe.message}</p>
            )}
          </div>

          <div>
            <label className="label-field">
              Timezone <span className="text-red-500">*</span>
            </label>
            <select {...register('timezone')} className="input-field">
              <option value="">Select timezone</option>
              <option value="PST">Pacific (PST/PDT)</option>
              <option value="MST">Mountain (MST/MDT)</option>
              <option value="CST">Central (CST/CDT)</option>
              <option value="EST">Eastern (EST/EDT)</option>
              <option value="GMT">GMT</option>
              <option value="CET">Central European</option>
              <option value="IST">India (IST)</option>
              <option value="JST">Japan (JST)</option>
              <option value="AEST">Australia Eastern</option>
            </select>
            {errors.timezone && (
              <p className="text-red-500 text-sm mt-1">{errors.timezone.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="label-field">
              Recording Format Preference <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  {...register('recordingFormat')}
                  className="mr-2"
                />
                <span>Video (Recommended)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="audio-only"
                  {...register('recordingFormat')}
                  className="mr-2"
                />
                <span>Audio Only</span>
              </label>
            </div>
            {errors.recordingFormat && (
              <p className="text-red-500 text-sm mt-1">{errors.recordingFormat.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  )
}

