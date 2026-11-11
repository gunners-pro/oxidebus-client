import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";
import { ApiKeysPage } from "@/components/api-keys/api-keys-page";

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

interface TenantMembership {
  role: "OWNER" | "ADMIN" | "MEMBER";
  tenant: Tenant;
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("oxidebus_token")?.value;

  const memberships = await apiRequest<TenantMembership[]>(
    "/tenants",
    {},
    token,
  );

  return <ApiKeysPage memberships={memberships} />;
}
