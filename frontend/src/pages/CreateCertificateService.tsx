import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";

export default function CreateCertificateService() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    certificateAbbreviation: "",
    summary: "",
    applicationMode: "",
    onlineUrl: "",
    offlineAddress: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const certificateData = {
        name: formData.name,
        summary: formData.summary,
        type: formData.certificateAbbreviation,
        targetAudience: [],
        applicationMode: formData.applicationMode as
          | "online"
          | "offline"
          | "both",
        onlineUrl: formData.onlineUrl || undefined,
        offlineAddress: formData.offlineAddress || undefined,
        status: "draft",
      };

      const response = await apiClient.createCertificateService(
        certificateData,
      );

      if (response.certificateService) {
        toast({
          title: "Service Created Successfully!",
          description:
            "Your new certificate service has been created and is now in pending status.",
        });
        navigate("/admin-certificate-service?tab=pending");
      } else {
        throw new Error(
          response.message || "Failed to create certificate service",
        );
      }
    } catch (error) {
      console.error("Error creating certificate service:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/certificate-service">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Certificate Service
                </Link>
              </Button>
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                Create New Certificate Service
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide the essential details about your certificate service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Certificate Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Certificate name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificateAbbreviation">
                  Certificate Abbreviation *
                </Label>
                <Input
                  id="certificateAbbreviation"
                  name="certificateAbbreviation"
                  value={formData.certificateAbbreviation}
                  onChange={handleInputChange}
                  placeholder="Enter Certificate Abbreviation"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Certificate Summary *</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Short summary of the certificate"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="applicationMode">Application Mode *</Label>
                  <Select
                    value={formData.applicationMode}
                    onValueChange={(value) =>
                      handleSelectChange("applicationMode", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Conditionally show URL/Address fields based on Application Mode */}
              {(formData.applicationMode === "Online" ||
                formData.applicationMode === "Both") && (
                <div className="space-y-2">
                  <Label htmlFor="onlineUrl">Online Service URL</Label>
                  <Input
                    id="onlineUrl"
                    name="onlineUrl"
                    value={formData.onlineUrl}
                    onChange={handleInputChange}
                    placeholder="Enter the online service URL"
                  />
                </div>
              )}
              {(formData.applicationMode === "Offline" ||
                formData.applicationMode === "Both") && (
                <div className="space-y-2">
                  <Label htmlFor="offlineAddress">
                    Offline Service Address
                  </Label>
                  <Input
                    id="offlineAddress"
                    name="offlineAddress"
                    value={formData.offlineAddress}
                    onChange={handleInputChange}
                    placeholder="Enter the offline service address"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/certificate-service")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
