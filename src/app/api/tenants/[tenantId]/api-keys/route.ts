import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";

interface RouteContext {
  params: Promise<{ tenantId: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { tenantId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("oxidebus_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const apiKeys = await apiRequest(
      `/tenants/${tenantId}/api-keys`,
      {},
      token,
    );

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error("List API keys error:", error);

    return NextResponse.json(
      { message: "Failed to list API keys." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { tenantId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("oxidebus_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const apiKey = await apiRequest(
      `/tenants/${tenantId}/api-keys`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      token,
    );

    return NextResponse.json(apiKey, { status: 201 });
  } catch (error) {
    console.error("Create API key error:", error);

    return NextResponse.json(
      { message: "Failed to create API Key." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { tenantId } = await params;
    const { apiKeyId } = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("oxidebus_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await apiRequest(
      `/tenants/${tenantId}/api-keys/${apiKeyId}`,
      { method: "DELETE" },
      token,
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("API key deletion error:", error);

    return NextResponse.json(
      { message: "Failed to revoke API key" },
      { status: 500 },
    );
  }
}
