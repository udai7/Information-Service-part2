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
import { useState, useEffect } from "react";
import { apiClient } from "../types/api";
import type { SchemeService } from "../types/api";
import { useAuth } from "../contexts/AuthContext";

export default function AdminSchemeService() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "create",
  );
  const [schemes, setSchemes] = useState<SchemeService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }

    const fetchSchemes = async () => {
      setLoading(true);
      try {
        const response = await apiClient.getSchemeServices();
        setSchemes(response.schemeServices || []);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setError("Failed to load schemes");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [isAuthenticated, navigate]);

  const pendingSchemes = schemes.filter((s) => s.status === "draft");
  const publishedSchemes = schemes.filter((s) => s.status === "published");
  const activeSchemes = publishedSchemes.filter((s) => s.isActive !== false);
  const inactiveSchemes = publishedSchemes.filter((s) => s.isActive === false);

  const stats = {
    published: publishedSchemes.length,
    active: activeSchemes.length,
    total: schemes.length,
    inactive: inactiveSchemes.length,
    pending: pendingSchemes.length,
  };

  const handleEdit = (scheme: SchemeService) => {
    navigate(`/admin/edit-scheme-service/${scheme.id}`);
  };

  const handleToggleActive = async (scheme: SchemeService) => {
    try {
      await apiClient.updateSchemeService(scheme.id, {
        isActive: !scheme.isActive,
      });

      // Refresh the schemes list
      const response = await apiClient.getSchemeServices();
      setSchemes(response.schemeServices || []);
    } catch (error) {
      console.error("Error updating scheme status:", error);
      setError("Failed to update scheme status");
    }
  };

  const handleDelete = async (scheme: SchemeService) => {
    try {
      await apiClient.deleteSchemeService(scheme.id);
      // Refresh the schemes list
      const response = await apiClient.getSchemeServices();
      setSchemes(response.schemeServices || []);
    } catch (error) {
      console.error("Error deleting scheme:", error);
      setError("Failed to delete scheme");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Scheme Service</h1>
          <p className="text-gray-600 mb-8">
            Manage and review all government schemes and their details here.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                Loading schemes...
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
                      +12% from last month
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
                      Currently in use
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
                      Awaiting approval
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

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="create"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Service
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Pending Services
                  </TabsTrigger>
                  <TabsTrigger
                    value="published"
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Published Services
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
                        Add a new scheme service to the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Ready to create a new scheme service?
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Use our service creation form to add new scheme
                          offerings to the platform
                        </p>
                        <Button size="lg" asChild>
                          <Link to="/admin/create-scheme-service">
                            Create New Scheme Service
                            <Plus className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pending" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Services</CardTitle>
                      <CardDescription>
                        Services awaiting review and approval.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pendingSchemes.length === 0 ? (
                        <div className="text-center py-12">
                          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No pending schemes.
                          </h3>
                          <p className="text-gray-500">
                            All schemes have been reviewed and processed.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {pendingSchemes.map((scheme) => (
                            <Card key={scheme.id} className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">
                                    {scheme.name}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {scheme.summary}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                                      {scheme.status}
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                      {scheme.type}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(scheme)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(scheme)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="published" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Published Services</CardTitle>
                      <CardDescription>
                        Services that are live and available to users.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {publishedSchemes.length === 0 ? (
                        <div className="text-center py-12">
                          <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No published schemes.
                          </h3>
                          <p className="text-gray-500">
                            Publish some schemes to see them here.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {publishedSchemes.map((scheme) => (
                            <Card key={scheme.id} className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">
                                    {scheme.name}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {scheme.summary}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                      {scheme.status}
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                      {scheme.type}
                                    </span>
                                    <span
                                      className={`px-2 py-1 text-xs rounded ${
                                        scheme.isActive !== false
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {scheme.isActive !== false
                                        ? "Active"
                                        : "Inactive"}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant={
                                      scheme.isActive !== false
                                        ? "destructive"
                                        : "default"
                                    }
                                    onClick={() => handleToggleActive(scheme)}
                                  >
                                    {scheme.isActive !== false
                                      ? "Deactivate"
                                      : "Activate"}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(scheme)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(scheme)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
