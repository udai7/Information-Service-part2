import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ServicesMenu } from "@/components/ui/sidebar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../types/api";
import type { CreateFeedbackRequest } from "../types/api";

export default function UserFeedbackService() {
  const [formData, setFormData] = useState<CreateFeedbackRequest>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    rating: undefined,
    category: "",
    departmentId: undefined,
    website: "",
    otp: "",
  });
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    avgRating: 0,
    newFeedbacks: 0,
    resolvedFeedbacks: 0,
  });

  const { data: deptsData } = useQuery({
    queryKey: ["publicDepartments"],
    queryFn: () => apiClient.getPublicDepartments(),
  });

  const { data: feedbacksData, isLoading: loading } = useQuery({
    queryKey: ["publicFeedbacks"],
    queryFn: () => apiClient.getPublicFeedbacks(),
  });

  const departments = deptsData?.departments || [];
  const userFeedbacks = feedbacksData?.feedbacks || [];

  // Calculate stats on data load
  useEffect(() => {
    if (userFeedbacks.length > 0) {
      const totalFeedbacks = userFeedbacks.length;
      const ratingsSum = userFeedbacks
        .filter((f) => f.rating)
        .reduce((sum, f) => sum + (f.rating || 0), 0);
      const ratingsCount = userFeedbacks.filter((f) => f.rating).length;

      setStats({
        totalFeedbacks,
        avgRating:
          ratingsCount > 0
            ? Math.round((ratingsSum / ratingsCount) * 10) / 10
            : 0,
        newFeedbacks: userFeedbacks.filter((f) => f.status === "new").length,
        resolvedFeedbacks: userFeedbacks.filter((f) => f.status === "resolved").length,
      });
    }
  }, [userFeedbacks]);

  const handleInputChange = (
    field: keyof CreateFeedbackRequest,
    value: string | number | undefined,
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
      await apiClient.sendFeedbackOtp(formData.email, turnstileToken);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your email for the 6-digit verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "An error occurred while sending OTP.",
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
      await apiClient.createFeedback(formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        rating: undefined,
        category: "",
        departmentId: undefined,
        website: "",
        otp: "",
      });
      setOtpSent(false);
      setTurnstileToken("");

      // Refetch feedbacks gracefully
      queryClient.invalidateQueries({ queryKey: ["publicFeedbacks"] });

      toast({
        title: "Success",
        description: "Feedback submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission failed",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFeedbacks = userFeedbacks.filter((f) => {
    const matchesSearch =
      f.subject.toLowerCase().includes(search.toLowerCase()) ||
      f.message.toLowerCase().includes(search.toLowerCase()) ||
      f.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || f.status === statusFilter;
    const matchesRating = ratingFilter === "all" || (f.rating && f.rating.toString() === ratingFilter);

    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-300 opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Feedback Service</h1>
              <p className="text-teal-50 text-lg max-w-xl font-medium">
                Share your thoughts and help us improve our services.
              </p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Feedbacks
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600">
                  {stats.totalFeedbacks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Community feedbacks
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.avgRating}/5
                </div>
                <p className="text-xs text-muted-foreground">
                  User satisfaction
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Feedbacks
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.newFeedbacks}
                </div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resolved Feedbacks
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.resolvedFeedbacks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully resolved
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Form */}
          <Card className="w-full mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Submit Feedback
              </CardTitle>
              <CardDescription>
                Share your thoughts and help us improve our services.
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
                      Name *
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
                      Phone (Optional)
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Your phone number"
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
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="service">Service Related</SelectItem>
                        <SelectItem value="technical">
                          Technical Issue
                        </SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    placeholder="Brief subject of your feedback"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    required
                    placeholder="Please provide detailed feedback..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating (Optional)
                  </label>
                  <Select
                    value={formData.rating?.toString()}
                    onValueChange={(value) =>
                      handleInputChange("rating", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Rate your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">⭐ 1 - Poor</SelectItem>
                      <SelectItem value="2">⭐⭐ 2 - Fair</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ 3 - Good</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ 4 - Very Good</SelectItem>
                      <SelectItem value="5">
                        ⭐⭐⭐⭐⭐ 5 - Excellent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="flex justify-center my-4">
                      <Turnstile
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                        onSuccess={(token: string) => setTurnstileToken(token)}
                        options={{
                          // extra config if needed
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
                  <div className="space-y-4 mt-8">
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
                      {submitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Recent Feedbacks Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Recent Community Feedbacks
            </h2>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Search</label>
                    <Input
                      type="text"
                      placeholder="Search subject, message, or name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Ratings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {loading ? (
              <LoadingSpinner
                variant="card"
                size="lg"
                text="Loading feedbacks..."
              />
            ) : filteredFeedbacks.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  {search || statusFilter !== "all" || ratingFilter !== "all"
                    ? "No feedbacks found matching your filters."
                    : "No feedbacks yet. Be the first to share your thoughts!"}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeedbacks.slice(0, 15).map((feedback) => (
                        <TableRow key={feedback.id}>
                          <TableCell className="font-medium">
                            <div className="truncate max-w-[120px]" title={feedback.name}>{feedback.name}</div>
                          </TableCell>
                          <TableCell className="truncate max-w-[150px]" title={feedback.subject}>
                            {feedback.subject}
                            {feedback.category && (
                              <div className="mt-1">
                                <Badge variant="outline" className="text-[10px] uppercase">
                                  {feedback.category}
                                </Badge>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[250px] truncate" title={feedback.message}>
                            {feedback.message}
                          </TableCell>
                          <TableCell>
                            {feedback.rating ? (
                              <div className="text-yellow-500 text-sm whitespace-nowrap">
                                {"★".repeat(feedback.rating)}
                                <span className="text-gray-300">{"★".repeat(5 - feedback.rating)}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs text-center w-full block">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={feedback.status === "resolved" ? "default" : "secondary"}
                              className={
                                feedback.status === "resolved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {feedback.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
