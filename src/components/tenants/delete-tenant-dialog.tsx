"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteTenantDialogProps {
  tenantId: string;
  tenantName: string;
}

export function DeleteTenantDialog({
  tenantId,
  tenantName,
}: DeleteTenantDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tenants", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: tenantId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? "Failed to delete tenant.");
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm font-medium text-destructive hover:underline">
        Excluir
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir tenant</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir <strong>{tenantName}</strong>?
            Essa ação não poderá ser desfeita.
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
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir tenant"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
