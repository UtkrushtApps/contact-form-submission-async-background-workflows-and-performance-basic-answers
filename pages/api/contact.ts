import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  ok: true;
}

// Simulated email sending function (non-blocking)
async function sendEmailInBackground(payload: ContactFormPayload) {
  // Here you could enqueue to a queue system or call a background worker. We'll simulate async work.
  // Do not block the API response!
  setTimeout(() => {
    // Simulate logging/sending email
    // In reality integrate with a service here.
    // eslint-disable-next-line no-console
    console.log('Contact email sent', payload);
  }, 0);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body as ContactFormPayload;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Fire off background work (not blocking API response)
    sendEmailInBackground({ name, email, message });
    // Immediately respond to client
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process request.' });
  }
}
