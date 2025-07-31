import React, { useState } from 'react';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  message: '',
};

const ContactForm: React.FC<ContactFormProps> = () => {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      } else {
        setForm(initialFormState);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(
        err?.message || 'Something went wrong while submitting the form.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-busy={loading}>
      {success && (
        <div style={{ color: 'green', marginBottom: 8 }}>
          Your message has been sent. Thank you!
        </div>
      )}
      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
      )}
      <div>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            disabled={loading}
            required
            rows={5}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
