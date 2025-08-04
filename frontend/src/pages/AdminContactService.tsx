import AdminSidebar from "@/components/ui/AdminSidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, Activity, Clock, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../types/api";
import type { ContactService } from "../types/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function AdminContactService() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "create",
  );
  const [services, setServices] = useState<ContactService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }

    const fetchContactServices = async () => {
      setLoading(true);
      try {
        const response = await apiClient.getContactServices();
        setServices(response.contactServices || []);
      } catch (error) {
        console.error("Error fetching contact services:", error);
        setError("Failed to load contact services");
      } finally {
        setLoading(false);
      }
    };

    fetchContactServices();
  }, [isAuthenticated, navigate]);

  const pendingServices = services.filter((s) => s.status === "draft");
  const publishedServices = services.filter((s) => s.status === "published");
  const activeServices = publishedServices.filter((s) => s.isActive !== false);
  const inactiveServices = publishedServices.filter(
    (s) => s.isActive === false,
  );

  const stats = {
    published: publishedServices.length,
    active: activeServices.length,
    total: services.length,
    inactive: inactiveServices.length,
    pending: pendingServices.length,
  };

  const handleEdit = (service: ContactService) => {
    navigate(`/admin/edit-contact-department/${service.id}`);
  };

  const handleToggleActive = async (service: ContactService) => {
    try {
      await apiClient.updateContactService(service.id, {
        isActive: !service.isActive,
      });

      // Refresh the services list
      const response = await apiClient.getContactServices();
      setServices(response.contactServices || []);

      toast({
        title: "Success",
        description: `Service ${
          service.isActive ? "deactivated" : "activated"
        } successfully`,
      });
    } catch (error) {
      console.error("Error updating service status:", error);
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (service: ContactService) => {
    try {
      await apiClient.deleteContactService(service.id);
      // Refresh the services list
      const response = await apiClient.getContactServices();
      setServices(response.contactServices || []);

      toast({
        title: "Success",
        description: "Contact service deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting contact service:", error);
      toast({
        title: "Error",
        description: "Failed to delete contact service",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">
            Contact Department Service
          </h1>
          <p className="text-gray-600 mb-8">
            Manage and review all contact department services and their details
            here.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                Loading contact services...
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Published Services
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {stats.published}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently active
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Services
                    </CardTitle>
                    <Clock className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.pending}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting review
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Services
                    </CardTitle>
                    <Activity className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.active}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently active
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Inactive Services
                    </CardTitle>
                    <Users className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.inactive}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Hidden from users
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="create">Create New</TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({stats.pending})
                  </TabsTrigger>
                  <TabsTrigger value="published">
                    Published ({stats.published})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Create New Service
                      </CardTitle>
                      <CardDescription>
                        Add a new contact service to the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Ready to create a new contact service?
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Use our service creation form to add new contact
                          offerings to the platform
                        </p>
                        <Button size="lg" asChild>
                          <Link to="/admin/create-contact-service">
                            Create New Contact Service
                            <Plus className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pending" className="space-y-6">
                  {pendingServices.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-center text-gray-500">
                          No pending services found.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {pendingServices.map((service) => (
                        <Card key={service.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{service.name}</h3>
                              <p className="text-gray-600 text-sm">
                                {service.summary}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                                  {service.status}
                                </span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  {service.applicationMode}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(service)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(service)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="published" className="space-y-6">
                  {publishedServices.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-center text-gray-500">
                          No published services found.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {publishedServices.map((service) => (
                        <Card key={service.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{service.name}</h3>
                              <p className="text-gray-600 text-sm">
                                {service.summary}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                  {service.status}
                                </span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  {service.applicationMode}
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs rounded ${
                                    service.isActive !== false
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {service.isActive !== false
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={
                                  service.isActive !== false
                                    ? "destructive"
                                    : "default"
                                }
                                onClick={() => handleToggleActive(service)}
                              >
                                {service.isActive !== false
                                  ? "Deactivate"
                                  : "Activate"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(service)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(service)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
