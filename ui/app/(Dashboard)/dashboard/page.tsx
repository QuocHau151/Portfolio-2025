"use client";

import {
  Edit,
  HardDrive,
  MemoryStick,
  MoreHorizontal,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ConfigForm } from "@/components/layout/dashboard/config-form";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserProductQuery } from "@/queries/useProduct";

function StatusBadge({ status }: { status: string }) {
  const variants = {
    ACTIVE: "bg-green-100 text-green-800",
    RUNNING: "bg-green-100 text-green-800",
    INACTIVE: "bg-red-100 text-red-800",
    STOPPED: "bg-red-100 text-red-800",
    PENDING: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Badge
      className={
        variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
      }
    >
      {status}
    </Badge>
  );
}

function VPSActions({
  vps,
  onAction,
}: {
  vps: any;
  onAction: (action: string, id: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {vps.VPSResource[0]?.status === "RUNNING" ? (
          <DropdownMenuItem onClick={() => onAction("stop", vps.id.toString())}>
            <Square className="mr-2 h-4 w-4" />
            Stop
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onAction("start", vps.id.toString())}
          >
            <Play className="mr-2 h-4 w-4" />
            Start
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => onAction("restart", vps.id.toString())}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAction("config", vps.id.toString())}>
          <Edit className="mr-2 h-4 w-4" />
          Configure
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Dashboard() {
  const [selectedVPS, setSelectedVPS] = useState<any>(null);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const getVpsData = useGetUserProductQuery();
  const vpsData = (getVpsData.data?.payload as any)?.data;

  const handleVPSAction = (action: string, id: string) => {
    const vps = vpsData?.find((v: any) => v.id.toString() === id);

    switch (action) {
      case "start":
        console.log(`Starting VPS ${id}`);
        break;
      case "stop":
        console.log(`Stopping VPS ${id}`);
        break;
      case "restart":
        console.log(`Restarting VPS ${id}`);
        break;
      case "config":
        setSelectedVPS(vps);
        setShowConfigForm(true);
        break;
      case "view":
        console.log(`Viewing details for ${id}`);
        break;
    }
  };
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="flex-1">
          <main className="flex-1 space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total VPS
                  </CardTitle>
                  <HardDrive className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vpsData?.length}</div>
                  <p className="text-muted-foreground text-xs">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Proxy
                  </CardTitle>
                  <HardDrive className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-muted-foreground text-xs">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Hosting
                  </CardTitle>
                  <HardDrive className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-muted-foreground text-xs">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total VPN
                  </CardTitle>
                  <HardDrive className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-muted-foreground text-xs">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-neutral-800 p-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vps">VPS Management</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {vpsData?.map((vps: any) => (
                    <Card key={vps.id} className="border">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <CardTitle className="text-base">
                            {vps.productName}
                          </CardTitle>
                          <CardDescription>VPS • ID: {vps.id}</CardDescription>
                        </div>
                        <StatusBadge
                          status={vps.VPSResource[0]?.status || vps.status}
                        />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>IP:</span>
                            <span className="font-mono">
                              {vps.VPSResource[0]?.ipAddress}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Expires:</span>
                            <span>
                              {new Date(vps.expiresAt).toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>CPU</span>
                              <span>{vps.options.cpu} vCPU</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {/* CPU Usage */}
                            <div className="flex justify-between text-sm">
                              <span>CPU Usage</span>
                              <span>%</span>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>

                          <div className="space-y-1">
                            {/* RAM Usage */}
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <MemoryStick className="h-4 w-4" />
                                <span>RAM Usage</span>
                              </div>
                              <span>30%</span>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>

                          <div className="space-y-1">
                            {/* Disk Usage */}
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4" />
                                <span>Disk Usage</span>
                              </div>
                              <span>{30}%</span>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          {vps.VPSResource[0]?.status === "RUNNING" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleVPSAction("stop", vps.id.toString())
                              }
                            >
                              <Square className="mr-1 h-3 w-3" />
                              Stop
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleVPSAction("start", vps.id.toString())
                              }
                            >
                              <Play className="mr-1 h-3 w-3" />
                              Start
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleVPSAction("restart", vps.id.toString())
                            }
                          >
                            <RotateCcw className="mr-1 h-3 w-3" />
                            Restart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vps" className="space-y-4 rounded-xl border">
                <Card>
                  <CardHeader>
                    <CardTitle>VPS Services</CardTitle>
                    <CardDescription>
                      Manage all your VPS, VPN, and Proxy services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Resources</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vpsData?.map((vps: any) => (
                          <TableRow key={vps.id}>
                            <TableCell className="font-medium">
                              {vps.productName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">VPS</Badge>
                            </TableCell>
                            <TableCell>
                              <StatusBadge
                                status={
                                  vps.VPSResource[0]?.status || vps.status
                                }
                              />
                            </TableCell>
                            <TableCell className="font-mono">
                              {vps.VPSResource[0]?.ipAddress}
                            </TableCell>
                            <TableCell>ID: {vps.id}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>
                                  {vps.options.cpu} vCPU • {vps.options.ram}GB
                                  RAM
                                </div>
                                <div className="text-muted-foreground">
                                  {vps.options.rom}GB Storage
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <VPSActions
                                vps={vps}
                                onAction={handleVPSAction}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {showConfigForm && selectedVPS && (
        <ConfigForm
          vps={selectedVPS}
          open={showConfigForm}
          onClose={() => {
            setShowConfigForm(false);
            setSelectedVPS(null);
          }}
        />
      )}
    </SidebarProvider>
  );
}
