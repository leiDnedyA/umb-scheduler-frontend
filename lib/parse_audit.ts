
export async function parseAudit(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/parse_audit', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
