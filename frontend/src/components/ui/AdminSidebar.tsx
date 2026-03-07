import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Building2,
  UserCog,
  ScrollText,
  FileText,
  Award,
  Phone,
  MessageSquare,
  ThumbsUp,
  LayoutDashboard,
  Shield,
  LogOut,
} from "lucide-react";

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSuperAdmin, admin, logout } = useAuth();

  const serviceItems = [
    { label: "Schemes", path: "/admin-scheme-service", icon: FileText },
    { label: "Certificates", path: "/admin-certificate-service", icon: Award },
    { label: "Contacts", path: "/admin-contact-service", icon: Phone },
    { label: "Grievances", path: "/admin-grievances-service", icon: MessageSquare },
    { label: "Feedback", path: "/admin-feedback-service", icon: ThumbsUp },
  ];

  const superAdminItems = [
    { label: "Departments", path: "/admin/departments", icon: Building2 },
    { label: "Manage Admins", path: "/admin/manage-admins", icon: UserCog },
    { label: "Audit Logs", path: "/admin/audit-logs", icon: ScrollText },
  ];

  const linkClass = (path: string) =>
    `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
      location.pathname === path
        ? "bg-slate-100 text-slate-900 font-semibold"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <nav className="flex flex-col w-60 min-h-screen bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-800 font-semibold hover:bg-slate-50"
          onClick={() => navigate("/admin")}
        >
          <LayoutDashboard className="h-4 w-4 text-slate-500" />
          Dashboard
        </Button>
      </div>

      {/* Role Badge */}
      <div className="mx-4 mt-4 mb-2 px-3 py-2 bg-slate-50 rounded-md border border-slate-100 flex items-center gap-2">
        <Shield className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-xs font-medium text-slate-600">
          {admin?.role === "super_admin" ? "Super Admin" : "Dept Admin"}
        </span>
        {admin?.department && (
          <span className="ml-auto text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            {admin.department.code}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        {/* Super Admin Section */}
        {isSuperAdmin && (
          <>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-3 pt-4 pb-2">
              Management
            </div>
            {superAdminItems.map((item) => (
              <Link key={item.path} to={item.path} className={linkClass(item.path)}>
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 my-3" />
          </>
        )}

        {/* Service Section */}
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-3 pt-2 pb-2">
          Services
        </div>
        {serviceItems.map((item) => (
          <Link key={item.path} to={item.path} className={linkClass(item.path)}>
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-2 px-3 py-2 mb-2">
          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
            {admin?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-800 truncate">{admin?.name}</div>
            <div className="text-xs text-slate-400 truncate">{admin?.email}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </nav>
  );
}
export default AdminSidebar;
