import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { lazy, Suspense } from "react";
import CookieConsent from "./components/CookieConsent";

// ─── Critical pages (eagerly loaded) ───
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

// ─── Loading fallback ───
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-gray-500">Loading...</span>
    </div>
  </div>
);

// ─── Lazy-loaded pages (code splitting) ───
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const AdminProfile = lazy(() => import("./pages/AdminProfile"));
const CreateSchemeService = lazy(() => import("./pages/CreateSchemeService"));
const CreateCertificateService = lazy(() => import("./pages/CreateCertificateService"));
const CreateContactService = lazy(() => import("./pages/CreateContactService"));
const UserSchemeService = lazy(() => import("./pages/UserSchemeService"));
const UserCertificateService = lazy(() => import("./pages/UserCertificateService"));
const UserContactService = lazy(() => import("./pages/UserContactService"));
const UserGrievancesService = lazy(() => import("./pages/UserGrievancesService"));
const UserEmergencyService = lazy(() => import("./pages/UserEmergencyService"));
const UserFeedbackService = lazy(() => import("./pages/UserFeedbackService"));

// Admin pages — lazy loaded since they're behind auth
const AdminSchemeService = lazy(() => import("./pages/AdminSchemeService"));
const AdminCertificateService = lazy(() => import("./pages/AdminCertificateService"));
const AdminContactService = lazy(() => import("./pages/AdminContactService"));
const AdminGrievancesService = lazy(() => import("./pages/AdminGrievancesService"));
const AdminEmergencyService = lazy(() => import("./pages/AdminEmergencyService"));
const AdminFeedbackService = lazy(() => import("./pages/AdminFeedbackService"));
const EditSchemeService = lazy(() => import("./pages/EditSchemeService"));
const EditCertificateService = lazy(() => import("./pages/EditCertificateService"));
const EditContactDepartment = lazy(() => import("./pages/EditContactDepartment"));
const OfficeDetails = lazy(() => import("./pages/OfficeDetails"));
const AdminDepartments = lazy(() => import("./pages/AdminDepartments"));
const AdminManagementPage = lazy(() => import("./pages/AdminManagementPage"));
const AdminAuditLogs = lazy(() => import("./pages/AdminAuditLogs"));

// Lazy wrapper for AdminLayout + DashboardHome (named exports)
const AdminLayoutWithHome = lazy(async () => {
  const mod = await import("./pages/AdminDashboard");
  return {
    default: () => (
      <mod.default>
        <mod.DashboardHome />
      </mod.default>
    ),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: "always",
    },
    mutations: {
      retry: 0,
    },
  },
});

// ─── Route Guards ───
const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

const RequireSuperAdmin = () => {
  const { isSuperAdmin, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  return isSuperAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
};

const RequireDeptAdminOrAbove = () => {
  const { isSuperAdmin, isDepartmentAdmin, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  return (isSuperAdmin || isDepartmentAdmin) ? <Outlet /> : <Navigate to="/admin" replace />;
};

const RedirectIfAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
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
                <Route path="/admin" element={<AdminLayoutWithHome />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/office-details/:officeName" element={<OfficeDetails />} />
                <Route path="/admin/create-scheme-service" element={<CreateSchemeService />} />
                <Route path="/admin/create-certificate-service" element={<CreateCertificateService />} />
                <Route path="/admin/create-contact-service" element={<CreateContactService />} />
                <Route path="/admin/edit-scheme-service/:id" element={<EditSchemeService />} />
                <Route path="/admin/edit-certificate-service/:id" element={<EditCertificateService />} />
                <Route path="/admin/edit-contact-department/:id" element={<EditContactDepartment />} />
                <Route path="/admin/departments" element={<AdminDepartments />} />

                {/* Dept Admin or SuperAdmin routes */}
                <Route element={<RequireDeptAdminOrAbove />}>
                  <Route path="/admin/manage-admins" element={<AdminManagementPage />} />
                </Route>

                {/* Super Admin Only Routes */}
                <Route element={<RequireSuperAdmin />}>
                  <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
                </Route>

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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
