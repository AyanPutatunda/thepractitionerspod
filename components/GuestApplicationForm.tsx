'use client'

import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { formErrors, guestApplicationSchema } from '@/lib/forms'
import { site } from '@/lib/site'

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'title', label: 'Title', type: 'text', autoComplete: 'organization-title' },
  { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'url', autoComplete: 'url', optional: true },
] as const

export function GuestApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(
      [...data.entries()].filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    )
    const parsed = guestApplicationSchema.safeParse({
      ...values,
      consent: data.get('consent') === 'yes' ? 'yes' : '',
    })
    if (!parsed.success) {
      setErrors(formErrors(parsed.error))
      setStatus('idle')
      return
    }
    setErrors({})
    setStatus('sending')
    setFormError('')
    const body = new URLSearchParams()
    for (const [key, value] of Object.entries(values)) body.append(key, value)
    if (data.get('consent') === 'yes') body.set('consent', 'yes')

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('Form was not accepted')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setFormError(`That did not go through. Email ${site.email} and it will be read.`)
    }
  }

  if (status === 'success') {
    return (
      <p className="status" role="status">
        <Check size={18} strokeWidth={1.5} aria-hidden />
        Received. Your application is in. A reply, if one is needed, will come from {site.email}.
      </p>
    )
  }

  return (
    <form
      name="guest-application"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="form-grid"
      noValidate
    >
      <input type="hidden" name="form-name" value="guest-application" />
      <p className="honeypot">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {fields.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
            {'optional' in field && field.optional ? ' (optional)' : ''}
          </label>
          <input
            id={field.name}
            className="input"
            name={field.name}
            type={field.type}
            autoComplete={'autoComplete' in field ? field.autoComplete : undefined}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            required={!('optional' in field && field.optional)}
          />
          {errors[field.name] ? (
            <p id={`${field.name}-error`} className="field-error">
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}
      <div className="field">
        <label htmlFor="bio">Short bio</label>
        <textarea
          id="bio"
          className="input"
          name="bio"
          aria-invalid={errors.bio ? true : undefined}
          aria-describedby={errors.bio ? 'bio-error' : undefined}
          required
        />
        {errors.bio ? (
          <p id="bio-error" className="field-error">
            {errors.bio}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="topics">Topics you want to talk about</label>
        <textarea
          id="topics"
          className="input"
          name="topics"
          aria-invalid={errors.topics ? true : undefined}
          aria-describedby={errors.topics ? 'topics-error' : undefined}
          required
        />
        {errors.topics ? (
          <p id="topics-error" className="field-error">
            {errors.topics}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="story">An implementation story</label>
        <textarea
          id="story"
          className="input"
          name="story"
          aria-invalid={errors.story ? true : undefined}
          aria-describedby={errors.story ? 'story-error' : 'story-hint'}
          required
        />
        <p id="story-hint" className="quiet" style={{ margin: '8px 0 0', fontSize: 14 }}>
          What you shipped, what broke, and what you would do differently.
        </p>
        {errors.story ? (
          <p id="story-error" className="field-error">
            {errors.story}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="availability">Availability and timezone</label>
        <input
          id="availability"
          className="input"
          name="availability"
          type="text"
          required
          aria-invalid={errors.availability ? true : undefined}
          aria-describedby={errors.availability ? 'availability-error' : undefined}
        />
        {errors.availability ? (
          <p id="availability-error" className="field-error">
            {errors.availability}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="heard-from">How you heard about the show (optional)</label>
        <input id="heard-from" className="input" name="heard-from" type="text" />
      </div>
      <label className="check">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          aria-invalid={errors.consent ? true : undefined}
        />
        <span>
          I agree to be contacted about this application. I have read the{' '}
          <a href="/privacy">privacy policy</a>.
        </span>
      </label>
      {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
      {formError ? (
        <p className="field-error" role="alert">
          {formError}
        </p>
      ) : null}
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === 'sending'}
        style={{ width: 'fit-content' }}
      >
        {status === 'sending' ? 'Sending' : 'Submit application'}
      </button>
    </form>
  )
}
