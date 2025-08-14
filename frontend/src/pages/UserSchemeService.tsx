import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServicesMenu } from "@/components/ui/sidebar";
import { ServiceCardSkeleton } from "@/components/ui/loading-skeletons";
import { apiClient } from "../types/api";
import type { SchemeService } from "../types/api";

export default function UserSchemeService() {
  const [search, setSearch] = useState("");
  const [schemeTypeFilter, setSchemeTypeFilter] = useState("all"); // Initialize with "all"
  const [modalScheme, setModalScheme] = useState<SchemeService | null>(null);
  const [apiSchemeServices, setApiSchemeServices] = useState<SchemeService[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const filteredApiSchemes = apiSchemeServices.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      !schemeTypeFilter ||
      schemeTypeFilter === "all" ||
      s.type === schemeTypeFilter;
    return matchesSearch && matchesType;
  });

  const stats = {
    published: apiSchemeServices.length,
    active: apiSchemeServices.length, // All services in apiSchemeServices are active (published and isActive !== false)
    total: apiSchemeServices.length,
  };

  useEffect(() => {
    fetchApiSchemeServices();
  }, []);

  const fetchApiSchemeServices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getSchemeServices();
      const activeServices = (response.schemeServices || []).filter(
        (service) =>
          service.status === "published" && service.isActive !== false,
      );
      setApiSchemeServices(activeServices);
    } catch (error) {
      console.error("Error fetching scheme services:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Schemes</h1>
          <p className="text-gray-600 mb-8">
            Browse available government schemes and view details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Published Schemes
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
                  Active Schemes
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
                  Total Schemes
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
          <div className="mb-8 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search schemes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2"
            />
            <Select
              value={schemeTypeFilter}
              onValueChange={(value) => setSchemeTypeFilter(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Central">Central Government</SelectItem>
                <SelectItem value="State">State Government</SelectItem>
                <SelectItem value="Social Welfare">Social Welfare</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Employment">Employment</SelectItem>
                <SelectItem value="Housing">Housing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Cards Grid */}
          {loading ? (
            <ServiceCardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApiSchemes.map((scheme) => (
                <Card
                  key={`api-${scheme.id}`}
                  className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle>{scheme.name}</CardTitle>
                    <CardDescription>{scheme.summary}</CardDescription>
                    <div className="mt-2 text-sm text-gray-600">
                      {scheme.type && (
                        <div>
                          <span className="font-semibold">Type:</span>{" "}
                          {scheme.type}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold">Application Mode:</span>{" "}
                        {scheme.applicationMode === "both"
                          ? "Online/Offline"
                          : scheme.applicationMode === "online"
                          ? "Online"
                          : "Offline"}
                      </div>
                      {scheme.targetAudience &&
                        scheme.targetAudience.length > 0 && (
                          <div>
                            <span className="font-semibold">
                              Target Audience:
                            </span>{" "}
                            {scheme.targetAudience.join(", ")}
                          </div>
                        )}
                      {scheme.onlineUrl && (
                        <div>
                          <span className="font-semibold">URL:</span>{" "}
                          <a
                            href={scheme.onlineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Apply Online
                          </a>
                        </div>
                      )}
                      {scheme.offlineAddress && (
                        <div>
                          <span className="font-semibold">
                            Offline Address:
                          </span>{" "}
                          <span className="text-gray-700">
                            {scheme.offlineAddress}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => setModalScheme(scheme)}
                      className="w-full mt-2 bg-blue-600 text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* No Services Message */}
              {filteredApiSchemes.length === 0 &&
                (search ||
                  (schemeTypeFilter && schemeTypeFilter !== "all")) && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">
                      No scheme services found matching the current filters
                      {search && ` "${search}"`}
                      {schemeTypeFilter &&
                        schemeTypeFilter !== "all" &&
                        ` (${schemeTypeFilter})`}
                      .
                    </p>
                  </div>
                )}

              {filteredApiSchemes.length === 0 &&
                !search &&
                (!schemeTypeFilter || schemeTypeFilter === "all") &&
                !loading && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">
                      No published scheme services available.
                    </p>
                  </div>
                )}
            </div>
          )}
          {/* Modal for Scheme Details */}
          {modalScheme && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl max-w-4xl w-full p-6 relative animate-fade-in overflow-y-auto max-h-[90vh] border border-blue-200">
                <button
                  onClick={() => setModalScheme(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-blue-800">
                      {modalScheme.name}
                    </h2>
                  </div>
                  <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                    {modalScheme.summary}
                  </p>
                </div>

                {/* Basic Information */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      Basic Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modalScheme.type && (
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-1 text-purple-700">
                          Type
                        </h4>
                        <p className="text-gray-700">{modalScheme.type}</p>
                      </div>
                    )}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold mb-1 text-purple-700">
                        Application Mode
                      </h4>
                      <p className="text-gray-700">
                        {modalScheme.applicationMode === "both"
                          ? "Online/Offline"
                          : modalScheme.applicationMode === "online"
                          ? "Online"
                          : "Offline"}
                      </p>
                    </div>
                    {modalScheme.targetAudience &&
                      modalScheme.targetAudience.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-semibold mb-1 text-purple-700">
                            Target Audience
                          </h4>
                          <p className="text-gray-700">
                            {modalScheme.targetAudience.join(", ")}
                          </p>
                        </div>
                      )}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold mb-1 text-purple-700">
                        Status
                      </h4>
                      <p className="text-gray-700 capitalize">
                        {modalScheme.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Links */}
                {(modalScheme.onlineUrl || modalScheme.offlineAddress) && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        How to Apply
                      </h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      {modalScheme.onlineUrl && (
                        <div className="mb-2">
                          <span className="font-medium text-indigo-700">
                            Online:
                          </span>{" "}
                          <a
                            href={modalScheme.onlineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {modalScheme.onlineUrl}
                          </a>
                        </div>
                      )}
                      {modalScheme.offlineAddress && (
                        <div>
                          <span className="font-medium text-indigo-700">
                            Offline:
                          </span>{" "}
                          <span className="text-gray-700">
                            {modalScheme.offlineAddress}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Eligibility Details */}
                {modalScheme.eligibilityDetails &&
                  modalScheme.eligibilityDetails.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Eligibility Criteria
                        </h3>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <ul className="list-disc pl-6 space-y-1">
                          {modalScheme.eligibilityDetails.map(
                            (item: any, idx: number) => (
                              <li key={idx} className="text-gray-700">
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                {/* Scheme Details */}
                {modalScheme.schemeDetails &&
                  modalScheme.schemeDetails.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Scheme Details
                        </h3>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <ul className="list-disc pl-6 space-y-1">
                          {modalScheme.schemeDetails.map(
                            (item: any, idx: number) => (
                              <li key={idx} className="text-gray-700">
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                {/* Process Details */}
                {modalScheme.processDetails &&
                  modalScheme.processDetails.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Application Process
                        </h3>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <ul className="list-disc pl-6 space-y-1">
                          {modalScheme.processDetails.map(
                            (item: any, idx: number) => (
                              <li key={idx} className="text-gray-700">
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                {/* Contacts */}
                {modalScheme.contacts && modalScheme.contacts.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Contact Details for New Application
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {modalScheme.contacts.map((contact, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-purple-400"
                        >
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-purple-700 mb-2">
                              Contact Person {idx + 1}
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-purple-600 font-medium">
                                Service Name:
                              </span>{" "}
                              <span className="text-gray-700">
                                {modalScheme.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                District:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.district}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                Sub District:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.subDistrict}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                Block:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.block}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                Name:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                Designation:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.designation}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                Contact:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.contact}
                              </span>
                            </div>
                            <div>
                              <span className="text-purple-600 font-medium">
                                Email:
                              </span>{" "}
                              <span className="text-gray-700">
                                {contact.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="pt-4 border-t border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-gray-600">
                      Record Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="bg-white px-3 py-2 rounded shadow-sm">
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(modalScheme.createdAt).toLocaleDateString()}
                    </div>
                    <div className="bg-white px-3 py-2 rounded shadow-sm">
                      <span className="font-medium">Updated:</span>{" "}
                      {new Date(modalScheme.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
