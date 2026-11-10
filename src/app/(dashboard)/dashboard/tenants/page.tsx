import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateTenantDialog } from "@/components/tenants/create-tenant-dialog";
import { EditTenantDialog } from "@/components/tenants/edit-tenant-dialog";
import { DeleteTenantDialog } from "@/components/tenants/delete-tenant-dialog";

interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

interface TenantMembership {
  role: "OWNER" | "ADMIN" | "MEMBER";
  tenant: Tenant;
}

export default async function TenantsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("oxidebus_token")?.value;

  const memberships = await apiRequest<TenantMembership[]>(
    "/tenants",
    {},
    token,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tenants</h1>
          <p className="text-muted-foreground">
            Gerencie os ambientes da sua organização.
          </p>
        </div>

        <CreateTenantDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seus tenants</CardTitle>
          <CardDescription>
            Organizações às quais você tem acesso.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {memberships.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Você ainda não possui nenhum tenant.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Nome</th>
                    <th className="pb-3 font-medium">Slug</th>
                    <th className="pb-3 font-medium">Sua função</th>
                    <th className="pb-3 font-medium">Criado em</th>
                    <th className="pb-3 font-medium">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {memberships.map(({ tenant, role }) => (
                    <tr key={tenant.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">{tenant.name}</td>
                      <td className="py-4 text-muted-foreground">
                        {tenant.slug}
                      </td>
                      <td className="py-4">{role}</td>
                      <td className="py-4">
                        {new Date(tenant.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {(role === "OWNER" || role === "ADMIN") && (
                            <EditTenantDialog
                              tenantId={tenant.id}
                              tenantName={tenant.name}
                            />
                          )}

                          {role === "OWNER" && (
                            <DeleteTenantDialog
                              tenantId={tenant.id}
                              tenantName={tenant.name}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
