"use client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ConfigFormProps {
  vps: any;
  open: boolean;
  onClose: () => void;
}

export function ConfigForm({ vps, open, onClose }: ConfigFormProps) {
  const [config, setConfig] = useState({
    name: vps.name,
    cpu: vps.cpu,
    ram: vps.ram,
    storage: vps.storage,
    bandwidth: vps.bandwidth,
    os: "Ubuntu 22.04",
    autoBackup: true,
    firewallEnabled: true,
    monitoringEnabled: true,
    sshKeys: "",
    customScript: "",
  });

  const handleSave = () => {
    console.log("Saving configuration:", config);
    // Here you would typically send the config to your API
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto bg-black">
        <DialogHeader>
          <DialogTitle>Configure {vps.name}</DialogTitle>
          <DialogDescription>
            Modify the configuration settings for your VPS instance
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800 p-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Configure basic VPS settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">VPS Name</Label>
                    <Input
                      id="name"
                      value={config.name}
                      onChange={(e) =>
                        setConfig({ ...config, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select defaultValue={vps.location}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Tokyo">Tokyo</SelectItem>
                        <SelectItem value="London">London</SelectItem>
                        <SelectItem value="Frankfurt">Frankfurt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="os">Operating System</Label>
                  <Select
                    value={config.os}
                    onValueChange={(value) =>
                      setConfig({ ...config, os: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ubuntu 22.04">
                        Ubuntu 22.04 LTS
                      </SelectItem>
                      <SelectItem value="Ubuntu 20.04">
                        Ubuntu 20.04 LTS
                      </SelectItem>
                      <SelectItem value="CentOS 8">CentOS 8</SelectItem>
                      <SelectItem value="Debian 11">Debian 11</SelectItem>
                      <SelectItem value="Windows Server 2022">
                        Windows Server 2022
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-backup"
                    checked={config.autoBackup}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, autoBackup: checked })
                    }
                  />
                  <Label htmlFor="auto-backup">
                    Enable automatic daily backups
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>
                  Configure CPU, RAM, and storage resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpu">CPU Cores</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 vCPU</SelectItem>
                        <SelectItem value="2">2 vCPU</SelectItem>
                        <SelectItem value="4">4 vCPU</SelectItem>
                        <SelectItem value="8">8 vCPU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ram">RAM</Label>
                    <Select defaultValue="4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1GB</SelectItem>
                        <SelectItem value="2">2GB</SelectItem>
                        <SelectItem value="4">4GB</SelectItem>
                        <SelectItem value="8">8GB</SelectItem>
                        <SelectItem value="16">16GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storage">Storage</Label>
                    <Select defaultValue="80">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20">20GB SSD</SelectItem>
                        <SelectItem value="40">40GB SSD</SelectItem>
                        <SelectItem value="80">80GB SSD</SelectItem>
                        <SelectItem value="160">160GB SSD</SelectItem>
                        <SelectItem value="320">320GB SSD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bandwidth">Bandwidth</Label>
                    <Select defaultValue="1000">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200">200GB</SelectItem>
                        <SelectItem value="500">500GB</SelectItem>
                        <SelectItem value="1000">1TB</SelectItem>
                        <SelectItem value="2000">2TB</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="mb-2 font-medium">Current Usage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>CPU Usage:</span>
                      <Badge variant="outline">{vps.cpuUsage}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM Usage:</span>
                      <Badge variant="outline">{vps.ramUsage}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Disk Usage:</span>
                      <Badge variant="outline">{vps.diskUsage}%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure firewall and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="firewall"
                    checked={config.firewallEnabled}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, firewallEnabled: checked })
                    }
                  />
                  <Label htmlFor="firewall">Enable firewall protection</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="monitoring"
                    checked={config.monitoringEnabled}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, monitoringEnabled: checked })
                    }
                  />
                  <Label htmlFor="monitoring">Enable security monitoring</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssh-keys">SSH Public Keys</Label>
                  <Textarea
                    id="ssh-keys"
                    placeholder="Paste your SSH public keys here (one per line)"
                    value={config.sshKeys}
                    onChange={(e) =>
                      setConfig({ ...config, sshKeys: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="mb-2 font-medium">Security Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Firewall:</span>
                      <Badge
                        variant={
                          config.firewallEnabled ? "default" : "destructive"
                        }
                      >
                        {config.firewallEnabled ? "Active" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>SSH Keys:</span>
                      <Badge variant="outline">
                        {config.sshKeys ? "Configured" : "Not Set"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Configuration</CardTitle>
                <CardDescription>
                  Custom scripts and advanced settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-script">Custom Startup Script</Label>
                  <Textarea
                    id="custom-script"
                    placeholder="#!/bin/bash&#10;# Add your custom startup script here"
                    value={config.customScript}
                    onChange={(e) =>
                      setConfig({ ...config, customScript: e.target.value })
                    }
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h4 className="mb-2 font-medium text-yellow-800">
                    ⚠️ Warning
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Custom scripts run with root privileges. Please ensure your
                    scripts are secure and tested.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
