"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RevokeApiKeyDialogProps {
  tenantId: string;
  apiKeyId: string;
  apiKeyName: string;
  onRevoked: (id: string) => void;
}

export function RevokeApiKeyDialog({
  tenantId,
  apiKeyId,
  apiKeyName,
  onRevoked,
}: RevokeApiKeyDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRevoke() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/tenants/${tenantId}/api-keys`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKeyId }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível revogar a API key.");
      }

      onRevoked(apiKeyId);
      setOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm text-destructive hover:underline">
        Revogar
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revogar API key?</DialogTitle>
          <DialogDescription>
            A chave <strong>{apiKeyName}</strong> deixará de funcionar
            imediatamente. Essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            variant="destructive"
            onClick={handleRevoke}
            disabled={loading}
          >
            {loading ? "Revogando..." : "Revogar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
