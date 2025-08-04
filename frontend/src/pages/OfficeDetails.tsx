import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { LoadingSpinner } from "../components/ui/loading-spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { apiClient } from "../types/api";
import { toast } from "../hooks/use-toast";
import type { Post, Employee } from "../types/api";

// Extended Post interface for UI state
interface PostWithUIState extends Post {
  isExpanded: boolean;
}

const OfficeDetails: React.FC = () => {
  const { officeName } = useParams<{ officeName: string }>();
  const [posts, setPosts] = useState<PostWithUIState[]>([]);
  const [loading, setLoading] = useState(false);
  const [officeId, setOfficeId] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({
    postName: "",
    rank: "",
    description: "",
    department: "",
  });
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (officeName) {
      fetchOfficeAndPosts(officeName);
    }
  }, [officeName]);

  const fetchOfficeAndPosts = async (officeName: string) => {
    setLoading(true);
    try {
      // First get the office by name to get its ID
      const officeResponse = await apiClient.getPublicOfficeByName(officeName);
      const office = officeResponse.office;
      setOfficeId(office.id!);

      // Then fetch posts for this office
      await fetchPosts(office.id!);
    } catch (error) {
      console.error("Error fetching office:", error);
      toast({
        title: "Error",
        description: "Failed to load office details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (officeId: number) => {
    setLoading(true);
    try {
      const response = await apiClient.getPublicOfficePosts(officeId);
      const postsWithUIState: PostWithUIState[] = response.posts.map(
        (post) => ({
          ...post,
          isExpanded: true,
        }),
      );
      setPosts(postsWithUIState);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async () => {
    if (!officeId || !newPost.postName || !newPost.rank) return;

    try {
      const response = await apiClient.createPost(officeId, {
        postName: newPost.postName,
        rank: newPost.rank,
        description: newPost.description,
        department: newPost.department,
      });

      const newPostWithUIState: PostWithUIState = {
        ...response.post,
        isExpanded: true,
      };

      setPosts([...posts, newPostWithUIState]);
      setNewPost({ postName: "", rank: "", description: "", department: "" });
      setShowAddPostForm(false);

      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const handleAddEmployee = async () => {
    if (
      !officeId ||
      !currentPostId ||
      !newEmployee.name ||
      !newEmployee.email ||
      !newEmployee.phone ||
      !newEmployee.designation
    )
      return;

    try {
      const response = await apiClient.addEmployee(
        officeId,
        currentPostId,
        newEmployee,
      );

      // Update the posts state to include the new employee
      setPosts(
        posts.map((post) =>
          post.id === currentPostId
            ? {
                ...post,
                employees: [...post.employees, response.employee],
              }
            : post,
        ),
      );

      setNewEmployee({ name: "", email: "", phone: "", designation: "" });
      setCurrentPostId(null);
      setShowAddEmployeeDialog(false);

      toast({
        title: "Success",
        description: "Employee added successfully",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive",
      });
    }
  };

  const handleEditEmployee = async () => {
    if (!officeId || !editingEmployee) return;

    try {
      const response = await apiClient.updateEmployee(
        officeId,
        editingEmployee.postId,
        editingEmployee.id,
        {
          name: editingEmployee.name,
          email: editingEmployee.email,
          phone: editingEmployee.phone,
          designation: editingEmployee.designation,
        },
      );

      setPosts(
        posts.map((post) => ({
          ...post,
          employees: post.employees.map((emp) =>
            emp.id === editingEmployee.id ? response.employee : emp,
          ),
        })),
      );

      setEditingEmployee(null);

      toast({
        title: "Success",
        description: "Employee updated successfully",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive",
      });
    }
  };

  const toggleExpansion = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isExpanded: !post.isExpanded } : post,
      ),
    );
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Office Details: {officeName}
            </h1>
            <p className="text-gray-600">
              Manage posts and employees for this office location.
            </p>
          </div>

          {showAddPostForm && (
            <Card className="mb-6 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Add New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postName" className="text-sm font-medium">
                      Post Name
                    </Label>
                    <Input
                      id="postName"
                      value={newPost.postName}
                      onChange={(e) =>
                        setNewPost({ ...newPost, postName: e.target.value })
                      }
                      placeholder="e.g., Manager"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rank" className="text-sm font-medium">
                      Rank
                    </Label>
                    <Input
                      id="rank"
                      value={newPost.rank}
                      onChange={(e) =>
                        setNewPost({ ...newPost, rank: e.target.value })
                      }
                      placeholder="e.g., Senior"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newPost.description}
                      onChange={(e) =>
                        setNewPost({ ...newPost, description: e.target.value })
                      }
                      placeholder="Brief description of the post"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-sm font-medium">
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={newPost.department}
                      onChange={(e) =>
                        setNewPost({ ...newPost, department: e.target.value })
                      }
                      placeholder="Department name"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddPostForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddPost}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Add Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {loading ? (
              <Card className="shadow-lg">
                <CardContent className="py-12 text-center">
                  <LoadingSpinner
                    variant="card"
                    size="lg"
                    text="Loading office details..."
                  />
                </CardContent>
              </Card>
            ) : posts.length === 0 && !showAddPostForm ? (
              <Card className="shadow-lg border-0">
                <CardContent className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No posts added yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start by creating your first post for this office.
                  </p>
                  <Button
                    onClick={() => setShowAddPostForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Add First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {posts.length > 0 && !showAddPostForm && (
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Posts & Employees
                    </h2>
                    <Button
                      onClick={() => setShowAddPostForm(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add New Post
                    </Button>
                  </div>
                )}
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200"
                  >
                    <CardHeader className="bg-gray-50 border-b">
                      <div className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold text-gray-800 mb-1">
                            {post.postName}
                          </CardTitle>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Rank:</span>{" "}
                              {post.rank}
                            </span>
                            {post.department && (
                              <span className="flex items-center gap-1">
                                <span className="font-medium">Department:</span>{" "}
                                {post.department}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Employees:</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  post.employees.length > 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {post.employees.length}
                              </span>
                            </span>
                          </div>
                          {post.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {post.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleExpansion(post.id)}
                          className="ml-4"
                        >
                          {post.isExpanded ? "Collapse" : "Expand"}
                        </Button>
                      </div>
                    </CardHeader>
                    {post.isExpanded && (
                      <CardContent>
                        <h3 className="text-lg font-semibold mb-2">
                          Employees:
                        </h3>
                        {post.employees.length === 0 ? (
                          <p className="text-gray-500 text-sm mb-4">
                            No employees added for this post.
                          </p>
                        ) : (
                          <Table className="mb-4">
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {post.employees.map((employee) => (
                                <TableRow key={employee.id}>
                                  <TableCell>{employee.name}</TableCell>
                                  <TableCell>{employee.email}</TableCell>
                                  <TableCell>{employee.phone}</TableCell>
                                  <TableCell>{employee.designation}</TableCell>
                                  <TableCell>
                                    <Dialog
                                      onOpenChange={(open) =>
                                        !open && setEditingEmployee(null)
                                      }
                                    >
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            setEditingEmployee(employee)
                                          }
                                        >
                                          Edit
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit Employee
                                          </DialogTitle>
                                        </DialogHeader>
                                        {editingEmployee && (
                                          <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                              <Label
                                                htmlFor="editName"
                                                className="text-right"
                                              >
                                                Name
                                              </Label>
                                              <Input
                                                id="editName"
                                                value={editingEmployee.name}
                                                onChange={(e) =>
                                                  setEditingEmployee({
                                                    ...editingEmployee,
                                                    name: e.target.value,
                                                  })
                                                }
                                                className="col-span-3"
                                              />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                              <Label
                                                htmlFor="editEmail"
                                                className="text-right"
                                              >
                                                Email
                                              </Label>
                                              <Input
                                                id="editEmail"
                                                value={editingEmployee.email}
                                                onChange={(e) =>
                                                  setEditingEmployee({
                                                    ...editingEmployee,
                                                    email: e.target.value,
                                                  })
                                                }
                                                className="col-span-3"
                                              />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                              <Label
                                                htmlFor="editPhone"
                                                className="text-right"
                                              >
                                                Phone
                                              </Label>
                                              <Input
                                                id="editPhone"
                                                value={editingEmployee.phone}
                                                onChange={(e) =>
                                                  setEditingEmployee({
                                                    ...editingEmployee,
                                                    phone: e.target.value,
                                                  })
                                                }
                                                className="col-span-3"
                                              />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                              <Label
                                                htmlFor="editDesignation"
                                                className="text-right"
                                              >
                                                Designation
                                              </Label>
                                              <Input
                                                id="editDesignation"
                                                value={
                                                  editingEmployee.designation
                                                }
                                                onChange={(e) =>
                                                  setEditingEmployee({
                                                    ...editingEmployee,
                                                    designation: e.target.value,
                                                  })
                                                }
                                                className="col-span-3"
                                              />
                                            </div>
                                          </div>
                                        )}
                                        <DialogFooter>
                                          <Button
                                            type="submit"
                                            onClick={handleEditEmployee}
                                          >
                                            Save changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}

                        <Dialog
                          open={showAddEmployeeDialog}
                          onOpenChange={(open) => {
                            setShowAddEmployeeDialog(open);
                            if (!open) {
                              setCurrentPostId(null);
                              setNewEmployee({
                                name: "",
                                email: "",
                                phone: "",
                                designation: "",
                              });
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentPostId(post.id);
                                setShowAddEmployeeDialog(true);
                              }}
                            >
                              Add Employee
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Add Employee to {post.postName}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="employeeName"
                                  className="text-right"
                                >
                                  Name
                                </Label>
                                <Input
                                  id="employeeName"
                                  value={newEmployee.name}
                                  onChange={(e) =>
                                    setNewEmployee({
                                      ...newEmployee,
                                      name: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="employeeEmail"
                                  className="text-right"
                                >
                                  Email
                                </Label>
                                <Input
                                  id="employeeEmail"
                                  value={newEmployee.email}
                                  onChange={(e) =>
                                    setNewEmployee({
                                      ...newEmployee,
                                      email: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="employeePhone"
                                  className="text-right"
                                >
                                  Phone
                                </Label>
                                <Input
                                  id="employeePhone"
                                  value={newEmployee.phone}
                                  onChange={(e) =>
                                    setNewEmployee({
                                      ...newEmployee,
                                      phone: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="employeeDesignation"
                                  className="text-right"
                                >
                                  Designation
                                </Label>
                                <Input
                                  id="employeeDesignation"
                                  value={newEmployee.designation}
                                  onChange={(e) =>
                                    setNewEmployee({
                                      ...newEmployee,
                                      designation: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" onClick={handleAddEmployee}>
                                Add Employee
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeDetails;
