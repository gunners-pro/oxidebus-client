import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Mail,
  Network,
  GitBranch,
  Activity,
} from "lucide-react";

const metrics = [
  {
    title: "Total Messages",
    value: "24,580",
    description: "Messages published",
    icon: Mail,
  },
  {
    title: "Active Topics",
    value: "12",
    description: "Topics registered",
    icon: Network,
  },
  {
    title: "Subscriptions",
    value: "18",
    description: "Active subscriptions",
    icon: GitBranch,
  },
  {
    title: "Active Connections",
    value: "8",
    description: "Connected clients",
    icon: Activity,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Overview
        </h2>
        <p className="text-muted-foreground">
          Monitor your messaging activity and resources.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>

                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value}
                </div>

                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
