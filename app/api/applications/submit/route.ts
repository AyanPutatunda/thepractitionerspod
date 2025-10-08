import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  linkedinUrl: z.string().url(),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  currentRole: z.string().min(2),
  company: z.string().min(2),
  yearsOfExperience: z.number().min(1),
  expertise: z.array(z.string()),
  achievements: z.array(z.string()),
  reasonForGuest: z.string().min(50),
  uniqueInsights: z.string().min(50),
  topicsToDiscuss: z.array(z.string()),
  previousExperience: z.string().optional(),
  preferredTimeframe: z.string().min(1),
  timezone: z.string().min(1),
  recordingFormat: z.enum(['video', 'audio-only']),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = applicationSchema.parse(body)

    // Check if email already applied
    const existing = await prisma.guestApplication.findFirst({
      where: { email: data.email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 400 }
      )
    }

    // Create application
    const application = await prisma.guestApplication.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        linkedinUrl: data.linkedinUrl,
        twitterUrl: data.twitterUrl || null,
        currentRole: data.currentRole,
        company: data.company,
        yearsOfExperience: data.yearsOfExperience,
        expertise: data.expertise,
        achievements: data.achievements,
        reasonForGuest: data.reasonForGuest,
        uniqueInsights: data.uniqueInsights,
        topicsToDiscuss: data.topicsToDiscuss,
        previousExperience: data.previousExperience || null,
        preferredTimeframe: data.preferredTimeframe,
        timezone: data.timezone,
        recordingFormat: data.recordingFormat,
      },
    })

    // TODO: Send confirmation email to applicant via Resend
    // TODO: Send notification to admin

    return NextResponse.json({ success: true, id: application.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

