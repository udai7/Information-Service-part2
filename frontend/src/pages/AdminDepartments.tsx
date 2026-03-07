import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
  Building2,
  Plus,
  Edit,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";
import type { Department } from "../types/api";

interface DepartmentStats {
  grievances: { total: number; new: number; pending: number; solved: number };
  feedback: { total: number; new: number };
  services: { total: number; published: number };
}

export default function AdminDepartments() {
  const { isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<number, DepartmentStats>>({});
  const [showCreate, setShowCreate] = useState(false);
  const [editDept, setEditDept] = useState<Department | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getDepartments();
      setDepartments(res.departments || []);
      // Fetch stats for each department
      for (const dept of res.departments || []) {
        try {
          const statsRes = await apiClient.getDepartmentStats(dept.id);
          setStats((prev) => ({ ...prev, [dept.id]: statsRes.stats }));
        } catch {
          // Stats may not be available for all departments
        }
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to load departments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      code: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    });
  };

  const openCreate = () => {
    resetForm();
    setEditDept(null);
    setShowCreate(true);
  };

  const openEdit = (dept: Department) => {
    setForm({
      name: dept.name,
      code: dept.code,
      description: dept.description || "",
      contactEmail: dept.contactEmail || "",
      contactPhone: dept.contactPhone || "",
    });
    setEditDept(dept);
    setShowCreate(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.code) {
      toast({
        title: "Validation Error",
        description: "Name and code are required",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      if (editDept) {
        await apiClient.updateDepartment(editDept.id, form);
        toast({ title: "Success", description: "Department updated" });
      } else {
        await apiClient.createDepartment(form);
        toast({ title: "Success", description: "Department created" });
      }
      setShowCreate(false);
      resetForm();
      setEditDept(null);
      fetchDepartments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to save department",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (dept: Department) => {
    try {
      await apiClient.toggleDepartment(dept.id);
      toast({
        title: "Success",
        description: `Department ${dept.isActive ? "deactivated" : "activated"}`,
      });
      fetchDepartments();
    } catch {
      toast({
        title: "Error",
        description: "Failed to toggle department",
        variant: "destructive",
      });
    }
  };

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
                <Building2 className="h-6 w-6 text-teal-600" />
                Department Management
              </h1>
              <p className="text-gray-500 mt-1">
                Manage government departments and their services
              </p>
            </div>
            {isSuperAdmin && (
              <Dialog open={showCreate} onOpenChange={setShowCreate}>
                <DialogTrigger asChild>
                  <Button onClick={openCreate} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editDept ? "Edit Department" : "Create Department"}
                    </DialogTitle>
                    <DialogDescription>
                      {editDept
                        ? "Update department details"
                        : "Add a new government department"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Department Name *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g. Police Department"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="code">Code * (3 letters)</Label>
                      <Input
                        id="code"
                        value={form.code}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            code: e.target.value.toUpperCase().slice(0, 5),
                          })
                        }
                        placeholder="e.g. POL"
                        maxLength={5}
                        disabled={!!editDept}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        placeholder="Brief description of the department"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.contactEmail}
                          onChange={(e) =>
                            setForm({ ...form, contactEmail: e.target.value })
                          }
                          placeholder="dept@gov.in"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Contact Phone</Label>
                        <Input
                          id="phone"
                          value={form.contactPhone}
                          onChange={(e) =>
                            setForm({ ...form, contactPhone: e.target.value })
                          }
                          placeholder="+91..."
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreate(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : editDept ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Department Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const deptStats = stats[dept.id];
              return (
                <Card
                  key={dept.id}
                  className={`relative overflow-hidden transition-shadow hover:shadow-lg ${!dept.isActive ? "opacity-60" : ""}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-600" />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <CardDescription className="font-mono text-xs mt-1">
                          {dept.code}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={dept.isActive ? "default" : "secondary"}
                        >
                          {dept.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {isSuperAdmin && (
                          <Switch
                            checked={dept.isActive}
                            onCheckedChange={() => handleToggle(dept)}
                          />
                        )}
                      </div>
                    </div>
                    {dept.description && (
                      <p className="text-sm text-gray-500 mt-2">
                        {dept.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {deptStats ? (
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-slate-50 rounded-lg p-2">
                          <MessageSquare className="h-4 w-4 mx-auto text-teal-600 mb-1" />
                          <div className="text-lg font-bold text-slate-700">
                            {deptStats.grievances?.total || 0}
                          </div>
                          <div className="text-xs text-gray-500">
                            Grievances
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-2">
                          <FileText className="h-4 w-4 mx-auto text-green-600 mb-1" />
                          <div className="text-lg font-bold text-green-700">
                            {deptStats.services?.total || 0}
                          </div>
                          <div className="text-xs text-gray-500">Services</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2">
                          <BarChart3 className="h-4 w-4 mx-auto text-teal-600 mb-1" />
                          <div className="text-lg font-bold text-slate-700">
                            {deptStats.feedback?.total || 0}
                          </div>
                          <div className="text-xs text-gray-500">Feedback</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 text-center py-4">
                        No stats available
                      </div>
                    )}

                    {/* Contact Info */}
                    {(dept.contactEmail || dept.contactPhone) && (
                      <div className="mt-3 pt-3 border-t text-xs text-gray-500 space-y-1">
                        {dept.contactEmail && (
                          <div>Email: {dept.contactEmail}</div>
                        )}
                        {dept.contactPhone && (
                          <div>Phone: {dept.contactPhone}</div>
                        )}
                      </div>
                    )}

                    {/* Admin count */}
                    <div className="mt-3 pt-3 border-t flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>Department admins</span>
                      </div>
                      {isSuperAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(dept)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {departments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No departments found</p>
              <p className="text-sm">Create your first department to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
