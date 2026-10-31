'use client'

import { useState, type FocusEvent, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { contactSchema, contactSubjects, formErrors, issueFor } from '@/lib/forms'
import { site } from '@/lib/site'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')

  function onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = event.currentTarget
    const nextValue =
      type === 'checkbox' && event.currentTarget instanceof HTMLInputElement
        ? event.currentTarget.checked
          ? 'yes'
          : ''
        : value
    const message = issueFor(contactSchema, name, nextValue)
    setErrors((current) => {
      const next = { ...current }
      if (message) next[name] = message
      else delete next[name]
      return next
    })
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
      consent: data.get('consent') === 'yes' ? 'yes' : '',
      'form-name': 'contact',
      'bot-field': String(data.get('bot-field') ?? ''),
    }
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(formErrors(parsed.error))
      return
    }
    setErrors({})
    setStatus('sending')
    setFormError('')
    const body = new URLSearchParams(values)

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
      setFormError(`That did not go through. Email ${site.email} instead.`)
    }
  }

  if (status === 'success') {
    return (
      <div className="glass panel status" role="status">
        <Check size={18} strokeWidth={1.5} aria-hidden />
        <p>Received. If a reply is needed, it will come from {site.email}.</p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="form-grid glass panel"
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="honeypot">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset className="form-group">
        <legend>About you</legend>
        <div className="field-row">
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              className="input"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              onBlur={onBlur}
            />
            {errors.name ? (
              <p id="contact-name-error" className="field-error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              className="input"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              onBlur={onBlur}
            />
            {errors.email ? (
              <p id="contact-email-error" className="field-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>
      <fieldset className="form-group">
        <legend>The message</legend>
        <div className="field">
          <label htmlFor="contact-subject">Subject</label>
          <select
            id="contact-subject"
            className="input"
            name="subject"
            defaultValue=""
            required
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            onBlur={onBlur}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {contactSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p id="contact-subject-error" className="field-error">
              {errors.subject}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            className="input"
            name="message"
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            onBlur={onBlur}
          />
          {errors.message ? (
            <p id="contact-message-error" className="field-error">
              {errors.message}
            </p>
          ) : null}
        </div>
      </fieldset>
      <label className="check">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          onBlur={onBlur}
          aria-invalid={errors.consent ? true : undefined}
        />
        <span>
          I agree to be contacted about this message. I have read the{' '}
          <a href="/privacy">privacy policy</a>.
        </span>
      </label>
      {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
      {formError ? (
        <p className="field-error" role="alert">
          {formError}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : 'Send message'}
      </button>
    </form>
  )
}
