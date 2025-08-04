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
    active: 0,
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
          {loading && (
            <div className="text-center py-8">
              <div className="text-lg">Loading scheme services...</div>
            </div>
          )}

          {!loading && (
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
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 relative animate-fade-in overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setModalScheme(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{modalScheme.name}</h2>
                <p className="mb-4 text-gray-700">{modalScheme.summary}</p>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {modalScheme.type && (
                    <div>
                      <h3 className="font-semibold mb-1">Type</h3>
                      <p className="text-gray-700">{modalScheme.type}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-1">Application Mode</h3>
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
                      <div>
                        <h3 className="font-semibold mb-1">Target Audience</h3>
                        <p className="text-gray-700">
                          {modalScheme.targetAudience.join(", ")}
                        </p>
                      </div>
                    )}
                  <div>
                    <h3 className="font-semibold mb-1">Status</h3>
                    <p className="text-gray-700 capitalize">
                      {modalScheme.status}
                    </p>
                  </div>
                </div>

                {/* Application Links */}
                {(modalScheme.onlineUrl || modalScheme.offlineAddress) && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">How to Apply</h3>
                    {modalScheme.onlineUrl && (
                      <div className="mb-2">
                        <span className="font-medium">Online:</span>{" "}
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
                        <span className="font-medium">Offline:</span>{" "}
                        <span className="text-gray-700">
                          {modalScheme.offlineAddress}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Eligibility Details */}
                {modalScheme.eligibilityDetails &&
                  modalScheme.eligibilityDetails.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">
                        Eligibility Criteria
                      </h3>
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
                  )}

                {/* Scheme Details */}
                {modalScheme.schemeDetails &&
                  modalScheme.schemeDetails.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Scheme Details</h3>
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
                  )}

                {/* Process Details */}
                {modalScheme.processDetails &&
                  modalScheme.processDetails.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">
                        Application Process
                      </h3>
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
                  )}

                {/* Process Steps for Different Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modalScheme.processNew && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        New Application Process
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.processNew}
                        </pre>
                      </div>
                    </div>
                  )}

                  {modalScheme.processUpdate && (
                    <div>
                      <h3 className="font-semibold mb-2">Update Process</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.processUpdate}
                        </pre>
                      </div>
                    </div>
                  )}

                  {modalScheme.processLost && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        Lost Application Process
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.processLost}
                        </pre>
                      </div>
                    </div>
                  )}

                  {modalScheme.processSurrender && (
                    <div>
                      <h3 className="font-semibold mb-2">Surrender Process</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.processSurrender}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Document Requirements */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modalScheme.docNew && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        Documents for New Application
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.docNew}
                        </pre>
                      </div>
                    </div>
                  )}

                  {modalScheme.docUpdate && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        Documents for Update
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.docUpdate}
                        </pre>
                      </div>
                    </div>
                  )}

                  {modalScheme.docLost && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        Documents for Lost Application
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.docLost}
                        </pre>
                      </div>
                    </div>
                  )}

                  {modalScheme.docSurrender && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        Documents for Surrender
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {modalScheme.docSurrender}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contacts */}
                {modalScheme.contacts && modalScheme.contacts.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {modalScheme.contacts.map((contact, idx) => (
                        <div key={idx} className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium">{contact.name}</h4>
                          <p className="text-sm text-gray-600">
                            {contact.designation}
                          </p>
                          <p className="text-sm">{contact.serviceName}</p>
                          <p className="text-sm">
                            {contact.district}, {contact.subDistrict},{" "}
                            {contact.block}
                          </p>
                          <p className="text-sm">Phone: {contact.contact}</p>
                          <p className="text-sm">Email: {contact.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="mt-6 pt-4 border-t text-sm text-gray-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      Created:{" "}
                      {new Date(modalScheme.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      Updated:{" "}
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
