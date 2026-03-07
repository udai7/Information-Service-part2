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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";
import type { AuditLogEntry } from "../types/api";

const ACTION_COLORS: Record<string, string> = {
  LOGIN: "bg-teal-100 text-slate-700",
  LOGOUT: "bg-gray-100 text-gray-700",
  LOGIN_FAILED: "bg-red-100 text-red-700",
  REGISTER: "bg-green-100 text-green-700",
  CREATE: "bg-emerald-100 text-emerald-700",
  UPDATE: "bg-yellow-100 text-yellow-700",
  DELETE: "bg-red-100 text-red-700",
  PUBLISH: "bg-slate-100 text-slate-700",
  TOGGLE_ACTIVE: "bg-orange-100 text-orange-700",
  STATUS_CHANGE: "bg-teal-100 text-teal-700",
  PASSWORD_CHANGE: "bg-pink-100 text-pink-700",
};

export default function AdminAuditLogs() {
  const { isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionFilter, setActionFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter, entityFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 25 };
      if (actionFilter !== "all") params.action = actionFilter;
      if (entityFilter !== "all") params.entity = entityFilter;
      const res = await apiClient.getAuditLogs(params);
      setLogs(res.logs || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load audit logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
                Only Super Admins can view audit logs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const filteredLogs = searchTerm
    ? logs.filter(
        (l) =>
          l.adminName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.entity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.action?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : logs;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ScrollText className="h-6 w-6 text-teal-600" />
              Audit Logs
            </h1>
            <p className="text-gray-500 mt-1">
              Track all administrative actions across the system
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Select
                    value={actionFilter}
                    onValueChange={(v) => {
                      setActionFilter(v);
                      setPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="LOGIN">Login</SelectItem>
                      <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
                      <SelectItem value="REGISTER">Register</SelectItem>
                      <SelectItem value="CREATE">Create</SelectItem>
                      <SelectItem value="UPDATE">Update</SelectItem>
                      <SelectItem value="DELETE">Delete</SelectItem>
                      <SelectItem value="PUBLISH">Publish</SelectItem>
                      <SelectItem value="STATUS_CHANGE">Status Change</SelectItem>
                      <SelectItem value="TOGGLE_ACTIVE">Toggle Active</SelectItem>
                      <SelectItem value="PASSWORD_CHANGE">Password Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-48">
                  <Select
                    value={entityFilter}
                    onValueChange={(v) => {
                      setEntityFilter(v);
                      setPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by entity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entities</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="grievance">Grievance</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="scheme_service">Scheme Service</SelectItem>
                      <SelectItem value="certificate_service">Certificate Service</SelectItem>
                      <SelectItem value="contact_service">Contact Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Entity</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>IP Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                            {new Date(log.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="font-medium">
                            {log.adminName || `Admin #${log.adminId}`}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                ACTION_COLORS[log.action] ||
                                "bg-gray-100 text-gray-700"
                              }
                            >
                              {log.action}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {log.entity}
                              {log.entityId && (
                                <span className="text-gray-400">
                                  {" "}
                                  #{log.entityId}
                                </span>
                              )}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-sm text-gray-500">
                            {log.details
                              ? typeof log.details === "string"
                                ? log.details
                                : JSON.stringify(log.details)
                              : "—"}
                          </TableCell>
                          <TableCell className="text-sm text-gray-400 font-mono">
                            {log.ipAddress || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredLogs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No audit logs found
                    </div>
                  )}

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Page {page} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page >= totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
