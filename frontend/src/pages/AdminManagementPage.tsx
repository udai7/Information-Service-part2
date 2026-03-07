import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Plus,
  MoreHorizontal,
  Shield,
  ShieldAlert,
  Lock,
  Unlock,
  Trash2,
  KeyRound,
  UserCog,
} from "lucide-react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";
import type { Admin, Department } from "../types/api";

export default function AdminManagement() {
  const { admin: currentAdmin, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "department_admin",
    departmentId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [adminsRes, deptsRes] = await Promise.all([
        apiClient.getAdmins(),
        apiClient.getDepartments(),
      ]);
      setAdmins(adminsRes.admins || []);
      setDepartments(deptsRes.departments || []);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      toast({
        title: "Validation Error",
        description: "Name, email and password are required",
        variant: "destructive",
      });
      return;
    }
    if (form.password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters with uppercase, lowercase, number and special character",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      await apiClient.register(
        form.name,
        form.email,
        form.password,
        form.role,
        form.departmentId ? parseInt(form.departmentId) : undefined,
        form.phone || undefined,
      );
      toast({ title: "Success", description: "Admin created successfully" });
      setShowCreate(false);
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "department_admin",
        departmentId: "",
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to create admin",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (admin: Admin) => {
    if (admin.id === currentAdmin?.id) return;
    try {
      await apiClient.toggleAdmin(admin.id);
      toast({
        title: "Success",
        description: `Admin ${admin.isActive ? "deactivated" : "activated"}`,
      });
      fetchData();
    } catch {
      toast({
        title: "Error",
        description: "Failed to toggle admin",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (admin: Admin) => {
    if (admin.id === currentAdmin?.id) return;
    if (!confirm(`Are you sure you want to delete ${admin.name}? This cannot be undone.`)) return;
    try {
      await apiClient.deleteAdmin(admin.id);
      toast({ title: "Success", description: "Admin deleted" });
      fetchData();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive",
      });
    }
  };

  const handleUnlock = async (admin: Admin) => {
    try {
      await apiClient.unlockAdmin(admin.id);
      toast({ title: "Success", description: "Admin account unlocked" });
      fetchData();
    } catch {
      toast({
        title: "Error",
        description: "Failed to unlock admin",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (admin: Admin) => {
    const newPassword = prompt(`Enter new password for ${admin.name}:`);
    if (!newPassword) return;
    try {
      await apiClient.resetAdminPassword(admin.id, newPassword);
      toast({ title: "Success", description: "Password reset successfully" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to reset password",
        variant: "destructive",
      });
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6 text-center">
              <ShieldAlert className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-bold">Access Denied</h2>
              <p className="text-gray-500 mt-2">
                Only Super Admins can manage administrators.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <UserCog className="h-6 w-6 text-slate-600" />
                Admin Management
              </h1>
              <p className="text-gray-500 mt-1">
                Create and manage department administrators
              </p>
            </div>
            <Dialog open={showCreate} onOpenChange={setShowCreate}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Create Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Admin</DialogTitle>
                  <DialogDescription>
                    Add a new administrator to the system
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="admin@dept.gov.in"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Min 8 chars, mixed case, number, special"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Select
                      value={form.role}
                      onValueChange={(v) => setForm({ ...form, role: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="department_admin">
                          Department Admin
                        </SelectItem>
                        <SelectItem value="super_admin">
                          Super Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.role === "department_admin" && (
                    <div className="grid gap-2">
                      <Label>Department *</Label>
                      <Select
                        value={form.departmentId}
                        onValueChange={(v) =>
                          setForm({ ...form, departmentId: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem
                              key={dept.id}
                              value={dept.id.toString()}
                            >
                              {dept.name} ({dept.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreate(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreate} disabled={saving}>
                    {saving ? "Creating..." : "Create Admin"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">
                  Total Admins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{admins.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">
                  Super Admins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-600">
                  {admins.filter((a) => a.role === "super_admin").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">
                  Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {admins.filter((a) => a.isActive).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">
                  Departments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-600">
                  {departments.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Administrators ({admins.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow
                      key={admin.id}
                      className={!admin.isActive ? "opacity-50" : ""}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {admin.role === "super_admin" ? (
                            <Shield className="h-4 w-4 text-slate-500" />
                          ) : (
                            <Users className="h-4 w-4 text-slate-500" />
                          )}
                          {admin.name}
                          {admin.id === currentAdmin?.id && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {admin.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            admin.role === "super_admin"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {admin.role === "super_admin"
                            ? "Super Admin"
                            : "Dept Admin"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {admin.department ? (
                          <Badge variant="outline">
                            {admin.department.code}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {admin.isActive ? (
                          <Badge className="bg-green-100 text-green-700">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {admin.lastLogin
                          ? new Date(admin.lastLogin).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        {admin.id !== currentAdmin?.id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleToggle(admin)}
                              >
                                {admin.isActive ? (
                                  <>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUnlock(admin)}
                              >
                                <Unlock className="mr-2 h-4 w-4" />
                                Unlock Account
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleResetPassword(admin)}
                              >
                                <KeyRound className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(admin)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {admins.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No administrators found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
