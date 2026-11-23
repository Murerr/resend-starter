# Resend starter

A minimal Node.js project that sends one test email with [Resend](https://resend.com).

## Requirements

- Node.js 20.6 or newer (for `--env-file`)
- A Resend account

## Setup

1. Create an API key at <https://resend.com/api-keys>. "Sending access" is enough.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy the example env file and fill it in:

   ```sh
   cp .env.example .env
   ```

   - `RESEND_API_KEY`: your new key
   - `EMAIL_TO`: the email address on your Resend account (until your domain is verified, test emails can only go there)
   - `EMAIL_FROM`: leave blank for now

4. Send a test email:

   ```sh
   npm run send
   ```

   You should see `Sent. Email ID: ...`, and the email should show up in your inbox and under Emails in the Resend dashboard.

## Sending from your own domain

1. Add a domain under Domains in Resend. A subdomain such as `mail.yourdomain.com` is recommended.
2. Add the DNS records Resend shows you (SPF, DKIM and, if you don't have one yet, DMARC) at your DNS provider.
3. Once the domain shows as verified, set `EMAIL_FROM="Your Name <hello@mail.yourdomain.com>"` in `.env`. You can then send to any address.

## Keeping the key safe

- `.env` is in `.gitignore`. Keep it that way.
- Never paste API keys into chats, tickets or code. If one gets out, revoke it in the dashboard and create a new one.
