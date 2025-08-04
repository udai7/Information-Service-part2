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
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { apiClient } from "../types/api";
import type { Grievance } from "../types/api";

export default function AdminGrievancesService() {
  const [activeTab, setActiveTab] = useState("new");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(
    null,
  );
  const [newGrievances, setNewGrievances] = useState<Grievance[]>([]);
  const [pendingGrievances, setPendingGrievances] = useState<Grievance[]>([]);
  const [solvedGrievances, setSolvedGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    newGrievances: 0,
    pendingGrievances: 0,
    solvedGrievances: 0,
    totalGrievances: 0,
    highPriority: 0,
    avgResolutionTime: 0,
  });

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      // Fetch all grievances by status
      const [newResponse, pendingResponse, solvedResponse] = await Promise.all([
        apiClient.getGrievances({ status: "new" }),
        apiClient.getGrievances({ status: "pending" }),
        apiClient.getGrievances({ status: "solved" }),
      ]);

      const newList = newResponse.grievances || [];
      const pendingList = pendingResponse.grievances || [];
      const solvedList = solvedResponse.grievances || [];

      setNewGrievances(newList);
      setPendingGrievances(pendingList);
      setSolvedGrievances(solvedList);

      // Calculate stats
      const totalGrievances =
        newList.length + pendingList.length + solvedList.length;
      const highPriority = [...newList, ...pendingList, ...solvedList].filter(
        (g) => g.priority === "high" || g.priority === "urgent",
      ).length;

      setStats({
        newGrievances: newList.length,
        pendingGrievances: pendingList.length,
        solvedGrievances: solvedList.length,
        totalGrievances,
        highPriority,
        avgResolutionTime: 2.5, // You can calculate this based on actual data
      });
    } catch (error) {
      console.error("Error fetching grievances:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (grievance: Grievance) => {
    setSelectedGrievance(grievance);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGrievance(null);
  };

  const moveToPending = async (id: number) => {
    try {
      await apiClient.markGrievanceAsPending(
        id,
        "Moved to pending for further review",
      );
      fetchGrievances(); // Refresh data
      closeModal();
    } catch (error) {
      console.error("Error moving grievance to pending:", error);
    }
  };

  const moveToSolved = async (id: number) => {
    try {
      await apiClient.markGrievanceAsSolved(
        id,
        "Grievance resolved successfully",
      );
      fetchGrievances(); // Refresh data
      closeModal();
    } catch (error) {
      console.error("Error solving grievance:", error);
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

  const renderGrievanceCard = (g: Grievance) => (
    <Card key={g.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{g.subject}</span>
          <Badge className={getPriorityColor(g.priority)} variant="secondary">
            {g.priority}
          </Badge>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <span>{g.name}</span>
            <span>•</span>
            <span>{g.email}</span>
            <span>•</span>
            <span>{new Date(g.createdAt).toLocaleDateString()}</span>
          </div>
          {g.trackingId && (
            <div className="mt-1 text-xs">
              <strong>Tracking ID:</strong> {g.trackingId}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{g.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span>
            <strong>Phone:</strong> {g.phone}
          </span>
          {g.category && (
            <span>
              <strong>Category:</strong> {g.category}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => openModal(g)}>
          View Details
        </Button>
        {g.status === "new" && (
          <>
            <Button
              size="sm"
              onClick={() => moveToPending(g.id)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Save for Later
            </Button>
            <Button
              size="sm"
              onClick={() => moveToSolved(g.id)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Mark as Solved
            </Button>
          </>
        )}
        {g.status === "pending" && (
          <Button
            size="sm"
            onClick={() => moveToSolved(g.id)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Mark as Solved
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Grievances Service</h1>
          <p className="text-gray-600 mb-8">
            Manage and review all grievances submitted by users.
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Grievances
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.newGrievances}
                </div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Grievances
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Solved Grievances
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.solvedGrievances}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully resolved
                </p>
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
                <p className="text-xs text-muted-foreground">
                  Urgent attention needed
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="new">New ({stats.newGrievances})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({stats.pendingGrievances})
              </TabsTrigger>
              <TabsTrigger value="solved">
                Solved ({stats.solvedGrievances})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-6">
              {loading ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    Loading grievances...
                  </CardContent>
                </Card>
              ) : newGrievances.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No new grievances.
                  </CardContent>
                </Card>
              ) : (
                newGrievances.map(renderGrievanceCard)
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              {loading ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    Loading grievances...
                  </CardContent>
                </Card>
              ) : pendingGrievances.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No pending grievances.
                  </CardContent>
                </Card>
              ) : (
                pendingGrievances.map(renderGrievanceCard)
              )}
            </TabsContent>

            <TabsContent value="solved" className="space-y-6">
              {loading ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    Loading grievances...
                  </CardContent>
                </Card>
              ) : solvedGrievances.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-gray-500">
                    No solved grievances.
                  </CardContent>
                </Card>
              ) : (
                solvedGrievances.map(renderGrievanceCard)
              )}
            </TabsContent>
          </Tabs>

          {/* Modal for Grievance Details */}
          {modalOpen && selectedGrievance && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Grievance Details</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Name:</strong> {selectedGrievance.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedGrievance.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedGrievance.phone}
                    </div>
                    <div>
                      <strong>Priority:</strong>{" "}
                      <Badge
                        className={getPriorityColor(selectedGrievance.priority)}
                        variant="secondary"
                      >
                        {selectedGrievance.priority}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <strong>Address:</strong> {selectedGrievance.address}
                  </div>

                  {selectedGrievance.category && (
                    <div>
                      <strong>Category:</strong> {selectedGrievance.category}
                    </div>
                  )}

                  <div>
                    <strong>Subject:</strong> {selectedGrievance.subject}
                  </div>

                  <div>
                    <strong>Description:</strong>
                    <p className="mt-1 text-gray-700">
                      {selectedGrievance.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Submitted:</strong>{" "}
                      {new Date(selectedGrievance.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <strong>Tracking ID:</strong>{" "}
                      {selectedGrievance.trackingId}
                    </div>
                  </div>

                  {selectedGrievance.adminNotes && (
                    <div className="bg-gray-100 p-3 rounded">
                      <strong>Admin Notes:</strong>
                      <p className="mt-1">{selectedGrievance.adminNotes}</p>
                    </div>
                  )}

                  {selectedGrievance.assignedTo && (
                    <div>
                      <strong>Assigned to:</strong>{" "}
                      {selectedGrievance.assignedTo}
                    </div>
                  )}

                  {selectedGrievance.resolvedAt && (
                    <div>
                      <strong>Resolved on:</strong>{" "}
                      {new Date(selectedGrievance.resolvedAt).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-2">
                  {selectedGrievance.status === "new" && (
                    <>
                      <Button
                        onClick={() => moveToPending(selectedGrievance.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        Save for Later
                      </Button>
                      <Button
                        onClick={() => moveToSolved(selectedGrievance.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Mark as Solved
                      </Button>
                    </>
                  )}
                  {selectedGrievance.status === "pending" && (
                    <Button
                      onClick={() => moveToSolved(selectedGrievance.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Mark as Solved
                    </Button>
                  )}
                  <Button variant="outline" onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
