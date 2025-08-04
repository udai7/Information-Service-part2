import AdminSidebar from "@/components/ui/AdminSidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CheckCircle,
  Activity,
  Clock,
  Users,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "../types/api";
import type { Feedback } from "../types/api";

export default function AdminFeedbackService() {
  const [activeTab, setActiveTab] = useState("new");
  const [newFeedbacks, setNewFeedbacks] = useState<Feedback[]>([]);
  const [resolvedFeedbacks, setResolvedFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    newFeedbacks: 0,
    resolvedFeedbacks: 0,
    totalFeedbacks: 0,
    avgRating: 0,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      // Fetch new feedbacks
      const newResponse = await apiClient.getFeedbacks({ status: "new" });
      const newFeedbacksList = newResponse.feedbacks || [];
      setNewFeedbacks(newFeedbacksList);

      // Fetch resolved feedbacks
      const resolvedResponse = await apiClient.getFeedbacks({
        status: "resolved",
      });
      const resolvedFeedbacksList = resolvedResponse.feedbacks || [];
      setResolvedFeedbacks(resolvedFeedbacksList);

      // Calculate stats
      const totalFeedbacks =
        newFeedbacksList.length + resolvedFeedbacksList.length;
      const ratingsSum = [...newFeedbacksList, ...resolvedFeedbacksList]
        .filter((f) => f.rating)
        .reduce((sum, f) => sum + (f.rating || 0), 0);
      const ratingsCount = [
        ...newFeedbacksList,
        ...resolvedFeedbacksList,
      ].filter((f) => f.rating).length;

      setStats({
        newFeedbacks: newFeedbacksList.length,
        resolvedFeedbacks: resolvedFeedbacksList.length,
        totalFeedbacks,
        avgRating:
          ratingsCount > 0
            ? Math.round((ratingsSum / ratingsCount) * 10) / 10
            : 0,
      });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id: number) => {
    try {
      await apiClient.resolveFeedback(id, "Resolved by admin");
      // Refresh feedbacks after resolving
      fetchFeedbacks();
    } catch (error) {
      console.error("Error resolving feedback:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Feedback Service</h1>
          <p className="text-gray-600 mb-8">
            Manage and review all feedbacks submitted by users.
          </p>

          {loading ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                Loading feedbacks...
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      New Feedbacks
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.newFeedbacks}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting review
                    </p>
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
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Feedbacks
                    </CardTitle>
                    <Activity className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.totalFeedbacks}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All time total
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Rating
                    </CardTitle>
                    <ThumbsUp className="h-4 w-4 text-yellow-600" />
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
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="new" className="flex items-center gap-2">
                    New Feedbacks ({stats.newFeedbacks})
                  </TabsTrigger>
                  <TabsTrigger
                    value="resolved"
                    className="flex items-center gap-2"
                  >
                    Resolved Feedbacks ({stats.resolvedFeedbacks})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="new" className="space-y-6">
                  {newFeedbacks.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center text-gray-500">
                        No new feedbacks.
                      </CardContent>
                    </Card>
                  ) : (
                    newFeedbacks.map((fb) => (
                      <Card
                        key={fb.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {fb.name}
                            {fb.rating && (
                              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                ⭐ {fb.rating}/5
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {fb.email} •{" "}
                            {new Date(fb.createdAt).toLocaleDateString()}
                            {fb.category && (
                              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {fb.category}
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2">
                            <strong>Subject:</strong> {fb.subject}
                          </div>
                          <div className="mb-4">{fb.message}</div>
                          {fb.phone && (
                            <div className="text-sm text-gray-600">
                              <strong>Phone:</strong> {fb.phone}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => handleResolve(fb.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark as Resolved
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </TabsContent>
                <TabsContent value="resolved" className="space-y-6">
                  {resolvedFeedbacks.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center text-gray-500">
                        No resolved feedbacks.
                      </CardContent>
                    </Card>
                  ) : (
                    resolvedFeedbacks.map((fb) => (
                      <Card
                        key={fb.id}
                        className="hover:shadow-lg transition-shadow bg-green-50"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {fb.name}
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            {fb.rating && (
                              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                ⭐ {fb.rating}/5
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {fb.email} • Resolved:{" "}
                            {fb.resolvedAt
                              ? new Date(fb.resolvedAt).toLocaleDateString()
                              : "N/A"}
                            {fb.category && (
                              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {fb.category}
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2">
                            <strong>Subject:</strong> {fb.subject}
                          </div>
                          <div className="mb-4">{fb.message}</div>
                          {fb.adminNotes && (
                            <div className="bg-gray-100 p-3 rounded text-sm">
                              <strong>Admin Notes:</strong> {fb.adminNotes}
                            </div>
                          )}
                          {fb.resolvedBy && (
                            <div className="text-sm text-gray-600 mt-2">
                              <strong>Resolved by:</strong> {fb.resolvedBy}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
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
