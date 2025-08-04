import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useSchemeServices } from "../hooks/useSchemeServices";
import { useAuth } from "../contexts/AuthContext";
import { CreateSchemeServiceRequest } from "../types/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateSchemeService() {
  const navigate = useNavigate();
  const { createService, loading } = useSchemeServices();
  const { isAuthenticated, admin, token } = useAuth();
  const [error, setError] = useState("");

  // Check authentication on component mount
  useEffect(() => {
    console.log("CreateSchemeService - Auth check:", {
      isAuthenticated,
      admin,
      token: token ? "present" : "missing",
    });
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to create scheme services",
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  // Show loading while checking auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div>Checking authentication...</div>
      </div>
    );
  }

  const [formData, setFormData] = useState<CreateSchemeServiceRequest>({
    name: "",
    summary: "",
    type: "",
    targetAudience: [""],
    applicationMode: "online",
    onlineUrl: "",
    offlineAddress: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleTargetAudienceChange = (index: number, value: string) => {
    const newTargetAudience = [...formData.targetAudience];
    newTargetAudience[index] = value;
    setFormData((prev) => ({ ...prev, targetAudience: newTargetAudience }));
  };

  const addTargetAudience = () => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: [...prev.targetAudience, ""],
    }));
  };

  const removeTargetAudience = (index: number) => {
    if (formData.targetAudience.length > 1) {
      const newTargetAudience = [...formData.targetAudience];
      newTargetAudience.splice(index, 1);
      setFormData((prev) => ({ ...prev, targetAudience: newTargetAudience }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Scheme name is required";
    if (formData.name.trim().length < 3)
      return "Scheme name must be at least 3 characters";

    if (!formData.summary.trim()) return "Summary is required";
    if (formData.summary.trim().length < 10)
      return "Summary must be at least 10 characters";

    if (!formData.applicationMode) return "Application mode is required";

    const validTargetAudience = formData.targetAudience.filter(
      (ta) => ta.trim() !== "",
    );
    if (validTargetAudience.length === 0)
      return "At least one target audience is required";

    if (formData.applicationMode === "online" && !formData.onlineUrl?.trim()) {
      return "Online URL is required for online application mode";
    }

    if (formData.onlineUrl?.trim() && !formData.onlineUrl.startsWith("http")) {
      return "Online URL must start with http:// or https://";
    }

    if (
      formData.applicationMode === "offline" &&
      !formData.offlineAddress?.trim()
    ) {
      return "Offline address is required for offline application mode";
    }

    if (formData.applicationMode === "both") {
      if (!formData.onlineUrl?.trim())
        return "Online URL is required for both application mode";
      if (!formData.offlineAddress?.trim())
        return "Offline address is required for both application mode";
      if (!formData.onlineUrl.startsWith("http")) {
        return "Online URL must start with http:// or https://";
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Filter out empty target audience entries
      const cleanedData = {
        ...formData,
        targetAudience: formData.targetAudience.filter(
          (ta) => ta.trim() !== "",
        ),
      };

      const newService = await createService(cleanedData);

      if (newService) {
        toast({
          title: "Success",
          description:
            "Scheme service created successfully! You can now find it in the pending services section.",
        });
        // Navigate to admin dashboard pending section
        navigate("/admin-scheme-service?tab=pending");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create scheme service";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Scheme Service</CardTitle>
              <CardDescription>
                Fill in the basic details for the new scheme service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Scheme Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter scheme name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">
                  Scheme Summary * (minimum 10 characters)
                </Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Enter a brief summary of the scheme (minimum 10 characters)"
                  required
                  disabled={loading}
                  rows={3}
                />
                <div className="text-sm text-gray-500">
                  {formData.summary.length}/10 characters minimum
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Scheme Type</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scheme type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central">Central Government</SelectItem>
                    <SelectItem value="State">State Government</SelectItem>
                    <SelectItem value="Social Welfare">
                      Social Welfare
                    </SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Employment">Employment</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Audience *</Label>
                {formData.targetAudience.map((audience, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={audience}
                      onChange={(e) =>
                        handleTargetAudienceChange(index, e.target.value)
                      }
                      placeholder="e.g., Students, Farmers, Women, Senior Citizens"
                      required
                      disabled={loading}
                    />
                    {formData.targetAudience.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTargetAudience(index)}
                        disabled={loading}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTargetAudience}
                  disabled={loading}
                >
                  + Add Target Audience
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationMode">Application Mode *</Label>
                <Select
                  name="applicationMode"
                  value={formData.applicationMode}
                  onValueChange={(value) =>
                    handleSelectChange("applicationMode", value)
                  }
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select application mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online Only</SelectItem>
                    <SelectItem value="offline">Offline Only</SelectItem>
                    <SelectItem value="both">
                      Both Online and Offline
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.applicationMode === "online" ||
                formData.applicationMode === "both") && (
                <div className="space-y-2">
                  <Label htmlFor="onlineUrl">Online Application URL *</Label>
                  <Input
                    id="onlineUrl"
                    name="onlineUrl"
                    type="url"
                    value={formData.onlineUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/apply"
                    required
                    disabled={loading}
                  />
                  <div className="text-sm text-gray-500">
                    Must start with http:// or https://
                  </div>
                </div>
              )}

              {(formData.applicationMode === "offline" ||
                formData.applicationMode === "both") && (
                <div className="space-y-2">
                  <Label htmlFor="offlineAddress">
                    Offline Application Address *
                  </Label>
                  <Textarea
                    id="offlineAddress"
                    name="offlineAddress"
                    value={formData.offlineAddress}
                    onChange={handleInputChange}
                    placeholder="Enter the physical address where applications can be submitted"
                    required
                    disabled={loading}
                    rows={3}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin-scheme-service")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Scheme Service"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
