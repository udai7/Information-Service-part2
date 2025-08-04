import { useState, useEffect } from "react";
import {
  apiClient,
  SchemeService,
  CreateSchemeServiceRequest,
  UpdateSchemeServiceRequest,
  SchemeServicesListResponse,
} from "../types/api";
import { toast } from "./use-toast";

export const useSchemeServices = () => {
  const [services, setServices] = useState<SchemeService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    draft: 0,
    pending: 0,
    published: 0,
    total: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchServices = async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response: SchemeServicesListResponse =
        await apiClient.getSchemeServices(params);

      if (response.schemeServices) {
        setServices(response.schemeServices);
      }

      if (response.pagination) {
        setPagination(response.pagination);
      }

      if (response.stats) {
        setStats(response.stats);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch services";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createService = async (
    data: CreateSchemeServiceRequest,
  ): Promise<SchemeService | null> => {
    try {
      setLoading(true);
      setError(null);

      console.log("Creating scheme service with data:", data);

      const response = await apiClient.createSchemeService(data);
      console.log("Create service response:", response);

      if (response.schemeService) {
        // Refresh the services list
        await fetchServices();

        toast({
          title: "Success",
          description: "Scheme service created successfully",
        });

        return response.schemeService;
      }

      return null;
    } catch (err) {
      console.error("Create service error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create service";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (
    id: number,
    data: UpdateSchemeServiceRequest,
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.updateSchemeService(id, data);

      if (response.schemeService) {
        // Update the specific service in the list
        setServices((prev) =>
          prev.map((service) =>
            service.id === id ? response.schemeService! : service,
          ),
        );

        toast({
          title: "Success",
          description: "Scheme service updated successfully",
        });

        return true;
      }

      return false;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update service";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const publishService = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.publishSchemeService(id);

      if (response.schemeService) {
        // Update the specific service in the list
        setServices((prev) =>
          prev.map((service) =>
            service.id === id ? response.schemeService! : service,
          ),
        );

        // Update stats
        setStats((prev) => ({
          ...prev,
          published: prev.published + 1,
          draft: prev.draft - 1,
        }));

        toast({
          title: "Success",
          description: "Scheme service published successfully",
        });

        return true;
      }

      return false;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to publish service";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await apiClient.deleteSchemeService(id);

      // Remove the service from the list
      setServices((prev) => prev.filter((service) => service.id !== id));

      // Update stats
      const deletedService = services.find((s) => s.id === id);
      if (deletedService) {
        setStats((prev) => ({
          ...prev,
          [deletedService.status]:
            prev[deletedService.status as keyof typeof prev] - 1,
          total: prev.total - 1,
        }));
      }

      toast({
        title: "Success",
        description: "Scheme service deleted successfully",
      });

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete service";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    loading,
    error,
    stats,
    pagination,
    fetchServices,
    createService,
    updateService,
    publishService,
    deleteService,
  };
};

export const useSchemeService = (id: number) => {
  const [service, setService] = useState<SchemeService | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchService = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getSchemeService(id);

      if (response.schemeService) {
        setService(response.schemeService);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch service";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  return {
    service,
    loading,
    error,
    refetch: fetchService,
  };
};
