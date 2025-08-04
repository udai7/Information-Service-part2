import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  Activity,
  TrendingUp,
  CheckCircle,
  FileText,
  Award,
  Phone,
} from "lucide-react";
import { ServicesMenu } from "@/components/ui/sidebar";
import { apiClient } from "../types/api";
import type {
  SchemeService,
  CertificateService,
  ContactService,
} from "../types/api";

// Combined service type for unified display
type CombinedService = {
  id: string | number;
  name: string;
  summary: string;
  applicationMode?: string;
  status: string;
  type: "scheme" | "certificate" | "contact";
  isActive?: boolean;
  targetAudience?: string[];
  departmentType?: string;
};

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allServices, setAllServices] = useState<CombinedService[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getAllPublishedServices();

      // Combine all services into a unified format
      const combinedServices: CombinedService[] = [];

      // Add scheme services
      if (data.schemeServices) {
        data.schemeServices
          .filter((service) => service.isActive !== false)
          .forEach((service) => {
            combinedServices.push({
              ...service,
              type: "scheme",
              applicationMode:
                service.applicationMode === "both"
                  ? "Online/Offline"
                  : service.applicationMode === "online"
                    ? "Online"
                    : "Offline",
            });
          });
      }

      // Add certificate services
      if (data.certificateServices) {
        data.certificateServices
          .filter((service) => service.isActive !== false)
          .forEach((service) => {
            combinedServices.push({
              ...service,
              type: "certificate",
              applicationMode:
                service.applicationMode === "both"
                  ? "Online/Offline"
                  : service.applicationMode === "online"
                    ? "Online"
                    : "Offline",
            });
          });
      }

      // Add contact services
      if (data.contactServices) {
        data.contactServices
          .filter((service) => service.isActive !== false)
          .forEach((service) => {
            combinedServices.push({
              ...service,
              type: "contact",
              applicationMode: "Contact Info",
            });
          });
      }

      setAllServices(combinedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = allServices.filter(
    (service) =>
      service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.targetAudience &&
        service.targetAudience.some((audience) =>
          audience.toLowerCase().includes(searchQuery.toLowerCase()),
        )) ||
      (service.departmentType &&
        service.departmentType
          .toLowerCase()
          .includes(searchQuery.toLowerCase())),
  );

  const stats = {
    published: allServices.length,
    schemes: allServices.filter((s) => s.type === "scheme").length,
    certificates: allServices.filter((s) => s.type === "certificate").length,
    contacts: allServices.filter((s) => s.type === "contact").length,
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "scheme":
        return <Award className="h-4 w-4" />;
      case "certificate":
        return <FileText className="h-4 w-4" />;
      case "contact":
        return <Phone className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getServiceRoute = (service: CombinedService) => {
    switch (service.type) {
      case "scheme":
        return "/user-scheme-service";
      case "certificate":
        return "/user-certificate-service";
      case "contact":
        return "/user-contact-service";
      default:
        return "/";
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case "scheme":
        return "bg-green-100 text-green-800";
      case "certificate":
        return "bg-blue-100 text-blue-800";
      case "contact":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold">User Dashboard</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-600">
              Discover and manage your information services
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Services
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.published}
                </div>
                <p className="text-xs text-muted-foreground">
                  Available services
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Schemes</CardTitle>
                <Award className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.schemes}
                </div>
                <p className="text-xs text-muted-foreground">
                  Government schemes
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Certificates
                </CardTitle>
                <FileText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.certificates}
                </div>
                <p className="text-xs text-muted-foreground">
                  Official documents
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Contact Services
                </CardTitle>
                <Phone className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.contacts}
                </div>
                <p className="text-xs text-muted-foreground">
                  Department contacts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {filteredServices.length} services found
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-lg">Loading services...</div>
            </div>
          )}

          {/* Services Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={`${service.type}-${service.id}`}
                  className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getServiceIcon(service.type)}
                          <Badge
                            className={`text-xs ${getServiceTypeColor(service.type)}`}
                          >
                            {service.type.charAt(0).toUpperCase() +
                              service.type.slice(1)}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mb-1">
                          {service.name}
                        </CardTitle>
                        <CardDescription>{service.summary}</CardDescription>
                      </div>
                      {service.applicationMode && (
                        <Badge variant="outline" className="ml-2">
                          {service.applicationMode}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {service.targetAudience &&
                        service.targetAudience.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {service.targetAudience
                              .slice(0, 3)
                              .map((audience, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {audience}
                                </Badge>
                              ))}
                            {service.targetAudience.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{service.targetAudience.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}

                      {service.departmentType && (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              service.departmentType === "emergency"
                                ? "destructive"
                                : "default"
                            }
                            className="text-xs"
                          >
                            {service.departmentType === "emergency"
                              ? "Emergency"
                              : "Regular"}
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 capitalize">
                            {service.status}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => navigate(getServiceRoute(service))}
                      >
                        View{" "}
                        {service.type === "scheme"
                          ? "Scheme"
                          : service.type === "certificate"
                            ? "Certificate"
                            : "Contacts"}
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or browse by service type
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
