import { randomUUID } from 'node:crypto';
import { Resend } from 'resend';

const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = process.env;

if (!RESEND_API_KEY || !EMAIL_TO) {
  console.error('Set RESEND_API_KEY and EMAIL_TO in .env (see .env.example).');
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

// Until your own domain is verified, Resend only lets onboarding@resend.dev
// send to the email address on your Resend account.
const from = EMAIL_FROM || 'Resend Test <onboarding@resend.dev>';

const { data, error } = await resend.emails.send(
  {
    from,
    to: [EMAIL_TO],
    subject: 'Hello from Resend',
    html: '<p>It works! This email was sent with <strong>Resend</strong>.</p>',
    text: 'It works! This email was sent with Resend.',
  },
  // Lets Resend drop a duplicate if this exact request is retried.
  { idempotencyKey: `test-email/${randomUUID()}` },
);

if (error) {
  console.error('Send failed:', error);
  process.exit(1);
}

console.log('Sent. Email ID:', data.id);
