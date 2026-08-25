import { Resend } from 'resend'

// ✅ Read all configuration from environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@goldenlampleadershipinitiativeafrica.org'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'
const URL =  'https://golden-lamp-leadership-initiative-a.vercel.app/'

// ✅ Only initialize Resend if API key exists
if (!RESEND_API_KEY) {
  console.warn('⚠️ RESEND_API_KEY is not set in environment variables. Email sending will fail.')
}

const resend = new Resend(RESEND_API_KEY)

export async function sendAdminNotification(formData: any, trainingTitle: string, responses: any[]) {
  const fields = Object.keys(formData)
  
  // Build email body
  let detailsHtml = ''
  let detailsText = ''
  
  for (const field of fields) {
    const value = formData[field] || 'Not provided'
    detailsHtml += `<p><strong>${field}:</strong> ${value}</p>`
    detailsText += `${field}: ${value}\n`
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f5ee; border-radius: 12px;">
      <div style="background: #092b58; color: white; padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">📋 New Registration!</h1>
        <p style="margin: 4px 0 0; opacity: 0.8;">${trainingTitle}</p>
      </div>
      
      <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px;">
        <h3 style="margin-top: 0; color: #092b58;">Registration Details</h3>
        ${detailsHtml}
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e7e4dd;">
          <p style="font-size: 13px; color: #667286;">
            📊 Total Responses: ${responses.length + 1}
          </p>
          <a href="${URL}/admin/trainings" 
             style="display: inline-block; padding: 10px 20px; background: #c89b3c; color: #092b58; text-decoration: none; border-radius: 6px; font-weight: 600;">
            View All Responses →
          </a>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e7e4dd; font-size: 12px; color: #667286;">
          <p style="margin: 0;">Golden Lamp Leadership Initiative Africa</p>
          <p style="margin: 4px 0 0;">${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  `

  const text = `
📋 New Registration!

Training: ${trainingTitle}

Registration Details:
${detailsText}

---
Total Responses: ${responses.length + 1}

Golden Lamp Leadership Initiative Africa
${new Date().toLocaleString()}
  `

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📋 New Registration: ${trainingTitle}`,
      html,
      text,
    })
    
    console.log('Admin email sent:', result)
    return { success: true }
  } catch (error) {
    console.error('Admin email error:', error)
    return { success: false, error }
  }
}

export async function sendUserConfirmation(formData: any, trainingTitle: string, userEmail: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f5ee; border-radius: 12px;">
      <div style="background: #092b58; color: white; padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">✅ Registration Confirmed!</h1>
        <p style="margin: 4px 0 0; opacity: 0.8;">${trainingTitle}</p>
      </div>
      
      <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px;">Dear ${formData['Full Name'] || formData['Name'] || formData['fullName'] || 'Participant'},</p>
        <p style="font-size: 14px; color: #333; line-height: 1.6;">
          Thank you for registering for <strong>${trainingTitle}</strong>.
        </p>
        
        <div style="background: #f8f5ee; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4 style="margin: 0 0 8px; color: #092b58;">Your Registration Details:</h4>
          ${Object.keys(formData).map(key => 
            `<p style="margin: 4px 0; font-size: 13px;"><strong>${key}:</strong> ${formData[key]}</p>`
          ).join('')}
        </div>
        
        <p style="font-size: 14px; color: #333; line-height: 1.6;">
          We will contact you soon with more information about the training.
        </p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e7e4dd;">
          <p style="font-size: 12px; color: #667286; margin: 0;">
            If you have any questions, please contact us at:<br>
            <a href="mailto:${ADMIN_EMAIL}" style="color: #c89b3c; text-decoration: none;">${ADMIN_EMAIL}</a>
          </p>
        </div>
        
        <div style="margin-top: 12px; font-size: 12px; color: #667286;">
          <p style="margin: 0;">Golden Lamp Leadership Initiative Africa</p>
          <p style="margin: 4px 0 0;">${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  `

  const text = `
✅ Registration Confirmed!

Training: ${trainingTitle}

Dear ${formData['Full Name'] || formData['Name'] || formData['fullName'] || 'Participant'},

Thank you for registering for ${trainingTitle}.

Your Registration Details:
${Object.keys(formData).map(key => `${key}: ${formData[key]}`).join('\n')}

We will contact you soon with more information.

---
Golden Lamp Leadership Initiative Africa
${new Date().toLocaleString()}
  `

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `✅ Registration Confirmed: ${trainingTitle}`,
      html,
      text,
    })
    
    console.log('User confirmation email sent:', result)
    return { success: true }
  } catch (error) {
    console.error('User confirmation email error:', error)
    return { success: false, error }
  }
}

// Test function to verify email is working
export async function sendTestEmail() {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'Hello from GLLIA!',
      html: '<p>Congrats on sending your <strong>first email</strong> from GLLIA!</p>'
    })
    
    console.log('Test email sent:', result)
    return { success: true }
  } catch (error) {
    console.error('Test email error:', error)
    return { success: false, error }
  }
}