import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { ServicesMenu } from "@/components/ui/sidebar";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Send,
  CheckCircle,
  Clock,
} from "lucide-react";
import { apiClient } from "../types/api";
import type { Feedback, CreateFeedbackRequest } from "../types/api";

export default function UserFeedbackService() {
  const [formData, setFormData] = useState<CreateFeedbackRequest>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    rating: undefined,
    category: "",
  });
  const [userFeedbacks, setUserFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    avgRating: 0,
    newFeedbacks: 0,
    resolvedFeedbacks: 0,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getFeedbacks();
      const feedbacks = response.feedbacks || [];
      setUserFeedbacks(feedbacks);

      // Calculate stats
      const totalFeedbacks = feedbacks.length;
      const ratingsSum = feedbacks
        .filter((f) => f.rating)
        .reduce((sum, f) => sum + (f.rating || 0), 0);
      const ratingsCount = feedbacks.filter((f) => f.rating).length;

      setStats({
        totalFeedbacks,
        avgRating:
          ratingsCount > 0
            ? Math.round((ratingsSum / ratingsCount) * 10) / 10
            : 0,
        newFeedbacks: feedbacks.filter((f) => f.status === "new").length,
        resolvedFeedbacks: feedbacks.filter((f) => f.status === "resolved")
          .length,
      });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateFeedbackRequest,
    value: string | number,
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
      });

      // Refresh feedback list
      fetchFeedbacks();

      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Feedback Service</h1>
          <p className="text-gray-600 mb-8">
            Share your thoughts and help us improve our services.
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Feedbacks
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
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

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Feedbacks Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Recent Community Feedbacks
            </h2>
            {loading ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  Loading feedbacks...
                </CardContent>
              </Card>
            ) : userFeedbacks.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  No feedbacks yet. Be the first to share your thoughts!
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFeedbacks.slice(0, 6).map((feedback) => (
                  <Card
                    key={feedback.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span>{feedback.name}</span>
                        <Badge
                          variant={
                            feedback.status === "resolved"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            feedback.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {feedback.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {feedback.subject}
                        {feedback.rating && (
                          <div className="mt-1">
                            <span className="text-yellow-600">
                              {"⭐".repeat(feedback.rating)} ({feedback.rating}
                              /5)
                            </span>
                          </div>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {feedback.message}
                      </p>
                      {feedback.category && (
                        <Badge variant="outline" className="mt-2">
                          {feedback.category}
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-gray-500">
                        Submitted:{" "}
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
