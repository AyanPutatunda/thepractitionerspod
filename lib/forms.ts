import { z } from 'zod'

const linkedin = z
  .string()
  .trim()
  .max(300)
  .refine(
    (value) => value === '' || /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\/.+/i.test(value),
    'Enter a full https LinkedIn URL, or leave this blank.'
  )

export const guestApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Name is required.').max(120),
  email: z.string().trim().email('Enter a valid email.').max(200),
  title: z.string().trim().min(2, 'Title is required.').max(160),
  company: z.string().trim().min(2, 'Company is required.').max(160),
  linkedin,
  bio: z.string().trim().min(20, 'A short bio helps. A sentence or two is enough.').max(2000),
  topics: z.string().trim().min(10, 'List the topics you want to cover.').max(1000),
  story: z
    .string()
    .trim()
    .min(40, 'Describe a concrete implementation story — what shipped, and what went wrong.')
    .max(4000),
  availability: z.string().trim().min(2, 'Share your timezone and when you can record.').max(300),
  'heard-from': z.string().trim().max(300),
  consent: z.literal('yes', {
    errorMap: () => ({ message: 'Consent is required.' }),
  }),
})

export const contactSubjects = [
  'General',
  'Guest Application',
  'Sponsorship',
  'Press',
  'Other',
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required.').max(120),
  email: z.string().trim().email('Enter a valid email.').max(200),
  subject: z.enum(contactSubjects, {
    errorMap: () => ({ message: 'Choose a subject.' }),
  }),
  message: z.string().trim().min(10, 'Write a short message.').max(5000),
  consent: z.literal('yes', {
    errorMap: () => ({ message: 'Consent is required.' }),
  }),
})

export type GuestApplication = z.infer<typeof guestApplicationSchema>
export type ContactMessage = z.infer<typeof contactSchema>

export function formErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !fields[key]) fields[key] = issue.message
  }
  return fields
}
