import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Users,
  Search,
  Filter,
  Eye,
  TrendingUp,
  AlertCircle,
  FileText,
  Phone,
  Award,
} from "lucide-react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

export function DashboardHome() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [message, setMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // ─── Parallel Cached Queries via React Query ───
  // This performs memoized fetching so re-renders don't cause extra network requests
  const { data: schemesResponse, isLoading: loadingSchemes } = useQuery({
    queryKey: ["admin_schemeServices"],
    queryFn: () => apiClient.getSchemeServices(),
  });

  const { data: certsResponse, isLoading: loadingCerts } = useQuery({
    queryKey: ["admin_certificateServices"],
    queryFn: () => apiClient.getCertificateServices(),
  });

  const { data: contactsResponse, isLoading: loadingContacts } = useQuery({
    queryKey: ["admin_contactServices"],
    queryFn: () => apiClient.getContactServices(),
  });

  const loading = loadingSchemes || loadingCerts || loadingContacts;

  // Optimistic & Cached Mutations
  const toggleMutation = useMutation({
    mutationFn: async ({
      serviceType,
      id,
      newStatus,
    }: {
      serviceType: "scheme" | "certificate" | "contact";
      id: number;
      newStatus: boolean;
    }) => {
      switch (serviceType) {
        case "scheme":
          return apiClient.toggleSchemeServiceActive(id, newStatus);
        case "certificate":
          return apiClient.toggleCertificateServiceActive(id, newStatus);
        case "contact":
          return apiClient.toggleContactServiceActive(id, newStatus);
      }
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant query to trigger background refetch
      queryClient.invalidateQueries({
        queryKey: [`admin_${variables.serviceType}Services`],
      });

      toast({
        title: "Success",
        description: `Service ${variables.newStatus ? "activated" : "deactivated"} successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update service status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // ─── Memoized Computed State ───
  // Ensures filtering operations are completely cached until the underlying server data changes
  const {
    schemeServices,
    certificateServices,
    contactServices,
    allServices,
    activeServices,
    inactiveServices,
    stats,
  } = useMemo(() => {
    const s1 = (schemesResponse?.schemeServices || []).filter((s) => s.status === "published");
    const s2 = (certsResponse?.certificateServices || []).filter((s) => s.status === "published");
    const s3 = (contactsResponse?.contactServices || []).filter((s) => s.status === "published");

    const all = [...s1, ...s2, ...s3];
    const active = all.filter((s) => s.isActive !== false);
    const inactive = all.filter((s) => s.isActive === false);

    return {
      schemeServices: s1,
      certificateServices: s2,
      contactServices: s3,
      allServices: all,
      activeServices: active,
      inactiveServices: inactive,
      stats: {
        total: all.length,
        active: active.length,
        inactive: inactive.length,
        schemes: s1.length,
        certificates: s2.length,
        contacts: s3.length,
      },
    };
  }, [schemesResponse, certsResponse, contactsResponse]);

  // Filter function
  const filterServices = (services: any[], serviceType: string) => {
    const searchLower = search.toLowerCase();
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchLower) ||
        service.summary?.toLowerCase().includes(searchLower) ||
        service.type?.toLowerCase().includes(searchLower);

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
    const isToggling = toggleMutation.isPending && toggleMutation.variables?.id === service.id && toggleMutation.variables?.serviceType === serviceType;

    const getIcon = () => {
      switch (serviceType) {
        case "scheme": return <FileText className="h-5 w-5" />;
        case "certificate": return <Award className="h-5 w-5" />;
        case "contact": return <Phone className="h-5 w-5" />;
      }
    };

    const getTypeColor = () => {
      switch (serviceType) {
        case "scheme": return "bg-teal-100 text-teal-800";
        case "certificate": return "bg-green-100 text-green-800";
        case "contact": return "bg-slate-100 text-slate-800";
      }
    };

    return (
      <Card
        className={`hover:shadow-lg transition-all duration-200 ${!isActive ? "opacity-60 border-gray-300" : "border-green-200"
          }`}
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
                <Badge className="bg-green-100 text-green-800" variant="secondary">
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
                Mode: <span className="font-medium">{service.applicationMode}</span>
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
              {isToggling ? (
                <LoadingSpinner size="sm" variant="inline" text="Updating..." />
              ) : (
                <>
                  <Label htmlFor={`switch-${serviceType}-${service.id}`} className="text-sm">
                    {isActive ? "Active" : "Inactive"}
                  </Label>
                  <Switch
                    id={`switch-${serviceType}-${service.id}`}
                    checked={isActive}
                    onCheckedChange={() =>
                      toggleMutation.mutate({ serviceType, id: service.id, newStatus: !isActive })
                    }
                    disabled={toggleMutation.isPending}
                  />
                </>
              )}
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
        <h1 className="text-3xl font-bold mb-2">Service Management Dashboard</h1>
        <p className="text-gray-600">
          Manage published services visibility and monitor platform performance
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <Card className="mb-6 border-teal-200 bg-teal-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-teal-800">
              <AlertCircle className="h-5 w-5" />
              <span>{message}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        {[
          { title: "Total Services", value: stats.total, icon: Users, color: "teal", sub: "All published" },
          { title: "Active Services", value: stats.active, icon: Activity, color: "green", sub: "Visible to users" },
          { title: "Inactive Services", value: stats.inactive, icon: AlertCircle, color: "red", sub: "Hidden from users" },
          { title: "Scheme Services", value: stats.schemes, icon: FileText, color: "teal", sub: "Government schemes" },
          { title: "Certificate Services", value: stats.certificates, icon: Award, color: "green", sub: "Document services" },
          { title: "Contact Services", value: stats.contacts, icon: Phone, color: "teal", sub: "Contact information" },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
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
                  <SelectItem value="certificate">Certificate Services</SelectItem>
                  <SelectItem value="contact">Contact Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="all">All Services ({allServices.length})</TabsTrigger>
          <TabsTrigger value="scheme">Schemes ({schemeServices.length})</TabsTrigger>
          <TabsTrigger value="certificate">Certificates ({certificateServices.length})</TabsTrigger>
          <TabsTrigger value="contact">Contacts ({contactServices.length})</TabsTrigger>
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
                  <ServiceCard key={`scheme-${service.id}`} service={service} serviceType="scheme" />
                ))}
                {filterServices(certificateServices, "certificate").map((service) => (
                  <ServiceCard key={`certificate-${service.id}`} service={service} serviceType="certificate" />
                ))}
                {filterServices(contactServices, "contact").map((service) => (
                  <ServiceCard key={`contact-${service.id}`} service={service} serviceType="contact" />
                ))}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scheme" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterServices(schemeServices, "scheme").map((service) => (
              <ServiceCard key={service.id} service={service} serviceType="scheme" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificate" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterServices(certificateServices, "certificate").map((service) => (
              <ServiceCard key={service.id} service={service} serviceType="certificate" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterServices(contactServices, "contact").map((service) => (
              <ServiceCard key={service.id} service={service} serviceType="contact" />
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
              onClick={() => queryClient.invalidateQueries()}
              disabled={loading}
            >
              <Activity className="h-4 w-4 mr-2" />
              Refresh All Services
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setMessage(`Found ${inactiveServices.length} inactive services that are hidden from users.`);
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
