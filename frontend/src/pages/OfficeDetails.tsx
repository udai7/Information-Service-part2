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
      const officeResponse = await apiClient.getOfficeByName(officeName);
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
      const response = await apiClient.getOfficePosts(officeId);
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Office Details for {officeName}
      </h1>

      {showAddPostForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Post</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="postName">Post Name</Label>
              <Input
                id="postName"
                value={newPost.postName}
                onChange={(e) =>
                  setNewPost({ ...newPost, postName: e.target.value })
                }
                placeholder="e.g., Manager"
              />
            </div>
            <div>
              <Label htmlFor="rank">Rank</Label>
              <Input
                id="rank"
                value={newPost.rank}
                onChange={(e) =>
                  setNewPost({ ...newPost, rank: e.target.value })
                }
                placeholder="e.g., Senior"
              />
            </div>
            <div className="md:col-span-3 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddPostForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddPost}>Add Post</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6">
        {posts.length === 0 && !showAddPostForm ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-4">No posts added yet.</p>
            <Button onClick={() => setShowAddPostForm(true)}>Add Post</Button>
          </div>
        ) : (
          <>
            {posts.length > 0 && !showAddPostForm && (
              <div className="flex justify-end mb-4">
                <Button onClick={() => setShowAddPostForm(true)}>
                  Add More Posts
                </Button>
              </div>
            )}
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>
                      {post.postName} (Rank: {post.rank})
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Employees: {post.employees.length}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpansion(post.id)}
                  >
                    {post.isExpanded ? "Minimize" : "Maximize"}
                  </Button>
                </CardHeader>
                {post.isExpanded && (
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">Employees:</h3>
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
                                      <DialogTitle>Edit Employee</DialogTitle>
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
                                            value={editingEmployee.designation}
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
  );
};

export default OfficeDetails;
