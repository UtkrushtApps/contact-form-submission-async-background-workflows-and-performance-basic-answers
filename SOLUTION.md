# Solution Steps

1. Define TypeScript interfaces for contact form state and API payload in both client and server files for strong typing.

2. Refactor the client-side component (ContactForm.tsx) to use useState with proper types for form data, loading, error, and success states.

3. Update the input and textarea elements to be controlled and type-safe, with proper handlers for input changes.

4. Refactor the form submission logic to POST data to /api/contact using fetch, handling loading, error, and success states asynchronously.

5. Create an API route at pages/api/contact.ts that validates input, responds immediately, and runs email sending (simulated) in the background asynchronously without blocking the response.

6. Simulate the email sending background work by using setTimeout in the API handler, so that work does not delay the API's response.

7. Update the contact page (pages/contact.tsx) to display the ContactForm component.

8. Test to ensure that form submission is fast for the user, errors are surfaced, and TypeScript errors are removed.

