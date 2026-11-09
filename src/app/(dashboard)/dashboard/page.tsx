import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Mail, Network, GitBranch, Activity } from "lucide-react";

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

const recentMessages = [
  {
    id: "msg_001",
    topic: "orders.created",
    status: "Published",
    publishedAt: "Nov 08, 2026 10:42",
  },
  {
    id: "msg_002",
    topic: "payments.processed",
    status: "Pending",
    publishedAt: "Nov 08, 2026 10:38",
  },
  {
    id: "msg_003",
    topic: "users.registered",
    status: "Published",
    publishedAt: "Nov 08, 2026 10:30",
  },
  {
    id: "msg_004",
    topic: "orders.cancelled",
    status: "Failed",
    publishedAt: "Nov 08, 2026 10:25",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
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
                <div className="text-2xl font-bold">{metric.value}</div>

                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <RecentMessages />
    </div>
  );
}

function RecentMessages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your latest published messages.
        </p>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Message ID</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-mono text-xs">
                  {message.id}
                </TableCell>

                <TableCell>{message.topic}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      message.status === "Published"
                        ? "default"
                        : message.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {message.status}
                  </Badge>
                </TableCell>

                <TableCell>{message.publishedAt}</TableCell>

                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
