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
import { CheckCircle, Plus, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";

export default function CreateContactService() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    type: "",
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

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map the selected type to application mode
      let applicationMode: "emergency" | "regular" = "regular";
      if (formData.type === "Emergency Contacts") {
        applicationMode = "emergency";
      } else if (formData.type === "General Contacts") {
        applicationMode = "regular";
      }

      const contactData = {
        name: formData.name,
        summary: formData.summary,
        type: formData.type,
        targetAudience: [],
        applicationMode,
        onlineUrl: undefined,
        offlineAddress: undefined,
      };

      const response = await apiClient.createContactService(contactData);

      if (response.contactService) {
        toast({
          title: "Service Created Successfully!",
          description:
            "Your new contact service has been created and is now in pending status.",
        });
        navigate("/admin-contact-service?tab=pending");
      } else {
        throw new Error(response.message || "Failed to create contact service");
      }
    } catch (error) {
      console.error("Error creating contact service:", error);
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
                <Link to="/admin-contact-service">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Contact Service
                </Link>
              </Button>
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                Create New Contact Service
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Department Basic Information</CardTitle>
              <CardDescription>
                Provide the essential details about your Department
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Department Summary *</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Short summary of the service"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Department Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger id="type" name="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Emergency Contacts">
                      Emergency Service Provider
                    </SelectItem>
                    <SelectItem value="General Contacts">
                      Regular Service Provider
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Department
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
