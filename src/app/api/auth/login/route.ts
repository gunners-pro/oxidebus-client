import { NextResponse } from "next/server";
import { apiRequest } from "@/lib/api";

interface LoginResponse {
  accessToken: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const data = await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set("oxidebus_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Invalid credentials." },
      { status: 401 },
    );
  }
}
