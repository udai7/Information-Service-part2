import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";
import ServiceDetails from "./pages/ServiceDetails";
import AdminProfile from "./pages/AdminProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/admin/office-details/:officeName"
              element={<OfficeDetails />}
            />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <DashboardHome />
                </AdminLayout>
              }
            />

            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/scheme-service" element={<UserSchemeService />} />
            <Route path="/contact-service" element={<UserContactService />} />
            <Route
              path="/grievances-service"
              element={<UserGrievancesService />}
            />
            <Route
              path="/emergency-service"
              element={<UserEmergencyService />}
            />
            <Route path="/feedback-service" element={<UserFeedbackService />} />
            <Route
              path="/certificate-service"
              element={<UserCertificateService />}
            />
            <Route
              path="/admin/create-scheme-service"
              element={<CreateSchemeService />}
            />
            <Route
              path="/admin/create-certificate-service"
              element={<CreateCertificateService />}
            />
            <Route
              path="/admin/create-contact-service"
              element={<CreateContactService />}
            />
            <Route
              path="/admin/edit-scheme-service/:id"
              element={<EditSchemeService />}
            />
            <Route
              path="/admin/edit-certificate-service/:id"
              element={<EditCertificateService />}
            />
            <Route
              path="/admin/edit-contact-department/:id"
              element={<EditContactDepartment />}
            />
            {/* User-specific service pages */}
            <Route
              path="/user-scheme-service"
              element={<UserSchemeService />}
            />
            <Route
              path="/user-certificate-service"
              element={<UserCertificateService />}
            />
            <Route
              path="/user-contact-service"
              element={<UserContactService />}
            />
            <Route
              path="/user-grievances-service"
              element={<UserGrievancesService />}
            />
            <Route
              path="/user-emergency-service"
              element={<UserEmergencyService />}
            />
            <Route
              path="/user-feedback-service"
              element={<UserFeedbackService />}
            />
            {/* Admin-specific service pages */}
            <Route
              path="/admin-scheme-service"
              element={<AdminSchemeService />}
            />
            <Route
              path="/admin-certificate-service"
              element={<AdminCertificateService />}
            />
            <Route
              path="/admin-contact-service"
              element={<AdminContactService />}
            />
            <Route
              path="/admin-grievances-service"
              element={<AdminGrievancesService />}
            />
            <Route
              path="/admin-emergency-service"
              element={<AdminEmergencyService />}
            />
            <Route
              path="/admin-feedback-service"
              element={<AdminFeedbackService />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
