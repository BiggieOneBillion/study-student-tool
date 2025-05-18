
async function generateContent(
  apiKey: string,
): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch('/api/ai/verify-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
    return { status: false, message: "Network Error" };
  }
}

export default generateContent;
