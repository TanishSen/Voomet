// Backend: Email notification using Nodemailer
import nodemailer from 'nodemailer'

// Create reusable transporter
let transporter = null

function getTransporter() {
  if (transporter) return transporter

  // Use environment variables for email config
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.warn('SMTP credentials not configured. Emails will not be sent.')
    return null
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  return transporter
}

export async function sendLeadNotification(lead) {
  const transport = getTransporter()
  if (!transport) {
    console.log('Email skipped: SMTP not configured')
    return { sent: false, reason: 'SMTP not configured' }
  }

  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'info@voomet.com'
  const fromEmail = process.env.SMTP_USER || 'noreply@voomet.com'

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #171717; border-bottom: 2px solid #171717; padding-bottom: 10px;">
        🎉 New Lead Received
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 140px;">Name</td>
          <td style="padding: 12px; background: #fafafa;">${lead.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Phone</td>
          <td style="padding: 12px; background: #fafafa;">
            <a href="tel:${lead.phone}" style="color: #171717;">${lead.phone}</a>
          </td>
        </tr>
        ${lead.email ? `
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Email</td>
          <td style="padding: 12px; background: #fafafa;">
            <a href="mailto:${lead.email}" style="color: #171717;">${lead.email}</a>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Requirement</td>
          <td style="padding: 12px; background: #fafafa;">${lead.requirement || 'Not specified'}</td>
        </tr>
        ${lead.area ? `
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Area</td>
          <td style="padding: 12px; background: #fafafa;">${lead.area}</td>
        </tr>
        ` : ''}
        ${lead.message ? `
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Message</td>
          <td style="padding: 12px; background: #fafafa;">${lead.message}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Source</td>
          <td style="padding: 12px; background: #fafafa;">${lead.source || 'website'}</td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">Received At</td>
          <td style="padding: 12px; background: #fafafa;">${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #171717; border-radius: 8px; text-align: center;">
        <a href="tel:${lead.phone}" style="color: white; text-decoration: none; font-weight: bold;">
          📞 Call ${lead.name} Now
        </a>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #737373;">
        This is an automated notification from Voomet website.
      </p>
    </div>
  `

  try {
    await transport.sendMail({
      from: `"Voomet Leads" <${fromEmail}>`,
      to: toEmail,
      subject: `🎯 New Lead: ${lead.name} — ${lead.requirement || 'General Enquiry'}`,
      html: emailHtml,
      text: `New Lead Received\n\nName: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || 'N/A'}\nRequirement: ${lead.requirement || 'N/A'}\nArea: ${lead.area || 'N/A'}\nMessage: ${lead.message || 'N/A'}\nSource: ${lead.source || 'website'}\nReceived: ${lead.createdAt}`,
    })
    console.log(`Lead notification sent to ${toEmail}`)
    return { sent: true }
  } catch (err) {
    console.error('Failed to send lead notification:', err.message)
    return { sent: false, reason: err.message }
  }
}
