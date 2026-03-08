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
import { Checkbox } from "@/components/ui/checkbox";
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Edit,
  AlertTriangle,
} from "lucide-react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";
import type { Admin, Department } from "../types/api";

const AVAILABLE_SERVICES = [
  { key: "schemes", label: "Scheme Services" },
  { key: "certificates", label: "Certificate Services" },
  { key: "contacts", label: "Contact Services" },
  { key: "grievances", label: "Grievances" },
  { key: "feedback", label: "Feedback" },
];

export default function AdminManagement() {
  const { admin: currentAdmin, isSuperAdmin, isDepartmentAdmin } = useAuth();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Admin | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: isDepartmentAdmin ? "individual_admin" : "department_admin",
    departmentId: "",
    assignedServices: [] as string[],
  });

  useEffect(() => {
    fetchData(true);
  }, []);

  const fetchData = async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const [adminsRes, deptsRes] = await Promise.all([
        apiClient.getAdmins(),
        isSuperAdmin ? apiClient.getDepartments() : Promise.resolve({ departments: [] }),
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
      if (showSpinner) setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: isDepartmentAdmin ? "individual_admin" : "department_admin",
      departmentId: "",
      assignedServices: [],
    });
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
        description:
          "Password must be at least 8 characters with uppercase, lowercase, number and special character",
        variant: "destructive",
      });
      return;
    }
    if (form.role === "individual_admin" && form.assignedServices.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please assign at least one service to the individual admin",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      await apiClient.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        departmentId: form.departmentId ? parseInt(form.departmentId) : undefined,
        phone: form.phone || undefined,
        assignedServices: form.role === "individual_admin" ? form.assignedServices : undefined,
      });
      toast({ title: "Success", description: "Admin created successfully" });
      setShowCreate(false);
      resetForm();
      fetchData(false);
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

  const openEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
      phone: admin.phone || "",
      role: admin.role,
      departmentId: admin.departmentId?.toString() || "",
      assignedServices: admin.assignedServices || [],
    });
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    if (!editingAdmin) return;
    if (!form.name) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      const updateData: any = {
        name: form.name,
        phone: form.phone || undefined,
      };
      if (editingAdmin.role === "individual_admin") {
        updateData.assignedServices = form.assignedServices;
      }
      await apiClient.updateAdmin(editingAdmin.id, updateData);
      toast({ title: "Success", description: "Admin updated successfully" });
      setShowEdit(false);
      setEditingAdmin(null);
      resetForm();
      fetchData(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to update admin",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (admin: Admin) => {
    if (admin.id === currentAdmin?.id) return;
    // Optimistic update
    setAdmins((prev) =>
      prev.map((a) => (a.id === admin.id ? { ...a, isActive: !a.isActive } : a))
    );
    try {
      await apiClient.toggleAdmin(admin.id);
      toast({
        title: "Success",
        description: `Admin ${admin.isActive ? "deactivated" : "activated"}`,
      });
    } catch {
      // Revert on failure
      setAdmins((prev) =>
        prev.map((a) => (a.id === admin.id ? { ...a, isActive: admin.isActive } : a))
      );
      toast({
        title: "Error",
        description: "Failed to toggle admin",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (admin: Admin) => {
    if (admin.id === currentAdmin?.id) return;
    setDeleteTarget(admin);
  };

  const confirmDeleteAdmin = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiClient.deleteAdmin(deleteTarget.id);
      setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      toast({ title: "Success", description: "Admin deleted" });
      setDeleteTarget(null);
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleUnlock = async (admin: Admin) => {
    try {
      await apiClient.unlockAdmin(admin.id);
      // Update in-place
      setAdmins((prev) =>
        prev.map((a) => (a.id === admin.id ? { ...a, loginAttempts: 0, lockedUntil: null } : a))
      );
      toast({ title: "Success", description: "Admin account unlocked" });
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

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      assignedServices: prev.assignedServices.includes(service)
        ? prev.assignedServices.filter((s) => s !== service)
        : [...prev.assignedServices, service],
    }));
  };

  // Access check: only super_admin and department_admin can manage admins
  if (!isSuperAdmin && !isDepartmentAdmin) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6 text-center">
              <ShieldAlert className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-bold">Access Denied</h2>
              <p className="text-gray-500 mt-2">
                You don't have permission to manage administrators.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "department_admin":
        return "Dept Admin";
      case "individual_admin":
        return "Individual Admin";
      default:
        return role;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "default" as const;
      case "department_admin":
        return "secondary" as const;
      case "individual_admin":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <UserCog className="h-6 w-6 text-teal-600" />
                Admin Management
              </h1>
              <p className="text-gray-500 mt-1">
                {isDepartmentAdmin
                  ? "Create and manage individual administrators for your department"
                  : "Create and manage all administrators"}
              </p>
            </div>
            <Dialog open={showCreate} onOpenChange={(open) => { setShowCreate(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />{" "}
                  {isDepartmentAdmin ? "Create Individual Admin" : "Create Admin"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {isDepartmentAdmin ? "Create Individual Admin" : "Create New Admin"}
                  </DialogTitle>
                  <DialogDescription>
                    {isDepartmentAdmin
                      ? "Add a new individual administrator and assign services"
                      : "Add a new administrator to the system"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
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

                  {/* Role Selection - Only show for SuperAdmin */}
                  {isSuperAdmin && (
                    <div className="grid gap-2">
                      <Label>Role</Label>
                      <Select
                        value={form.role}
                        onValueChange={(v) =>
                          setForm({ ...form, role: v, assignedServices: [] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="department_admin">
                            Department Admin
                          </SelectItem>
                          <SelectItem value="individual_admin">
                            Individual Admin
                          </SelectItem>
                          <SelectItem value="super_admin">
                            Super Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Department Selection - Only for Super Admin creating dept/individual admins */}
                  {isSuperAdmin &&
                    (form.role === "department_admin" || form.role === "individual_admin") && (
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

                  {/* Service Assignment - for individual_admin */}
                  {form.role === "individual_admin" && (
                    <div className="grid gap-2">
                      <Label>Assign Services *</Label>
                      <p className="text-xs text-gray-500">
                        Select which services this admin can manage
                      </p>
                      <div className="space-y-3 border rounded-lg p-3">
                        {AVAILABLE_SERVICES.map((service) => (
                          <div
                            key={service.key}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`service-${service.key}`}
                              checked={form.assignedServices.includes(
                                service.key
                              )}
                              onCheckedChange={() =>
                                toggleService(service.key)
                              }
                            />
                            <Label
                              htmlFor={`service-${service.key}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {service.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => { setShowCreate(false); resetForm(); }}
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

          {/* Edit Dialog */}
          <Dialog open={showEdit} onOpenChange={(open) => { setShowEdit(open); if (!open) { setEditingAdmin(null); resetForm(); } }}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Admin</DialogTitle>
                <DialogDescription>
                  Update admin details and service assignments
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name *</Label>
                  <Input
                    id="edit-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                {/* Service Assignment for individual admin */}
                {editingAdmin?.role === "individual_admin" && (
                  <div className="grid gap-2">
                    <Label>Assigned Services</Label>
                    <p className="text-xs text-gray-500">
                      Update which services this admin can manage
                    </p>
                    <div className="space-y-3 border rounded-lg p-3">
                      {AVAILABLE_SERVICES.map((service) => (
                        <div
                          key={service.key}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`edit-service-${service.key}`}
                            checked={form.assignedServices.includes(
                              service.key
                            )}
                            onCheckedChange={() =>
                              toggleService(service.key)
                            }
                          />
                          <Label
                            htmlFor={`edit-service-${service.key}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => { setShowEdit(false); setEditingAdmin(null); resetForm(); }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
            {isSuperAdmin && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">
                    Super Admins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-600">
                    {admins.filter((a) => a.role === "super_admin").length}
                  </div>
                </CardContent>
              </Card>
            )}
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
            {isDepartmentAdmin && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">
                    Individual Admins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-600">
                    {admins.filter((a) => a.role === "individual_admin").length}
                  </div>
                </CardContent>
              </Card>
            )}
            {isSuperAdmin && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">
                    Departments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-600">
                    {departments.length}
                  </div>
                </CardContent>
              </Card>
            )}
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
                    {isSuperAdmin && <TableHead>Department</TableHead>}
                    <TableHead>Services</TableHead>
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
                        <Badge variant={getRoleVariant(admin.role)}>
                          {getRoleLabel(admin.role)}
                        </Badge>
                      </TableCell>
                      {isSuperAdmin && (
                        <TableCell>
                          {admin.department ? (
                            <Badge variant="outline">
                              {admin.department.code}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        {admin.role === "individual_admin" && admin.assignedServices && admin.assignedServices.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {admin.assignedServices.map((s) => (
                              <Badge key={s} variant="outline" className="text-xs capitalize">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        ) : admin.role === "individual_admin" ? (
                          <span className="text-gray-400 text-xs">No services</span>
                        ) : (
                          <span className="text-gray-400 text-xs">All services</span>
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
                                onClick={() => openEdit(admin)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
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

      {/* Delete Admin Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete Admin Account?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                You are about to permanently delete <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email}).
              </p>
              <p className="text-red-500 font-medium">
                This will also delete all services, data, and records created by this admin. This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAdmin} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Permanently"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
