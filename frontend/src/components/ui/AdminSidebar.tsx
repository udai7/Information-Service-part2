import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { label: "Scheme Service", path: "/admin-scheme-service" },
    { label: "Certificate Service", path: "/admin-certificate-service" },
    { label: "Contact Service", path: "/admin-contact-service" },
    { label: "Grievances Service", path: "/admin-grievances-service" },
    { label: "Feedback Service", path: "/admin-feedback-service" },
  ];
  return (
    <nav className="flex flex-col gap-2 p-4 bg-blue-900 min-h-screen w-64 text-white font-medium border-r border-blue-800">
      <Button
        className="mb-6 w-full bg-primary text-white hover:bg-primary/90"
        onClick={() => navigate("/admin")}
      >
        Admin Dashboard
      </Button>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`rounded px-4 py-2 transition-colors hover:bg-blue-800 hover:text-yellow-300 ${location.pathname === item.path ? "bg-blue-800 text-yellow-300" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
export default AdminSidebar;
