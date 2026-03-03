/**
 * Fetch wrapper for POST /api/session.
 */
export async function buildSession({ muscles, deviation, minutes, equipment }) {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ muscles, deviation, minutes, equipment })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to generate session');
  }

  return data;
}
