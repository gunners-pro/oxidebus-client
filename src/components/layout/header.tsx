"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/topics": "Topics",
  "/dashboard/subscriptions": "Subscriptions",
  "/dashboard/messages": "Messages",
  "/dashboard/api-keys": "API Keys",
  "/dashboard/usage": "Usage & Metrics",
  "/dashboard/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <p className="text-xs text-muted-foreground">Workspace / {title}</p>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bell className="size-5" />
      </button>
    </header>
  );
}
