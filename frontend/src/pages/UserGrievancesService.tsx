import { useState, useEffect, useRef } from "react";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
  MapPin,
  Copy,
  CheckCircle2,
  ImagePlus,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { apiClient } from "../types/api";
import type { Grievance, CreateGrievanceRequest, Department } from "../types/api";

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
    departmentId: undefined,
    website: "",
    otp: "",
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [userGrievances, setUserGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
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
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await apiClient.getPublicDepartments();
      setDepartments(response.departments || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getPublicGrievances();
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
    value: string | string[] | number | undefined,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.email) {
      return toast({
        title: "Email Required",
        description: "Please enter your email first.",
        variant: "destructive",
      });
    }
    if (!turnstileToken) {
      return toast({
        title: "Verification Required",
        description: "Please complete the CAPTCHA check.",
        variant: "destructive",
      });
    }

    setSendingOtp(true);
    try {
      await apiClient.sendGrievanceOtp(formData.email, turnstileToken);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your email for the 6-digit verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "An error occurred while sending OTP. You may have reached the daily limit.",
        variant: "destructive",
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiClient.createGrievance(formData);

      // Upload image if one was selected
      if (imageFile && response.grievance?.id) {
        try {
          await apiClient.uploadGrievanceImage(response.grievance.id, imageFile);
        } catch (imgErr) {
          console.error("Image upload failed:", imgErr);
          // Don't fail the whole submission for image upload failure
        }
      }

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
        departmentId: undefined,
        website: "",
        otp: "",
      });
      setImageFile(null);
      setImagePreview(null);
      setOtpSent(false);
      setTurnstileToken("");

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
      toast({
        title: "Not Found",
        description: "Grievance not found with this tracking ID.",
        variant: "destructive",
      });
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
        return "bg-teal-100 text-teal-800";
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
    <div className="flex flex-col md:flex-row min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-300 opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Grievances Service</h1>
              <p className="text-teal-50 text-lg max-w-xl font-medium">
                Submit and track your resolutions securely. Our team ensures all feedback passes through proper channels.
              </p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Grievances
                </CardTitle>
                <FileText className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600">
                  {stats.totalGrievances}
                </div>
                <p className="text-xs text-muted-foreground">All submissions</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New</CardTitle>
                <FileText className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600">
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
                  {/* Honeypot field - visually hidden to stop basic bots */}
                  <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website || ""}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>

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
                      Department (Optional)
                    </label>
                    <Select
                      value={formData.departmentId?.toString() || "none"}
                      onValueChange={(value) =>
                        handleInputChange("departmentId", value === "none" ? undefined : parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No specific department</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
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

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Attach Image (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      ref={imageInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            toast({ title: "File too large", description: "Max 5MB allowed", variant: "destructive" });
                            return;
                          }
                          setImageFile(file);
                          const reader = new FileReader();
                          reader.onload = (ev) => setImagePreview(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => imageInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <ImagePlus className="h-4 w-4" />
                        {imageFile ? "Change Image" : "Choose Image"}
                      </Button>
                      {imageFile && (
                        <span className="text-sm text-gray-600">{imageFile.name}</span>
                      )}
                    </div>
                    {imagePreview && (
                      <div className="mt-2 relative inline-block">
                        <img src={imagePreview} alt="Preview" className="max-h-32 rounded-lg border" />
                        <button
                          type="button"
                          onClick={() => { setImageFile(null); setImagePreview(null); if (imageInputRef.current) imageInputRef.current.value = ""; }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or WebP. Max 5MB. Will be compressed.</p>
                  </div>

                  {!otpSent ? (
                    <div className="space-y-4">
                      <div className="flex justify-center my-4">
                        <Turnstile
                          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                          onSuccess={(token: string) => setTurnstileToken(token)}
                          options={{
                            // we can add extra options, this prevents dev complaining
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        disabled={sendingOtp || !turnstileToken}
                      >
                        {sendingOtp ? "Sending OTP..." : "Verify Identity & Send OTP"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                        <label className="block text-sm font-medium mb-1">
                          Enter 6-digit OTP sent to {formData.email} *
                        </label>
                        <Input
                          type="text"
                          value={formData.otp || ""}
                          onChange={(e) =>
                            handleInputChange("otp", e.target.value)
                          }
                          required
                          placeholder="123456"
                          maxLength={6}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit Grievance"}
                      </Button>
                    </div>
                  )}

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
              <LoadingSpinner
                size="lg"
                variant="card"
                text="Loading grievances..."
              />
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

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-sm text-teal-800">
                <strong>What's next?</strong>
              </p>
              <ul className="text-sm text-teal-700 mt-2 space-y-1">
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
