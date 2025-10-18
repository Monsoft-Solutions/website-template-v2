# Email System Documentation

## Overview

The email system provides a complete transactional email solution using **Resend** for email delivery and **React Email** for creating type-safe, component-based email templates. All templates are styled with **Tailwind CSS** for consistent design and automatic inline style conversion for email client compatibility.

## Architecture

```
apps/web/lib/
├── email/
│   ├── components/          # Shared email components
│   │   ├── EmailLayout.component.tsx
│   │   ├── EmailHeader.component.tsx
│   │   ├── EmailFooter.component.tsx
│   │   └── EmailButton.component.tsx
│   └── templates/           # Email templates
│       ├── ContactNotification.template.tsx
│       └── ContactConfirmation.template.tsx
├── services/
│   └── email.service.ts     # Email sending logic
└── types/email/             # Email type definitions
    ├── email-service.type.ts
    └── email-log.type.ts
```

### Technology Stack

- **Resend** - Email delivery service
- **React Email** - Component-based email templates
- **@react-email/tailwind** - Tailwind CSS styling for emails
- **Drizzle ORM** - Email logging and tracking
- **Zod** - Environment variable validation

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```bash
# Email Configuration (required)
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
OWNER_EMAIL=owner@yourdomain.com
```

**Variable Descriptions:**

- `RESEND_API_KEY`: API key from Resend (get from https://resend.com/api-keys)
- `RESEND_FROM_EMAIL`: Sender email address (must be a verified domain in Resend)
- `OWNER_EMAIL`: Email address to receive notifications (e.g., contact form submissions)

### Domain Setup

1. **Sign up for Resend**: https://resend.com
2. **Verify your domain**: Add DNS records in your domain registrar
3. **Get API key**: Navigate to API Keys section
4. **Configure sender address**: Use email@yourdomain.com format

## Email Components

### EmailLayout

Base wrapper component for all email templates. Provides Tailwind CSS integration and consistent structure.

```tsx
import { EmailLayout } from '@/lib/email/components/EmailLayout.component'

;<EmailLayout preview='Email preview text shown in inbox'>
    {/* Email content */}
</EmailLayout>
```

**Props:**

- `preview` (optional): Preview text shown in email clients
- `children`: Email content

**Features:**

- Automatic Tailwind CSS integration via `<Tailwind>` wrapper
- Responsive 600px max-width container
- Consistent background and padding
- Email client compatibility

### EmailHeader

Header component with logo and optional title.

```tsx
import { EmailHeader } from '@/lib/email/components/EmailHeader.component'

;<EmailHeader title='Welcome to Our Platform' />
```

**Props:**

- `title` (optional): Heading text displayed below the logo

**Features:**

- Automatically pulls logo from `site-config.ts`
- Centered layout with bottom border
- Responsive typography
- Tailwind styled

### EmailFooter

Footer component with business contact information and copyright.

```tsx
import { EmailFooter } from '@/lib/email/components/EmailFooter.component'

;<EmailFooter />
```

**Props:** None (pulls data from `site-config.ts`)

**Features:**

- Business name and address
- Email and phone links
- Copyright notice with current year
- Consistent styling across all emails

### EmailButton

Call-to-action button with two variants.

```tsx
import { EmailButton } from '@/lib/email/components/EmailButton.component'

;<EmailButton href='https://example.com' variant='primary'>
    Click Here
</EmailButton>
```

**Props:**

- `href`: Button link URL
- `children`: Button text
- `variant`: `'primary'` (blue) or `'secondary'` (gray)

**Variants:**

- **Primary**: Blue background, white text - for main CTAs
- **Secondary**: Gray background, dark text - for secondary actions

## Email Templates

### ContactNotification

Email sent to the site owner when a contact form is submitted.

**Location:** `apps/web/lib/email/templates/ContactNotification.template.tsx`

**Usage:**

```tsx
import { render } from '@react-email/render'

import { ContactNotificationEmail } from '@/lib/email/templates/ContactNotification.template'

const html = render(
    <ContactNotificationEmail
        contactData={{
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1-555-123-4567',
            subject: 'Website Inquiry',
            message: 'I am interested in your services.',
        }}
        submittedAt={new Date().toISOString()}
    />
)
```

**Content Includes:**

- Submitter's name, email, phone
- Subject and message
- Submission timestamp
- Reply button with pre-filled email

### ContactConfirmation

Email sent to the person who submitted the contact form.

**Location:** `apps/web/lib/email/templates/ContactConfirmation.template.tsx`

**Usage:**

```tsx
import { render } from '@react-email/render'

import { ContactConfirmationEmail } from '@/lib/email/templates/ContactConfirmation.template'

const html = render(
    <ContactConfirmationEmail
        name='John Doe'
        businessName='ACME Inc'
        businessEmail='contact@example.com'
        businessPhone='+1-555-123-4567'
    />
)
```

**Content Includes:**

- Personalized greeting
- Confirmation of receipt
- Expected response time
- Emergency contact information
- Send another message button

## Email Service

### Main Functions

**Location:** `apps/web/lib/services/email.service.ts`

#### sendContactEmails()

Main function that sends both notification and confirmation emails.

```tsx
import { sendContactEmails } from '@/lib/services/email.service'

// Send both emails
const result = await sendContactEmails(
    {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-123-4567',
        subject: 'Inquiry',
        message: 'Hello!',
    },
    'submission-uuid'
)

// Check results
if (result.notificationSent && result.confirmationSent) {
    console.log('Both emails sent successfully')
} else {
    console.error('Email errors:', result.errors)
}
```

**Parameters:**

- `contactData`: Contact form submission data
- `submissionId`: Database ID for tracking

**Returns:**

```typescript
{
    notificationSent: boolean
    confirmationSent: boolean
    errors: string[]
}
```

**Features:**

- Sends notification to site owner
- Sends confirmation to form submitter
- Logs all email attempts to database
- Graceful error handling (doesn't throw)
- Parallel email sending for better performance

#### sendContactNotification()

Sends notification email to site owner.

```tsx
import { sendContactNotification } from '@/lib/services/email.service'

const result = await sendContactNotification(contactData, submissionId)
```

#### sendContactConfirmation()

Sends confirmation email to form submitter.

```tsx
import { sendContactConfirmation } from '@/lib/services/email.service'

const result = await sendContactConfirmation(contactData, submissionId)
```

## Email Tracking

All email attempts are automatically logged to the `email_log` table.

### Database Schema

```typescript
// packages/db/src/schema/email-log.table.ts
{
    id: uuid (primary key)
    contactSubmissionId: uuid (foreign key)
    emailType: 'notification' | 'confirmation'
    recipientEmail: string
    status: 'sent' | 'failed' | 'pending'
    resendEmailId: string | null
    errorMessage: text | null
    sentAt: timestamp
    createdAt: timestamp
}
```

### Querying Email Logs

```tsx
import { db } from '@workspace/db/client'
import { emailLog } from '@workspace/db/schema'
import { eq } from 'drizzle-orm'

// Get all logs for a submission
const logs = await db
    .select()
    .from(emailLog)
    .where(eq(emailLog.contactSubmissionId, submissionId))

// Get failed emails
const failed = await db
    .select()
    .from(emailLog)
    .where(eq(emailLog.status, 'failed'))
```

## Creating New Email Templates

### Step 1: Create Template Component

Create a new file in `apps/web/lib/email/templates/`:

```tsx
// YourTemplate.template.tsx
import { Heading, Hr, Link, Section, Text } from '@react-email/components'

import { EmailButton } from '../components/EmailButton.component'
import { EmailFooter } from '../components/EmailFooter.component'
import { EmailHeader } from '../components/EmailHeader.component'
import { EmailLayout } from '../components/EmailLayout.component'

type YourTemplateProps = {
    name: string
    // Add other props
}

export function YourTemplateEmail({ name }: YourTemplateProps) {
    return (
        <EmailLayout preview='Your preview text'>
            <EmailHeader title='Email Title' />

            <Section className='px-10 py-5'>
                <Text className='my-4 text-lg font-semibold text-gray-900'>
                    Hi {name},
                </Text>

                <Text className='my-4 text-base leading-relaxed text-gray-600'>
                    Your email content here.
                </Text>

                <Hr className='my-8 border-gray-200' />

                <Section className='my-8'>
                    <EmailButton href='https://example.com' variant='primary'>
                        Call to Action
                    </EmailButton>
                </Section>
            </Section>

            <EmailFooter />
        </EmailLayout>
    )
}
```

### Step 2: Create Type Definitions

Add types in `apps/web/lib/types/email/`:

```tsx
// your-template.type.ts
export type YourTemplateProps = {
    name: string
    email: string
    // Add other fields
}
```

### Step 3: Create Service Function

Add sending logic in `apps/web/lib/services/email.service.ts`:

```tsx
import { YourTemplateEmail } from '@/lib/email/templates/YourTemplate.template'

export async function sendYourTemplate(
    data: YourTemplateProps
): Promise<{ success: boolean; error?: string }> {
    try {
        // Render template
        const emailHtml = render(<YourTemplateEmail {...data} />)

        // Send via Resend
        const { data: result, error } = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: data.email,
            subject: 'Your Email Subject',
            html: emailHtml,
        })

        if (error) {
            console.error('Email send error:', error)
            return { success: false, error: error.message }
        }

        // Log to database
        await db.insert(emailLog).values({
            emailType: 'your-type',
            recipientEmail: data.email,
            status: 'sent',
            resendEmailId: result?.id || null,
            sentAt: new Date(),
        })

        return { success: true }
    } catch (error) {
        console.error('Email service error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}
```

### Step 4: Use in API Route

```tsx
// app/api/your-endpoint/route.ts
import { sendYourTemplate } from '@/lib/services/email.service'

export async function POST(request: Request) {
    const data = await request.json()

    const result = await sendYourTemplate(data)

    if (!result.success) {
        return Response.json({ error: 'Email failed' }, { status: 500 })
    }

    return Response.json({ success: true })
}
```

## Styling Guide

All email components use Tailwind CSS utility classes. The `@react-email/tailwind` package automatically converts these to inline styles for email client compatibility.

### Color Palette

**Background Colors:**

- `bg-gray-50` - Light background
- `bg-white` - Container background
- `bg-blue-50` - Highlight boxes

**Text Colors:**

- `text-gray-900` - Primary headings
- `text-gray-600` - Body text
- `text-gray-400` - Subtle text
- `text-blue-500` - Links and CTAs
- `text-blue-800` - Highlighted text

**Border Colors:**

- `border-gray-200` - Dividers
- `border-blue-500` - Accent borders

### Typography

**Headings:**

- `text-2xl font-semibold` - Main titles (24px)
- `text-lg font-semibold` - Section headings (18px)

**Body Text:**

- `text-base leading-relaxed` - Regular text (16px)
- `text-sm` - Small text, labels (14px)
- `text-xs` - Fine print (12px)

### Spacing

**Padding:**

- `px-10 py-5` - Main sections (40px/20px)
- `p-4` - Content blocks (16px)
- `p-5` - Highlight boxes (20px)

**Margins:**

- `my-4` - Paragraph spacing (16px)
- `my-6` - Section spacing (24px)
- `my-8` - Button containers (32px)

### Common Patterns

**Highlight Box:**

```tsx
<Section className='my-6 rounded-lg border-2 border-blue-500 bg-blue-50 p-5 text-center'>
    <Text className='my-2 text-base leading-relaxed text-blue-800'>
        Important information
    </Text>
</Section>
```

**Divider:**

```tsx
<Hr className='my-8 border-gray-200' />
```

**Link:**

```tsx
<Link href='https://example.com' className='text-blue-500 no-underline'>
    Click here
</Link>
```

**Code/Message Block:**

```tsx
<Text className='my-4 rounded-md border border-gray-200 bg-gray-50 p-4 whitespace-pre-wrap'>
    {message}
</Text>
```

## Testing Emails

### Development Testing

1. **Use Resend's Test Mode:**

    ```bash
    # Use test API key in development
    RESEND_API_KEY=re_test_...
    ```

2. **Preview Emails Locally:**

    Create a preview route:

    ```tsx
    // app/api/preview-email/route.tsx
    import { ContactNotificationEmail } from '@/lib/email/templates/ContactNotification.template'

    export async function GET() {
        const html = render(
            <ContactNotificationEmail
                contactData={{
                    name: 'Test User',
                    email: 'test@example.com',
                    message: 'Test message',
                }}
                submittedAt={new Date().toISOString()}
            />
        )

        return new Response(html, {
            headers: { 'Content-Type': 'text/html' },
        })
    }
    ```

    Visit: `http://localhost:3000/api/preview-email`

3. **Send Test Emails:**

    Create a test script:

    ```typescript
    // scripts/test-email.ts
    import { sendContactEmails } from './lib/services/email.service'

    async function testEmail() {
        const result = await sendContactEmails(
            {
                name: 'Test User',
                email: 'your-email@example.com',
                message: 'This is a test',
            },
            'test-id'
        )
        console.log('Result:', result)
    }

    testEmail()
    ```

### Production Testing

1. **Test with Real Domains:**
    - Verify domain in Resend production account
    - Use real sender addresses
    - Send to your own email first

2. **Test Email Clients:**
    - Gmail (web, iOS, Android)
    - Outlook (web, desktop, mobile)
    - Apple Mail (macOS, iOS)
    - Other popular clients

3. **Check Email Logs:**

    ```tsx
    // Query recent email logs
    const recentLogs = await db
        .select()
        .from(emailLog)
        .orderBy(desc(emailLog.createdAt))
        .limit(10)
    ```

4. **Monitor Resend Dashboard:**
    - Check delivery rates
    - Monitor bounce rates
    - Review spam complaints

## Best Practices

### Email Content

1. **Keep it Concise** - Email clients may truncate long emails
2. **Clear CTAs** - Use obvious, action-oriented button text
3. **Personalization** - Use recipient's name when available
4. **Mobile-First** - Most emails are read on mobile devices
5. **Plain Text Alternative** - Consider adding plain text versions

### Technical Best Practices

1. **Domain Verification** - Always verify sender domains in Resend
2. **Error Handling** - Log all errors but don't block user flow
3. **Rate Limiting** - Implement rate limits on email endpoints
4. **Template Reusability** - Use shared components consistently
5. **Data Source** - Pull business info from `site-config.ts`
6. **Type Safety** - Use TypeScript for all email props
7. **Testing** - Test across multiple email clients before deploying

### Security

1. **Validate Input** - Sanitize all user input before sending
2. **Rate Limiting** - Prevent email bombing
3. **API Key Security** - Never expose API keys in client code
4. **Recipient Validation** - Verify email addresses before sending
5. **SPF/DKIM/DMARC** - Configure email authentication records

## Troubleshooting

### Emails Not Sending

1. **Check Environment Variables:**

    ```bash
    # Verify all required variables are set
    echo $RESEND_API_KEY
    echo $RESEND_FROM_EMAIL
    echo $OWNER_EMAIL
    ```

2. **Verify Domain:**
    - Log into Resend dashboard
    - Check domain verification status
    - Verify DNS records

3. **Check API Key:**
    - Ensure API key has correct permissions
    - Try generating a new key
    - Check for rate limits

4. **Review Error Logs:**
    ```tsx
    // Query failed email logs
    const failed = await db
        .select()
        .from(emailLog)
        .where(eq(emailLog.status, 'failed'))
    ```

### Styling Issues

1. **Inline Styles Not Applied:**
    - Ensure `EmailLayout` wraps all content
    - Verify `@react-email/tailwind` is installed
    - Check Tailwind class names are valid

2. **Rendering Differently in Clients:**
    - Test with actual email clients, not just preview
    - Some clients strip certain CSS properties
    - Stick to Tailwind utilities for compatibility

3. **Images Not Loading:**
    - Use absolute URLs for images
    - Verify image URLs are publicly accessible
    - Check image dimensions are reasonable

### Performance Issues

1. **Slow Email Sending:**
    - Emails are sent in parallel by default
    - Check Resend API response times
    - Review database logging performance

2. **Memory Issues:**
    - Email templates should be lightweight
    - Avoid including large assets
    - Use external image hosting

## Additional Resources

- **React Email Documentation:** https://react.email
- **Resend Documentation:** https://resend.com/docs
- **Tailwind CSS for Emails:** https://react.email/docs/components/tailwind
- **Email Client Compatibility:** https://www.caniemail.com

## Support

For issues or questions:

1. Check the email logs in database
2. Review Resend dashboard for delivery status
3. Check environment variable configuration
4. Verify domain and DNS settings
5. Review error messages in application logs

---

**Last Updated:** October 18, 2025
