const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables.");
}

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? `API request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}
