require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  console.log("Testing Resend API Key:", process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: 'SA Thread <onboarding@resend.dev>',
    to: 'sathread@gmail.com',
    subject: 'Resend API Test',
    html: '<p>This is a test email to verify the Resend API key works.</p>'
  });

  if (error) {
    console.error("Resend API returned an error:", JSON.stringify(error, null, 2));
  } else {
    console.log("Resend email successfully dispatched! Data:", JSON.stringify(data, null, 2));
  }
}

testResend();
