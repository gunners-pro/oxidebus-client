import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("oxidebus_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const tenant = await apiRequest(
      "/tenants",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      token,
    );

    return NextResponse.json(tenant, { status: 201 });
  } catch (error) {
    console.error("Create tenant error:", error);

    return NextResponse.json(
      { message: "Failed to create tenant." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("oxidebus_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, name } = await request.json();

    const tenant = await apiRequest(
      `/tenants/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ name }),
      },
      token,
    );

    return NextResponse.json(tenant);
  } catch (error) {
    console.error("Update tenant error:", error);

    return NextResponse.json(
      { message: "Failed to update tenant." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("oxidebus_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    await apiRequest(
      `/tenants/${id}`,
      {
        method: "DELETE",
      },
      token,
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Delete tenant error:", error);

    return NextResponse.json(
      { message: "Failed to delete tenant." },
      { status: 500 },
    );
  }
}
