"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreateApiKeyDialog } from "./create-api-key-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RevokeApiKeyDialog } from "./revoke-api-key-dialog";

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

interface TenantMembership {
  role: "OWNER" | "ADMIN" | "MEMBER";
  tenant: Tenant;
}

interface ApiKeysPageProps {
  memberships: TenantMembership[];
}

interface ApiKey {
  id: string;
  name: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export function ApiKeysPage({ memberships }: ApiKeysPageProps) {
  const [tenantId, setTenantId] = useState("");
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) return;
    const controller = new AbortController();

    async function loadApiKeys() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/tenants/${tenantId}/api-keys`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load API Keys.");
        }

        setApiKeys(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadApiKeys();

    return () => controller.abort();
  }, [tenantId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">API Keys</h1>
        <p className="text-muted-foreground">
          Gerencie as credenciais de acesso ao OxideBus.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selecione um tenant</CardTitle>
          <CardDescription>
            As API Keys são vinculadas a um tenant específico.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="max-w-sm space-y-2">
            <Label htmlFor="tenant">Tenant</Label>

            <select
              id="tenant"
              value={tenantId}
              onChange={(event) => {
                setTenantId(event.target.value);
                setApiKeys([]);
                setError("");
              }}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Selecione um tenant</option>

              {memberships.map(({ tenant }) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {tenantId && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Suas API Keys</CardTitle>
                <CardDescription>
                  Credenciais vinculadas ao tenant selecionado.
                </CardDescription>
              </div>

              <CreateApiKeyDialog
                tenantId={tenantId}
                onCreated={(apiKey) => {
                  setApiKeys((current) => [apiKey, ...current]);
                  setCreatedKey(apiKey.key);
                }}
              />
            </div>
          </CardHeader>

          <CardContent>
            {loading && <p>Carregando API Keys...</p>}

            {error && <p className="text-sm text-destructive">{error}</p>}

            {!loading && !error && apiKeys.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhuma API Key encontrada.
              </p>
            )}

            {!loading && apiKeys.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3">Nome</th>
                      <th className="pb-3">Criada em</th>
                      <th className="pb-3">Último uso</th>
                      <th className="pb-3">Expiração</th>
                      <th className="pb-3">Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} className="border-b last:border-0">
                        <td className="py-4 font-medium">{key.name}</td>
                        <td className="py-4">
                          {new Date(key.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-4">
                          {key.lastUsedAt
                            ? new Date(key.lastUsedAt).toLocaleDateString(
                                "pt-BR",
                              )
                            : "Nunca utilizada"}
                        </td>
                        <td className="py-4">
                          {key.expiresAt
                            ? new Date(key.expiresAt).toLocaleDateString(
                                "pt-BR",
                              )
                            : "Nunca"}
                        </td>
                        <td className="py-4">
                          <RevokeApiKeyDialog
                            tenantId={tenantId}
                            apiKeyId={key.id}
                            apiKeyName={key.name}
                            onRevoked={(id) => {
                              setApiKeys((current) =>
                                current.filter((key) => key.id !== id),
                              );
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {createdKey && (
        <Card>
          <CardHeader>
            <CardTitle>API Key criada!</CardTitle>
            <CardDescription>
              Copie sua chave agora. Ela não poderá ser consultada novamente.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-center gap-2">
            <Input value={createdKey} readOnly />

            <Button onClick={() => navigator.clipboard.writeText(createdKey)}>
              Copiar
            </Button>

            <Button variant="outline" onClick={() => setCreatedKey(null)}>
              Fechar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
