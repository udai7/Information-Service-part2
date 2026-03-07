import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";
import ServiceDetails from "./pages/ServiceDetails";
import AdminProfile from "./pages/AdminProfile";
import AdminLogin from "./pages/AdminLogin";
import CreateSchemeService from "./pages/CreateSchemeService";
import CreateCertificateService from "./pages/CreateCertificateService";
import CreateContactService from "./pages/CreateContactService";
import UserSchemeService from "./pages/UserSchemeService";
import UserCertificateService from "./pages/UserCertificateService";
import UserContactService from "./pages/UserContactService";
import UserGrievancesService from "./pages/UserGrievancesService";
import UserEmergencyService from "./pages/UserEmergencyService";
import UserFeedbackService from "./pages/UserFeedbackService";
import AdminLayout, { DashboardHome } from "./pages/AdminDashboard";
import AdminSchemeService from "./pages/AdminSchemeService";
import AdminCertificateService from "./pages/AdminCertificateService";
import AdminContactService from "./pages/AdminContactService";
import AdminGrievancesService from "./pages/AdminGrievancesService";
import AdminEmergencyService from "./pages/AdminEmergencyService";
import AdminFeedbackService from "./pages/AdminFeedbackService";
import EditSchemeService from "./pages/EditSchemeService";
import EditCertificateService from "./pages/EditCertificateService";
import EditContactDepartment from "./pages/EditContactDepartment";
import OfficeDetails from "./pages/OfficeDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// ─── Route Guards ───
const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

const RequireSuperAdmin = () => {
  const { isSuperAdmin, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return isSuperAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
};

const RedirectIfAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ─── Public Routes ─── */}
            <Route path="/" element={<Index />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/scheme-service" element={<UserSchemeService />} />
            <Route path="/certificate-service" element={<UserCertificateService />} />
            <Route path="/contact-service" element={<UserContactService />} />
            <Route path="/grievances-service" element={<UserGrievancesService />} />
            <Route path="/emergency-service" element={<UserEmergencyService />} />
            <Route path="/feedback-service" element={<UserFeedbackService />} />

            {/* ─── Auth Routes (redirect if already logged in) ─── */}
            <Route element={<RedirectIfAuth />}>
              <Route path="/admin/login" element={<AdminLogin />} />
            </Route>

            {/* ─── Protected Admin Routes ─── */}
            <Route element={<RequireAuth />}>
              <Route
                path="/admin"
                element={
                  <AdminLayout>
                    <DashboardHome />
                  </AdminLayout>
                }
              />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/office-details/:officeName" element={<OfficeDetails />} />
              <Route path="/admin/create-scheme-service" element={<CreateSchemeService />} />
              <Route path="/admin/create-certificate-service" element={<CreateCertificateService />} />
              <Route path="/admin/create-contact-service" element={<CreateContactService />} />
              <Route path="/admin/edit-scheme-service/:id" element={<EditSchemeService />} />
              <Route path="/admin/edit-certificate-service/:id" element={<EditCertificateService />} />
              <Route path="/admin/edit-contact-department/:id" element={<EditContactDepartment />} />

              {/* Admin service pages */}
              <Route path="/admin-scheme-service" element={<AdminSchemeService />} />
              <Route path="/admin-certificate-service" element={<AdminCertificateService />} />
              <Route path="/admin-contact-service" element={<AdminContactService />} />
              <Route path="/admin-grievances-service" element={<AdminGrievancesService />} />
              <Route path="/admin-emergency-service" element={<AdminEmergencyService />} />
              <Route path="/admin-feedback-service" element={<AdminFeedbackService />} />
            </Route>

            {/* ─── Catch-all ─── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
