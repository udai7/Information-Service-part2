import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServicesMenu } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { getServices } from "../lib/localStorageUtils";

export default function UserEmergencyService() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [modalDept, setModalDept] = useState(null);
  const stats = {
    published: 156,
    active: 23,
    total: 179,
  };
  const publishedDepartments = getServices().filter(
    (d) => d.status === "published" && d.category === "Emergency",
  );
  const filteredDepartments = publishedDepartments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Emergency Service</h1>
          <p className="text-gray-600 mb-8">
            Find emergency contact numbers and offices.
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Published Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.published}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.active}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently in use
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.total}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search emergency services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Services</option>
              <option value="police">Police</option>
              <option value="fire">Fire Brigade</option>
              <option value="ambulance">Ambulance</option>
            </select>
          </div>

          {/* Emergency Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <Card
                key={dept.id}
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <CardHeader>
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>{dept.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setModalDept(dept)}
                    className="w-full mt-2 bg-blue-600 text-white"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filteredDepartments.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No emergency services found.
              </div>
            )}
          </div>

          {/* Modal for Department Details */}
          {modalDept && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative animate-fade-in overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setModalDept(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{modalDept.name}</h2>
                <p className="mb-2 text-gray-700">{modalDept.summary}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Offices</h3>
                  <ul className="list-disc pl-6">
                    {modalDept.offices &&
                      modalDept.offices.map((office, idx) => (
                        <li key={idx} className="mb-1">
                          <span className="font-medium">
                            {office.officeName}
                          </span>{" "}
                          - {office.address}, {office.district}, Block:{" "}
                          {office.block}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Posts</h3>
                  <ul className="list-disc pl-6">
                    {modalDept.posts &&
                      modalDept.posts.map((post, idx) => (
                        <li key={idx} className="mb-1">
                          <span className="font-medium">{post.postName}</span>{" "}
                          (Office:{" "}
                          {modalDept.offices &&
                            modalDept.offices[post.officeIndex]?.officeName}
                          )
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Employees</h3>
                  <ul className="list-disc pl-6">
                    {modalDept.employees &&
                      modalDept.employees.map((emp, idx) => (
                        <li key={idx} className="mb-1">
                          <span className="font-medium">
                            {emp.employeeName}
                          </span>{" "}
                          (Post:{" "}
                          {modalDept.posts &&
                            modalDept.posts[emp.postIndex]?.postName}
                          )
                          {emp.email && (
                            <span className="ml-2 text-xs text-gray-500">
                              Email: {emp.email}
                            </span>
                          )}
                          {emp.phone && (
                            <span className="ml-2 text-xs text-gray-500">
                              Phone: {emp.phone}
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
