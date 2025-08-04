import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServicesMenu } from "@/components/ui/sidebar";
import {
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
  MapPin,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "../types/api";
import type { Grievance, CreateGrievanceRequest } from "../types/api";

export default function UserGrievancesService() {
  const [search, setSearch] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState<Grievance | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newTrackingId, setNewTrackingId] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<CreateGrievanceRequest>({
    name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    description: "",
    category: "",
    priority: "medium",
    attachments: [],
  });
  const [userGrievances, setUserGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalGrievances: 0,
    newGrievances: 0,
    pendingGrievances: 0,
    solvedGrievances: 0,
    highPriority: 0,
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Tracking ID copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Copy failed",
        description: "Please copy the tracking ID manually",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getGrievances();
      const grievances = response.grievances || [];
      setUserGrievances(grievances);

      // Calculate stats
      setStats({
        totalGrievances: grievances.length,
        newGrievances: grievances.filter((g) => g.status === "new").length,
        pendingGrievances: grievances.filter((g) => g.status === "pending")
          .length,
        solvedGrievances: grievances.filter((g) => g.status === "solved")
          .length,
        highPriority: grievances.filter(
          (g) => g.priority === "high" || g.priority === "urgent",
        ).length,
      });
    } catch (error) {
      console.error("Error fetching grievances:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateGrievanceRequest,
    value: string | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiClient.createGrievance(formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        subject: "",
        description: "",
        category: "",
        priority: "medium",
        attachments: [],
      });

      // Refresh grievance list
      fetchGrievances();

      // Show success modal with tracking ID
      setNewTrackingId(response.grievance?.trackingId || "");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting grievance:", error);
      toast({
        title: "Submission failed",
        description: "Failed to submit grievance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackGrievance = async () => {
    if (!trackingId.trim()) return;

    try {
      const response = await apiClient.getGrievanceByTracking(
        trackingId.trim(),
      );
      setTrackingResult(response.grievance || null);
    } catch (error) {
      console.error("Error tracking grievance:", error);
      setTrackingResult(null);
      alert("Grievance not found with this tracking ID.");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "solved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredGrievances = userGrievances.filter(
    (g) =>
      g.subject.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Grievances Service</h1>
          <p className="text-gray-600 mb-8">
            Submit your grievances and track their status.
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Grievances
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalGrievances}
                </div>
                <p className="text-xs text-muted-foreground">All submissions</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.newGrievances}
                </div>
                <p className="text-xs text-muted-foreground">Under review</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.pendingGrievances}
                </div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.solvedGrievances}
                </div>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  High Priority
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.highPriority}
                </div>
                <p className="text-xs text-muted-foreground">Urgent cases</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Grievance Submission Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Submit New Grievance
                </CardTitle>
                <CardDescription>
                  Fill out this form to submit your grievance. You'll receive a
                  tracking ID to monitor progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Priority
                      </label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleInputChange("priority", value as any)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Address *
                    </label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                      placeholder="Your complete address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service-related">
                          Service Related
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Issue
                        </SelectItem>
                        <SelectItem value="policy">Policy Related</SelectItem>
                        <SelectItem value="infrastructure">
                          Infrastructure
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      required
                      placeholder="Brief subject of your grievance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      required
                      placeholder="Provide detailed description of your grievance..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Grievance"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Track Grievance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Track Your Grievance
                </CardTitle>
                <CardDescription>
                  Enter your tracking ID to check the status of your grievance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tracking ID
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your tracking ID"
                    />
                    <Button
                      onClick={handleTrackGrievance}
                      disabled={!trackingId.trim()}
                    >
                      Track
                    </Button>
                  </div>
                </div>

                {trackingResult && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Grievance Status</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Subject:</strong> {trackingResult.subject}
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <Badge
                          className={getStatusColor(trackingResult.status)}
                          variant="secondary"
                        >
                          {trackingResult.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>Priority:</strong>
                        <Badge
                          className={getPriorityColor(trackingResult.priority)}
                          variant="secondary"
                        >
                          {trackingResult.priority}
                        </Badge>
                      </div>
                      <div>
                        <strong>Submitted:</strong>{" "}
                        {new Date(
                          trackingResult.createdAt,
                        ).toLocaleDateString()}
                      </div>
                      {trackingResult.resolvedAt && (
                        <div>
                          <strong>Resolved:</strong>{" "}
                          {new Date(
                            trackingResult.resolvedAt,
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Grievances */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Recent Community Grievances
            </h2>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search grievances..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
              />
            </div>

            {loading ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  Loading grievances...
                </CardContent>
              </Card>
            ) : filteredGrievances.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  {search
                    ? `No grievances found matching "${search}".`
                    : "No grievances yet."}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrievances.slice(0, 9).map((grievance) => (
                  <Card
                    key={grievance.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="truncate">{grievance.subject}</span>
                        <Badge
                          className={getPriorityColor(grievance.priority)}
                          variant="secondary"
                        >
                          {grievance.priority}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span>{grievance.name}</span>
                          <Badge
                            className={getStatusColor(grievance.status)}
                            variant="secondary"
                          >
                            {grievance.status}
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs">
                          <strong>ID:</strong> {grievance.trackingId}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {grievance.description}
                      </p>
                      {grievance.category && (
                        <Badge variant="outline" className="mt-2">
                          {grievance.category}
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-gray-500">
                        Submitted:{" "}
                        {new Date(grievance.createdAt).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Grievance Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Your grievance has been successfully submitted. Please save your
              tracking ID for future reference.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-medium text-green-800 mb-2">
                Your Tracking ID:
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-green-200 rounded px-3 py-2 font-mono text-sm text-green-700 select-all">
                  {newTrackingId}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(newTrackingId)}
                  className="shrink-0 border-green-200 text-green-700 hover:bg-green-100"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>What's next?</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>
                  • Use your tracking ID to check the status of your grievance
                </li>
                <li>
                  • You will receive updates via email at the provided address
                </li>
                <li>
                  • Our team will review and respond within 7 business days
                </li>
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1"
              >
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  copyToClipboard(newTrackingId);
                  setShowSuccessModal(false);
                }}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy & Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
