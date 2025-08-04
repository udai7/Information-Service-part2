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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CheckCircle,
  Activity,
  Users,
  Search,
  Filter,
  Eye,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Phone,
  Award,
} from "lucide-react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { apiClient } from "../types/api";
import type {
  SchemeService,
  CertificateService,
  ContactService,
} from "../types/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </div>
    </div>
  );
}

export function DashboardHome() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Service states
  const [schemeServices, setSchemeServices] = useState<SchemeService[]>([]);
  const [certificateServices, setCertificateServices] = useState<
    CertificateService[]
  >([]);
  const [contactServices, setContactServices] = useState<ContactService[]>([]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getAllPublishedServices();
      setSchemeServices(data.schemeServices);
      setCertificateServices(data.certificateServices);
      setContactServices(data.contactServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleServiceActive = async (
    serviceType: "scheme" | "certificate" | "contact",
    id: number,
    currentStatus: boolean,
  ) => {
    try {
      const newStatus = !currentStatus;

      switch (serviceType) {
        case "scheme":
          await apiClient.toggleSchemeServiceActive(id, newStatus);
          setSchemeServices((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive: newStatus } : s)),
          );
          break;
        case "certificate":
          await apiClient.toggleCertificateServiceActive(id, newStatus);
          setCertificateServices((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive: newStatus } : s)),
          );
          break;
        case "contact":
          await apiClient.toggleContactServiceActive(id, newStatus);
          setContactServices((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive: newStatus } : s)),
          );
          break;
      }
    } catch (error) {
      console.error("Error toggling service status:", error);
    }
  };

  // Statistics
  const allServices = [
    ...schemeServices,
    ...certificateServices,
    ...contactServices,
  ];
  const activeServices = allServices.filter((s) => s.isActive !== false);
  const inactiveServices = allServices.filter((s) => s.isActive === false);

  const stats = {
    total: allServices.length,
    active: activeServices.length,
    inactive: inactiveServices.length,
    schemes: schemeServices.length,
    certificates: certificateServices.length,
    contacts: contactServices.length,
  };

  // Filter function
  const filterServices = (services: any[], serviceType: string) => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.summary?.toLowerCase().includes(search.toLowerCase()) ||
        service.type?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && service.isActive !== false) ||
        (statusFilter === "inactive" && service.isActive === false);

      const matchesType = typeFilter === "all" || typeFilter === serviceType;

      return matchesSearch && matchesStatus && matchesType;
    });
  };

  const ServiceCard = ({
    service,
    serviceType,
  }: {
    service: any;
    serviceType: "scheme" | "certificate" | "contact";
  }) => {
    const isActive = service.isActive !== false;

    const getIcon = () => {
      switch (serviceType) {
        case "scheme":
          return <FileText className="h-5 w-5" />;
        case "certificate":
          return <Award className="h-5 w-5" />;
        case "contact":
          return <Phone className="h-5 w-5" />;
      }
    };

    const getTypeColor = () => {
      switch (serviceType) {
        case "scheme":
          return "bg-blue-100 text-blue-800";
        case "certificate":
          return "bg-green-100 text-green-800";
        case "contact":
          return "bg-purple-100 text-purple-800";
      }
    };

    return (
      <Card
        className={`hover:shadow-lg transition-all duration-200 ${!isActive ? "opacity-60 border-gray-300" : "border-green-200"}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <CardTitle className="text-lg">{service.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor()} variant="secondary">
                {serviceType}
              </Badge>
              {isActive ? (
                <Badge
                  className="bg-green-100 text-green-800"
                  variant="secondary"
                >
                  Active
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800" variant="secondary">
                  Inactive
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="text-sm line-clamp-2">
            {service.summary}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <div>
                Mode:{" "}
                <span className="font-medium">{service.applicationMode}</span>
              </div>
              {service.type && (
                <div>
                  Type: <span className="font-medium">{service.type}</span>
                </div>
              )}
              <div>
                Created:{" "}
                <span className="font-medium">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`switch-${serviceType}-${service.id}`}
                className="text-sm"
              >
                {isActive ? "Active" : "Inactive"}
              </Label>
              <Switch
                id={`switch-${serviceType}-${service.id}`}
                checked={isActive}
                onCheckedChange={() =>
                  toggleServiceActive(serviceType, service.id, isActive)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Service Management Dashboard
        </h1>
        <p className="text-gray-600">
          Manage published services visibility and monitor platform performance
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-blue-800">
              <AlertCircle className="h-5 w-5" />
              <span>{message}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Services
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground">All published</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Services
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <p className="text-xs text-muted-foreground">Visible to users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Services
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.inactive}
            </div>
            <p className="text-xs text-muted-foreground">Hidden from users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheme Services
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.schemes}
            </div>
            <p className="text-xs text-muted-foreground">Government schemes</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Certificate Services
            </CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.certificates}
            </div>
            <p className="text-xs text-muted-foreground">Document services</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Services
            </CardTitle>
            <Phone className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.contacts}
            </div>
            <p className="text-xs text-muted-foreground">Contact information</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Services</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, summary, or type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status-filter">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type-filter">Service Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="scheme">Scheme Services</SelectItem>
                  <SelectItem value="certificate">
                    Certificate Services
                  </SelectItem>
                  <SelectItem value="contact">Contact Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All Services ({allServices.length})
          </TabsTrigger>
          <TabsTrigger value="scheme">
            Schemes ({schemeServices.length})
          </TabsTrigger>
          <TabsTrigger value="certificate">
            Certificates ({certificateServices.length})
          </TabsTrigger>
          <TabsTrigger value="contact">
            Contacts ({contactServices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Loading services...
              </div>
            ) : (
              <>
                {filterServices(schemeServices, "scheme").map((service) => (
                  <ServiceCard
                    key={`scheme-${service.id}`}
                    service={service}
                    serviceType="scheme"
                  />
                ))}
                {filterServices(certificateServices, "certificate").map(
                  (service) => (
                    <ServiceCard
                      key={`certificate-${service.id}`}
                      service={service}
                      serviceType="certificate"
                    />
                  ),
                )}
                {filterServices(contactServices, "contact").map((service) => (
                  <ServiceCard
                    key={`contact-${service.id}`}
                    service={service}
                    serviceType="contact"
                  />
                ))}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scheme" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterServices(schemeServices, "scheme").map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                serviceType="scheme"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificate" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterServices(certificateServices, "certificate").map(
              (service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  serviceType="certificate"
                />
              ),
            )}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterServices(contactServices, "contact").map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                serviceType="contact"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Bulk operations and service management shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => fetchAllServices()}
              disabled={loading}
            >
              <Activity className="h-4 w-4 mr-2" />
              Refresh All Services
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const inactiveCount = inactiveServices.length;
                setMessage(
                  `Found ${inactiveCount} inactive services that are hidden from users.`,
                );
                setTimeout(() => setMessage(null), 5000);
              }}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Check Inactive Services
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setMessage(
                  `Total services: ${stats.total} | Active: ${stats.active} | Inactive: ${stats.inactive}`,
                );
                setTimeout(() => setMessage(null), 5000);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
