"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Network,
  GitBranch,
  Mail,
  KeyRound,
  ChartNoAxesCombined,
  Settings,
  Layers,
} from "lucide-react";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Topics", href: "/dashboard/topics", icon: Network },
      {
        label: "Subscriptions",
        href: "/dashboard/subscriptions",
        icon: GitBranch,
      },
      { label: "Messages", href: "/dashboard/messages", icon: Mail },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "API Keys", href: "/dashboard/api-keys", icon: KeyRound },
      {
        label: "Usage & Metrics",
        href: "/dashboard/usage",
        icon: ChartNoAxesCombined,
      },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Layers className="size-6 text-primary" />
        <span className="text-lg font-bold">OxideBus</span>
      </div>

      <nav className="flex-1 space-y-6 px-3 py-6">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(`${item.href}/`));

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t p-4 text-xs text-muted-foreground">
        OxideBus Client
      </div>
    </aside>
  );
}
