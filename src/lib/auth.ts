import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/api";

interface AuthenticatedUser {
  userId: string;
  email: string;
}

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get("oxidebus_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    return await apiRequest<AuthenticatedUser>("/users/me", {}, token);
  } catch {
    redirect("/login");
  }
}
