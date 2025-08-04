import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ServicesMenu } from "@/components/ui/sidebar";
import { apiClient } from "../types/api";
import type { ContactService } from "../types/api";

export default function UserContactService() {
  const [apiContactServices, setApiContactServices] = useState<
    ContactService[]
  >([]);
  const [search, setSearch] = useState("");
  const [modalService, setModalService] = useState<any>(null);
  const [filterType, setFilterType] = useState("State"); // 'State' or 'District'
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [departmentTypeFilter, setDepartmentTypeFilter] = useState("all"); // 'all', 'emergency', 'regular'
  const [loading, setLoading] = useState(false);

  const tripuraDistricts = [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
  ];

  const fetchOfficeDetails = async (service: any) => {
    try {
      // Instead of looking for an office by service name,
      // iterate through the service's contacts (offices) and get posts for each
      const allPosts = [];
      const allEmployees = [];
      const officeDetails = [];

      if (service.contacts && service.contacts.length > 0) {
        for (const contact of service.contacts) {
          try {
            // Get posts for this office using the contact's ID as officeId
            const postsResponse = await apiClient.getPublicOfficePosts(
              contact.id,
            );
            if (postsResponse.success && postsResponse.posts) {
              // Format posts to match expected structure
              const formattedPosts = postsResponse.posts.map((post) => ({
                postName: post.postName,
                postRank: post.rank,
                officeIndex: 0,
                description: post.description,
                department: post.department,
                status: post.status,
              }));
              allPosts.push(...formattedPosts);

              // Extract and format employees from posts
              const employees = postsResponse.posts.flatMap((post) =>
                (post.employees || []).map((employee) => ({
                  employeeName: employee.name,
                  email: employee.email,
                  phone: employee.phone,
                  designation: employee.designation,
                  employeeId: employee.employeeId,
                  salary: employee.salary,
                  status: employee.status,
                  postIndex: 0,
                })),
              );
              allEmployees.push(...employees);
            }

            // Add office details
            officeDetails.push({
              officeName: contact.name,
              level: contact.designation,
              district: contact.district,
              subDistrict: contact.subDistrict,
              block: contact.block,
              pincode: "799001", // Default pincode
              address: `${contact.subDistrict}, ${contact.block}, ${contact.district}`,
              contact: contact.contact,
              email: contact.email,
              designation: contact.designation,
              name: contact.name,
            });
          } catch (error) {
            console.error(
              `Error fetching posts for office ${contact.name}:`,
              error,
            );
            // Continue with other offices even if one fails
          }
        }
      }

      return {
        offices: officeDetails,
        posts: allPosts,
        employees: allEmployees,
      };
    } catch (error) {
      console.error("Error in fetchOfficeDetails:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchApiContactServices();
  }, []);

  const fetchApiContactServices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getPublicContactServices();
      const activeServices = (response.contactServices || []).filter(
        (service) =>
          service.status === "published" && service.isActive !== false,
      );
      setApiContactServices(activeServices);
    } catch (error) {
      console.error("Error fetching contact services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter services from API
  const filteredApiServices = apiContactServices.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesDepartmentType =
      departmentTypeFilter === "all" ||
      s.applicationMode === departmentTypeFilter;
    return matchesSearch && matchesDepartmentType;
  });

  const stats = {
    published: apiContactServices.length,
    active: 0,
    total: apiContactServices.length,
  };

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Contact Service</h1>
          <p className="text-gray-600 mb-8">
            Find contact information for service officers.
          </p>
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Published Contact Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.published}
                </div>
                <p className="text-xs text-muted-foreground">
                  +0% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Contact Services
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
                  Total Contact Services
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
          {/* Search Bar */}
          <div className="mb-8 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search contact services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2"
            />
            <Select
              value={departmentTypeFilter}
              onValueChange={setDepartmentTypeFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="emergency">Emergency Services</SelectItem>
                <SelectItem value="regular">Regular Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Cards Grid */}
          {loading && (
            <div className="text-center py-8">
              <div className="text-lg">Loading contact services...</div>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* API Contact Service Cards */}
              {filteredApiServices.map((service) => (
                <Card
                  key={`api-${service.id}`}
                  className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Type: {service.type || "Regular"}
                    </p>
                    <Button
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const officeData = await fetchOfficeDetails(service);

                          if (officeData) {
                            setModalService({
                              ...service,
                              ...officeData,
                            });
                          } else {
                            // Fallback to contact data if office details not found
                            setModalService({
                              ...service,
                              offices:
                                service.contacts?.map((contact) => ({
                                  officeName: contact.name, // Use the actual office name
                                  level: contact.designation, // Use designation which stores the correct level
                                  district: contact.district,
                                  subDistrict: contact.subDistrict,
                                  block: contact.block,
                                  pincode: "799001",
                                  address: `${contact.subDistrict}, ${contact.block}, ${contact.district}`,
                                  contact: contact.contact,
                                  email: contact.email,
                                  designation: contact.designation,
                                  name: contact.name,
                                })) || [],
                              posts: [], // No posts data when using fallback
                              employees: [], // No employees data when using fallback
                            });
                          }
                        } catch (error) {
                          console.error("Error loading office details:", error);
                          // Fallback to basic service data
                          setModalService(service);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="w-full mt-2 bg-blue-600 text-white"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "View Details"}
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* No Services Message */}
              {filteredApiServices.length === 0 && search && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No contact services found matching "{search}".
                  </p>
                </div>
              )}

              {filteredApiServices.length === 0 && !search && !loading && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No published contact services available.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Modal for Contact Service Details */}
          {modalService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative animate-fade-in overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setModalService(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{modalService.name}</h2>
                <p className="mb-2 text-gray-700">{modalService.summary}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Type</h3>
                  <p>{modalService.type}</p>
                </div>

                {/* Filter Dropdowns */}
                {modalService.offices && (
                  <div className="mb-4 flex gap-4">
                    <Select
                      onValueChange={(value) => {
                        setFilterType(value);
                        setSelectedDistrict(""); // Reset district when filter type changes
                      }}
                      value={filterType}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Filter Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="State">State Level</SelectItem>
                        <SelectItem value="District">District Level</SelectItem>
                      </SelectContent>
                    </Select>

                    {filterType === "District" && (
                      <Select
                        onValueChange={(value) => setSelectedDistrict(value)}
                        value={selectedDistrict}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {tripuraDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                {modalService.offices && (
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">
                      Department Structure
                    </h3>
                    {modalService.offices
                      .filter((office: any) => {
                        if (filterType === "State") {
                          return office.level === "State";
                        } else if (
                          filterType === "District" &&
                          selectedDistrict
                        ) {
                          // Show any office in the selected district, regardless of level
                          return office.district === selectedDistrict;
                        }
                        return true; // Show all if no filter or initial state
                      })
                      .map((office: any, officeIdx: number) => (
                        <div
                          key={officeIdx}
                          className="mb-4 p-3 border rounded-md bg-gray-50"
                        >
                          <h4 className="font-semibold text-lg mb-1">
                            Office: {office.officeName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Level: {office.level}, District: {office.district},
                            Pincode: {office.pincode}, Address: {office.address}
                          </p>

                          {/* Posts within this office */}
                          <div className="mt-3">
                            <h5 className="font-semibold text-md mb-1">
                              Posts:
                            </h5>
                            {modalService.posts &&
                            modalService.posts.filter(
                              (post: any) =>
                                post.officeIndex ===
                                modalService.offices.indexOf(office),
                            ).length > 0 ? (
                              <ul className="list-disc pl-6">
                                {modalService.posts
                                  .filter(
                                    (post: any) =>
                                      post.officeIndex ===
                                      modalService.offices.indexOf(office),
                                  )
                                  .map((post: any, postIdx: number) => (
                                    <li key={postIdx} className="mb-2">
                                      <span className="font-medium">
                                        {post.postName}
                                      </span>{" "}
                                      ({post.postRank})
                                      {/* Employees within this post */}
                                      {modalService.employees &&
                                      modalService.employees.filter(
                                        (emp: any) =>
                                          emp.postIndex ===
                                          modalService.posts.indexOf(post),
                                      ).length > 0 ? (
                                        <div className="ml-4 mt-1">
                                          <h6 className="font-semibold text-sm mb-1">
                                            Employees:
                                          </h6>
                                          <ul className="list-disc pl-4">
                                            {modalService.employees
                                              .filter(
                                                (emp: any) =>
                                                  emp.postIndex ===
                                                  modalService.posts.indexOf(
                                                    post,
                                                  ),
                                              )
                                              .map(
                                                (emp: any, empIdx: number) => (
                                                  <li key={empIdx}>
                                                    {emp.employeeName} (
                                                    {emp.designation})
                                                    {emp.email &&
                                                      `, Email: ${emp.email}`}
                                                    {emp.phone &&
                                                      `, Phone: ${emp.phone}`}
                                                  </li>
                                                ),
                                              )}
                                          </ul>
                                        </div>
                                      ) : (
                                        <div className="ml-4 mt-1 text-sm text-gray-500">
                                          No employee details present
                                        </div>
                                      )}
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500 pl-2">
                                No post details present
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Status</h3>
                  <p>{modalService.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
