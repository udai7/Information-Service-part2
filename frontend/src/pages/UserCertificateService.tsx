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
import type { CertificateService } from "../types/api";

// Extended type for modal with additional properties
interface ModalCertificateService
  extends Omit<CertificateService, "documents" | "processSteps"> {
  abbreviation?: string;
  processSteps?: any;
  documents?: any;
  eligibility?: any;
  contact?: any;
  serviceDetails?: string;
}

export default function UserCertificateService() {
  const [search, setSearch] = useState("");
  const [modalCert, setModalCert] = useState<ModalCertificateService | null>(
    null,
  );
  const [selectedApplicationType, setSelectedApplicationType] =
    useState("New Application");
  const [apiCertificateServices, setApiCertificateServices] = useState<
    CertificateService[]
  >([]);
  const [loading, setLoading] = useState(false);

  const filteredApiCerts = apiCertificateServices.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = {
    published: apiCertificateServices.length,
    active: 0,
    total: apiCertificateServices.length,
  };

  useEffect(() => {
    fetchApiCertificateServices();
  }, []);

  const fetchApiCertificateServices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getCertificateServices();
      const activeServices = (response.certificateServices || []).filter(
        (service) =>
          service.status === "published" && service.isActive !== false,
      );
      setApiCertificateServices(activeServices);
    } catch (error) {
      console.error("Error fetching certificate services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset application type when modal certificate changes
  useEffect(() => {
    if (modalCert) {
      setSelectedApplicationType("New Application");
    }
  }, [modalCert]);

  return (
    <div className="flex min-h-screen">
      <ServicesMenu />
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Certificates</h1>
          <p className="text-gray-600 mb-8">
            Browse available certificates and view details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Published Certificates
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
                  Active Certificates
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
                  Total Certificates
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
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2"
            />
          </div>
          {/* Cards Grid */}
          {loading && (
            <div className="text-center py-8">
              <div className="text-lg">Loading certificate services...</div>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* API Certificate Service Cards */}
              {filteredApiCerts.map((cert) => (
                <Card
                  key={`api-${cert.id}`}
                  className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle>{cert.name}</CardTitle>
                    <CardDescription>{cert.summary}</CardDescription>
                    <div className="mt-2 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">Abbreviation:</span>{" "}
                        {cert.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold">Application Mode:</span>{" "}
                        {cert.applicationMode === "both"
                          ? "Online/Offline"
                          : cert.applicationMode === "online"
                          ? "Online"
                          : "Offline"}
                      </div>
                      {cert.onlineUrl && (
                        <div>
                          <span className="font-semibold">URL:</span>{" "}
                          <a
                            href={cert.onlineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {cert.onlineUrl}
                          </a>
                        </div>
                      )}
                      {cert.offlineAddress && (
                        <div>
                          <span className="font-semibold">Office Address:</span>{" "}
                          {cert.offlineAddress}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() =>
                        setModalCert({
                          ...cert,
                          abbreviation: cert.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase(),
                          // Transform API data to match modal expectations
                          processSteps: {
                            "New Application":
                              cert.processSteps
                                ?.filter(
                                  (step) =>
                                    step.applicationType === "New Application",
                                )
                                .map((step, index) => ({
                                  slNo: (index + 1).toString(),
                                  stepDetails: step.stepDetails,
                                })) || [],
                            "Update Application":
                              cert.processSteps
                                ?.filter(
                                  (step) =>
                                    step.applicationType ===
                                    "Update Application",
                                )
                                .map((step, index) => ({
                                  slNo: (index + 1).toString(),
                                  stepDetails: step.stepDetails,
                                })) || [],
                            "Lost Application":
                              cert.processSteps
                                ?.filter(
                                  (step) =>
                                    step.applicationType === "Lost Application",
                                )
                                .map((step, index) => ({
                                  slNo: (index + 1).toString(),
                                  stepDetails: step.stepDetails,
                                })) || [],
                            "Surrender Application":
                              cert.processSteps
                                ?.filter(
                                  (step) =>
                                    step.applicationType ===
                                    "Surrender Application",
                                )
                                .map((step, index) => ({
                                  slNo: (index + 1).toString(),
                                  stepDetails: step.stepDetails,
                                })) || [],
                          },
                          documents: {
                            "New Application":
                              cert.documents
                                ?.filter(
                                  (doc) =>
                                    doc.applicationType === "New Application" ||
                                    !doc.applicationType,
                                )
                                .map((doc, index) => ({
                                  slNo: (index + 1).toString(),
                                  documentType: doc.documentType,
                                  validProof: doc.validProof,
                                })) || [],
                            "Update Application":
                              cert.documents
                                ?.filter(
                                  (doc) =>
                                    doc.applicationType ===
                                    "Update Application",
                                )
                                .map((doc, index) => ({
                                  slNo: (index + 1).toString(),
                                  documentType: doc.documentType,
                                  validProof: doc.validProof,
                                })) || [],
                            "Lost Application":
                              cert.documents
                                ?.filter(
                                  (doc) =>
                                    doc.applicationType === "Lost Application",
                                )
                                .map((doc, index) => ({
                                  slNo: (index + 1).toString(),
                                  documentType: doc.documentType,
                                  validProof: doc.validProof,
                                })) || [],
                            "Surrender Application":
                              cert.documents
                                ?.filter(
                                  (doc) =>
                                    doc.applicationType ===
                                    "Surrender Application",
                                )
                                .map((doc, index) => ({
                                  slNo: (index + 1).toString(),
                                  documentType: doc.documentType,
                                  validProof: doc.validProof,
                                })) || [],
                          },
                          eligibility: {
                            "New Application":
                              cert.eligibilityItems
                                ?.filter(
                                  (item) =>
                                    item.applicationType === "New Application",
                                )
                                .map((item) => item.eligibilityDetail) || [],
                            "Update Application":
                              cert.eligibilityItems
                                ?.filter(
                                  (item) =>
                                    item.applicationType ===
                                    "Update Application",
                                )
                                .map((item) => item.eligibilityDetail) || [],
                            "Lost Application":
                              cert.eligibilityItems
                                ?.filter(
                                  (item) =>
                                    item.applicationType === "Lost Application",
                                )
                                .map((item) => item.eligibilityDetail) || [],
                            "Surrender Application":
                              cert.eligibilityItems
                                ?.filter(
                                  (item) =>
                                    item.applicationType ===
                                    "Surrender Application",
                                )
                                .map((item) => item.eligibilityDetail) || [],
                          },
                          contact: {
                            "New Application":
                              cert.contacts?.filter(
                                (contact) =>
                                  contact.applicationType ===
                                    "New Application" ||
                                  !contact.applicationType,
                              ) || [],
                            "Update Application":
                              cert.contacts?.filter(
                                (contact) =>
                                  contact.applicationType ===
                                  "Update Application",
                              ) || [],
                            "Lost Application":
                              cert.contacts?.filter(
                                (contact) =>
                                  contact.applicationType ===
                                  "Lost Application",
                              ) || [],
                            "Surrender Application":
                              cert.contacts?.filter(
                                (contact) =>
                                  contact.applicationType ===
                                  "Surrender Application",
                              ) || [],
                          },
                        })
                      }
                      className="w-full mt-2 bg-blue-600 text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* No Services Message */}
              {filteredApiCerts.length === 0 && search && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No certificate services found matching "{search}".
                  </p>
                </div>
              )}
            </div>
          )}
          {/* Modal for Certificate Details */}
          {modalCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 relative animate-fade-in overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setModalCert(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{modalCert.name}</h2>
                <p className="mb-4 text-gray-700">{modalCert.summary}</p>

                {/* Application Type Dropdown */}
                {modalCert.processSteps && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Application Type
                    </label>
                    <Select
                      value={selectedApplicationType}
                      onValueChange={setSelectedApplicationType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select application type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Application">
                          New Application
                        </SelectItem>
                        <SelectItem value="Lost Application">
                          Lost Application
                        </SelectItem>
                        <SelectItem value="Update Application">
                          Update Application
                        </SelectItem>
                        <SelectItem value="Surrender Application">
                          Surrender Application
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Process Steps */}
                {modalCert.processSteps &&
                  modalCert.processSteps[selectedApplicationType] && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-lg">
                        Process Steps for {selectedApplicationType}
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {modalCert.processSteps[selectedApplicationType].map(
                          (step: any, idx: number) => (
                            <li key={idx}>
                              <span className="font-medium">{step.slNo}.</span>{" "}
                              {step.stepDetails}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {/* Documents */}
                {modalCert.documents &&
                  modalCert.documents[selectedApplicationType] && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-lg">
                        Required Documents for {selectedApplicationType}
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {modalCert.documents[selectedApplicationType].map(
                          (doc: any, idx: number) => (
                            <li key={idx}>
                              <span className="font-medium">{doc.slNo}.</span>{" "}
                              <span className="font-medium">
                                {doc.documentType}
                              </span>{" "}
                              - Valid Proof: {doc.validProof}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {/* Eligibility */}
                {modalCert.eligibility &&
                  modalCert.eligibility[selectedApplicationType] && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-lg">
                        Eligibility Criteria for {selectedApplicationType}
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {modalCert.eligibility[selectedApplicationType].map(
                          (criteria: any, idx: number) => (
                            <li key={idx}>{criteria}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {/* Contact Person */}
                {modalCert.contact &&
                  modalCert.contact[selectedApplicationType] && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-lg">
                        Contact Details for {selectedApplicationType}
                      </h3>
                      {modalCert.contact[selectedApplicationType].map(
                        (contactItem: any, idx: number) => (
                          <div
                            key={idx}
                            className="border border-gray-200 rounded-lg p-4 mb-4"
                          >
                            <h4 className="font-medium mb-2">
                              Contact Person {idx + 1}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">
                                  Service Name:
                                </span>{" "}
                                {contactItem.serviceName}
                              </div>
                              <div>
                                <span className="font-medium">District:</span>{" "}
                                {contactItem.district}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Sub District:
                                </span>{" "}
                                {contactItem.subDistrict}
                              </div>
                              <div>
                                <span className="font-medium">Block:</span>{" "}
                                {contactItem.block}
                              </div>
                              <div>
                                <span className="font-medium">Name:</span>{" "}
                                {contactItem.name}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Designation:
                                </span>{" "}
                                {contactItem.designation}
                              </div>
                              <div>
                                <span className="font-medium">Contact:</span>{" "}
                                {contactItem.contact}
                              </div>
                              <div>
                                <span className="font-medium">Email:</span>{" "}
                                {contactItem.email}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                {/* Basic Certificate Info for non-dummy certificates */}
                {!modalCert.processSteps && (
                  <>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Process Steps</h3>
                      <ul className="list-disc pl-6">
                        {modalCert.processSteps &&
                          modalCert.processSteps.map(
                            (step: any, idx: number) => (
                              <li key={idx}>
                                <span className="font-medium">
                                  {step.slNo}.
                                </span>{" "}
                                {step.stepDetails}
                              </li>
                            ),
                          )}
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Supportive Documents
                      </h3>
                      <ul className="list-disc pl-6">
                        {modalCert.documents &&
                          modalCert.documents.map((doc: any, idx: number) => (
                            <li key={idx}>
                              <span className="font-medium">{doc.slNo}.</span>{" "}
                              {doc.documentType} (Valid Proof: {doc.validProof})
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Contact Person</h3>
                      {modalCert.contact && (
                        <ul className="list-disc pl-6">
                          <li>
                            <span className="font-medium">Service Name:</span>{" "}
                            {modalCert.contact.serviceName}
                          </li>
                          <li>
                            <span className="font-medium">District:</span>{" "}
                            {modalCert.contact.district}
                          </li>
                          <li>
                            <span className="font-medium">Sub District:</span>{" "}
                            {modalCert.contact.subDistrict}
                          </li>
                          <li>
                            <span className="font-medium">Block:</span>{" "}
                            {modalCert.contact.block}
                          </li>
                          <li>
                            <span className="font-medium">Name:</span>{" "}
                            {modalCert.contact.name}
                          </li>
                          <li>
                            <span className="font-medium">Designation:</span>{" "}
                            {modalCert.contact.designation}
                          </li>
                          <li>
                            <span className="font-medium">Contact:</span>{" "}
                            {modalCert.contact.contact}
                          </li>
                          <li>
                            <span className="font-medium">Email:</span>{" "}
                            {modalCert.contact.email}
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Service Details</h3>
                      <p>{modalCert.serviceDetails}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Status</h3>
                      <p>{modalCert.status}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Process Info</h3>
                      <ul className="list-disc pl-6">
                        <li>
                          <span className="font-medium">New:</span>{" "}
                          {modalCert.processNew}
                        </li>
                        <li>
                          <span className="font-medium">Update:</span>{" "}
                          {modalCert.processUpdate}
                        </li>
                        <li>
                          <span className="font-medium">Lost:</span>{" "}
                          {modalCert.processLost}
                        </li>
                        <li>
                          <span className="font-medium">Surrender:</span>{" "}
                          {modalCert.processSurrender}
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
