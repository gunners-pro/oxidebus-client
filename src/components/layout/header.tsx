"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/topics": "Topics",
  "/dashboard/subscriptions": "Subscriptions",
  "/dashboard/messages": "Messages",
  "/dashboard/api-keys": "API Keys",
  "/dashboard/usage": "Usage & Metrics",
  "/dashboard/settings": "Settings",
};

interface HeaderProps {
  userEmail: string;
}

export function Header({ userEmail }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const title = pageTitles[pathname] ?? "Dashboard";

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <p className="text-xs text-muted-foreground">Workspace / {title}</p>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{userEmail}</span>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-5" />
        </button>
      </div>
    </header>
  );
}
