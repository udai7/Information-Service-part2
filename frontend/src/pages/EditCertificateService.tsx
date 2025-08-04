import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "../types/api";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";

export default function EditCertificateService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [certificateService, setCertificateService] = useState<any>(null);
  const [step, setStep] = useState(1); // Start with step 1 for process
  const [activeApplicationType, setActiveApplicationType] =
    useState("New Application");

  // Basic form fields
  const [name, setName] = useState("");
  const [certificateAbbreviation, setCertificateAbbreviation] = useState("");
  const [summary, setSummary] = useState("");
  const [applicationMode, setApplicationMode] = useState("");
  const [onlineUrl, setOnlineUrl] = useState("");
  const [offlineAddress, setOfflineAddress] = useState("");

  // Detailed form fields - now application-specific
  const [processSteps, setProcessSteps] = useState({
    "New Application": [{ slNo: "1", stepDetails: "" }],
    "Lost Application": [{ slNo: "1", stepDetails: "" }],
    "Update Application": [{ slNo: "1", stepDetails: "" }],
    "Surrender Application": [{ slNo: "1", stepDetails: "" }],
  });
  const [documents, setDocuments] = useState({
    "New Application": [{ slNo: "1", documentType: "", validProof: "" }],
    "Lost Application": [{ slNo: "1", documentType: "", validProof: "" }],
    "Update Application": [{ slNo: "1", documentType: "", validProof: "" }],
    "Surrender Application": [{ slNo: "1", documentType: "", validProof: "" }],
  });
  const [eligibility, setEligibility] = useState({
    "New Application": [""],
    "Lost Application": [""],
    "Update Application": [""],
    "Surrender Application": [""],
  });
  const [contacts, setContacts] = useState({
    "New Application": [
      {
        serviceName: "",
        district: "",
        subDistrict: "",
        block: "",
        name: "",
        designation: "",
        contact: "",
        email: "",
      },
    ],
    "Lost Application": [
      {
        serviceName: "",
        district: "",
        subDistrict: "",
        block: "",
        name: "",
        designation: "",
        contact: "",
        email: "",
      },
    ],
    "Update Application": [
      {
        serviceName: "",
        district: "",
        subDistrict: "",
        block: "",
        name: "",
        designation: "",
        contact: "",
        email: "",
      },
    ],
    "Surrender Application": [
      {
        serviceName: "",
        district: "",
        subDistrict: "",
        block: "",
        name: "",
        designation: "",
        contact: "",
        email: "",
      },
    ],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }

    const fetchCertificateService = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await apiClient.getCertificateServices();
        const certificateService = response.certificateServices?.find(
          (service: any) => service.id === parseInt(id),
        );

        if (certificateService) {
          setCertificateService(certificateService);
          console.log("Loaded certificate service:", certificateService);

          // Populate basic fields
          if (certificateService.name) setName(certificateService.name);
          if (certificateService.type)
            setCertificateAbbreviation(certificateService.type);
          if (certificateService.summary)
            setSummary(certificateService.summary);
          if (certificateService.applicationMode)
            setApplicationMode(certificateService.applicationMode);
          if (certificateService.onlineUrl)
            setOnlineUrl(certificateService.onlineUrl);
          if (certificateService.offlineAddress) {
            console.log(
              "Setting offline address:",
              certificateService.offlineAddress,
            );
            setOfflineAddress(certificateService.offlineAddress);
          }

          // Populate detailed fields
          if (
            certificateService.processSteps &&
            certificateService.processSteps.length > 0
          ) {
            // Group process steps by application type
            const groupedProcessSteps = {
              "New Application": [],
              "Lost Application": [],
              "Update Application": [],
              "Surrender Application": [],
            };
            certificateService.processSteps.forEach((step: any) => {
              const appType = step.applicationType || "New Application";
              groupedProcessSteps[appType].push({
                slNo: String(step.slNo),
                stepDetails: step.stepDetails,
              });
            });
            // Ensure each type has at least one step
            Object.keys(groupedProcessSteps).forEach((type) => {
              if (groupedProcessSteps[type].length === 0) {
                groupedProcessSteps[type] = [{ slNo: "1", stepDetails: "" }];
              }
            });
            setProcessSteps(groupedProcessSteps);
          }

          if (
            certificateService.eligibilityItems &&
            certificateService.eligibilityItems.length > 0
          ) {
            // Group eligibility by application type
            const groupedEligibility = {
              "New Application": [],
              "Lost Application": [],
              "Update Application": [],
              "Surrender Application": [],
            };
            certificateService.eligibilityItems.forEach((item: any) => {
              const appType = item.applicationType || "New Application";
              groupedEligibility[appType].push(item.eligibilityDetail);
            });
            // Ensure each type has at least one eligibility
            Object.keys(groupedEligibility).forEach((type) => {
              if (groupedEligibility[type].length === 0) {
                groupedEligibility[type] = [""];
              }
            });
            setEligibility(groupedEligibility);
          }

          if (
            certificateService.documents &&
            certificateService.documents.length > 0
          ) {
            // Group documents by application type
            const groupedDocuments = {
              "New Application": [],
              "Lost Application": [],
              "Update Application": [],
              "Surrender Application": [],
            };
            certificateService.documents.forEach((doc: any) => {
              const appType = doc.applicationType || "New Application";
              groupedDocuments[appType].push({
                slNo: String(doc.slNo),
                documentType: doc.documentType || "",
                validProof: doc.validProof || "",
              });
            });
            // Ensure each type has at least one document
            Object.keys(groupedDocuments).forEach((type) => {
              if (groupedDocuments[type].length === 0) {
                groupedDocuments[type] = [
                  { slNo: "1", documentType: "", validProof: "" },
                ];
              }
            });
            setDocuments(groupedDocuments);
          }

          if (
            certificateService.contacts &&
            certificateService.contacts.length > 0
          ) {
            // Group contacts by application type
            const groupedContacts = {
              "New Application": [],
              "Lost Application": [],
              "Update Application": [],
              "Surrender Application": [],
            };
            certificateService.contacts.forEach((contact: any) => {
              const appType = contact.applicationType || "New Application";
              groupedContacts[appType].push(contact);
            });
            // Ensure each type has at least one contact
            Object.keys(groupedContacts).forEach((type) => {
              if (groupedContacts[type].length === 0) {
                groupedContacts[type] = [
                  {
                    serviceName: "",
                    district: "",
                    subDistrict: "",
                    block: "",
                    name: "",
                    designation: "",
                    contact: "",
                    email: "",
                  },
                ];
              }
            });
            setContacts(groupedContacts);
          }
        }
      } catch (error) {
        console.error("Error fetching certificate service:", error);
        setError("Failed to load certificate service");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateService();
  }, [id, isAuthenticated, navigate]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Auto-save functionality with debounce
  const autoSave = async () => {
    if (!certificateService) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(async () => {
      try {
        // Flatten application-specific data for saving
        const allProcessSteps = [];
        const allEligibilityItems = [];
        const allDocuments = [];
        const allContacts = [];

        Object.keys(processSteps).forEach((appType) => {
          processSteps[appType].forEach((step, index) => {
            if (step.stepDetails.trim()) {
              allProcessSteps.push({
                slNo: index + 1,
                stepDetails: step.stepDetails,
                applicationType: appType,
              });
            }
          });
        });

        Object.keys(eligibility).forEach((appType) => {
          eligibility[appType].forEach((item) => {
            if (item.trim()) {
              allEligibilityItems.push({
                eligibilityDetail: item,
                applicationType: appType,
              });
            }
          });
        });

        Object.keys(documents).forEach((appType) => {
          documents[appType].forEach((doc, index) => {
            if (doc.documentType.trim()) {
              allDocuments.push({
                slNo: index + 1,
                documentType: doc.documentType,
                validProof: doc.validProof,
                isRequired: true,
                applicationType: appType,
              });
            }
          });
        });

        Object.keys(contacts).forEach((appType) => {
          contacts[appType].forEach((contact) => {
            if (contact.name.trim()) {
              allContacts.push({
                ...contact,
                applicationType: appType,
              });
            }
          });
        });

        const updateData = {
          name,
          type: certificateAbbreviation,
          summary,
          applicationMode,
          onlineUrl,
          offlineAddress,
          processSteps: allProcessSteps,
          eligibilityItems: allEligibilityItems,
          documents: allDocuments,
          contacts: allContacts,
        };

        console.log("Auto-save update data:", updateData);

        await apiClient.updateCertificateService(
          certificateService.id,
          updateData,
        );

        toast({
          title: "Auto-saved",
          description: "Changes saved automatically",
          duration: 1000,
        });
      } catch (error) {
        console.error("Auto-save failed:", error);
        toast({
          title: "Auto-save failed",
          description: "Your changes could not be saved automatically",
          variant: "destructive",
          duration: 2000,
        });
      }
    }, 2000);
  };

  // Helper functions
  const handleAdd = (setter: any, arr: any) => {
    setter([...arr, ""]);
    autoSave();
  };

  const handleChange = (setter: any, arr: any, idx: number, value: string) => {
    setter(arr.map((v: any, i: number) => (i === idx ? value : v)));
    autoSave();
  };

  const handleRemove = (setter: any, arr: any, idx: number) => {
    setter(arr.filter((_: any, i: number) => i !== idx));
    autoSave();
  };

  const handleProcessStepChange = (idx: number, value: string) => {
    const currentSteps = processSteps[activeApplicationType];
    const newSteps = [...currentSteps];
    newSteps[idx].stepDetails = value;
    setProcessSteps({
      ...processSteps,
      [activeApplicationType]: newSteps,
    });
    autoSave();
  };

  const addProcessStep = () => {
    const currentSteps = processSteps[activeApplicationType];
    setProcessSteps({
      ...processSteps,
      [activeApplicationType]: [
        ...currentSteps,
        { slNo: String(currentSteps.length + 1), stepDetails: "" },
      ],
    });
    autoSave();
  };

  const removeProcessStep = (idx: number) => {
    const currentSteps = processSteps[activeApplicationType];
    if (currentSteps.length > 1) {
      setProcessSteps({
        ...processSteps,
        [activeApplicationType]: currentSteps.filter((_, i) => i !== idx),
      });
      autoSave();
    }
  };

  const handleDocumentChange = (idx: number, field: string, value: string) => {
    const currentDocs = documents[activeApplicationType];
    const newDocs = [...currentDocs];
    newDocs[idx][field as keyof (typeof newDocs)[0]] = value;
    setDocuments({
      ...documents,
      [activeApplicationType]: newDocs,
    });
    autoSave();
  };

  const addDocument = () => {
    const currentDocs = documents[activeApplicationType];
    setDocuments({
      ...documents,
      [activeApplicationType]: [
        ...currentDocs,
        {
          slNo: String(currentDocs.length + 1),
          documentType: "",
          validProof: "",
        },
      ],
    });
    autoSave();
  };

  const removeDocument = (idx: number) => {
    const currentDocs = documents[activeApplicationType];
    if (currentDocs.length > 1) {
      setDocuments({
        ...documents,
        [activeApplicationType]: currentDocs.filter((_, i) => i !== idx),
      });
      autoSave();
    }
  };

  const handleContactChange = (idx: number, field: string, value: string) => {
    const currentContacts = contacts[activeApplicationType];
    const newContacts = [...currentContacts];
    newContacts[idx][field as keyof (typeof newContacts)[0]] = value;
    setContacts({
      ...contacts,
      [activeApplicationType]: newContacts,
    });
    autoSave();
  };

  const addContact = () => {
    const currentContacts = contacts[activeApplicationType];
    setContacts({
      ...contacts,
      [activeApplicationType]: [
        ...currentContacts,
        {
          serviceName: "",
          district: "",
          subDistrict: "",
          block: "",
          name: "",
          designation: "",
          contact: "",
          email: "",
        },
      ],
    });
    autoSave();
  };

  const removeContact = (idx: number) => {
    const currentContacts = contacts[activeApplicationType];
    if (currentContacts.length > 1) {
      setContacts({
        ...contacts,
        [activeApplicationType]: currentContacts.filter((_, i) => i !== idx),
      });
      autoSave();
    }
  };

  const saveData = async () => {
    if (!certificateService || isSaving) return;

    setIsSaving(true);
    try {
      // Flatten application-specific data for saving
      const allProcessSteps = [];
      const allEligibilityItems = [];
      const allDocuments = [];
      const allContacts = [];

      Object.keys(processSteps).forEach((appType) => {
        processSteps[appType].forEach((step, index) => {
          if (step.stepDetails.trim()) {
            allProcessSteps.push({
              slNo: index + 1,
              stepDetails: step.stepDetails,
              applicationType: appType,
            });
          }
        });
      });

      Object.keys(eligibility).forEach((appType) => {
        eligibility[appType].forEach((item) => {
          if (item.trim()) {
            allEligibilityItems.push({
              eligibilityDetail: item,
              applicationType: appType,
            });
          }
        });
      });

      Object.keys(documents).forEach((appType) => {
        documents[appType].forEach((doc, index) => {
          if (doc.documentType.trim()) {
            allDocuments.push({
              slNo: index + 1,
              documentType: doc.documentType,
              validProof: doc.validProof,
              isRequired: true,
              applicationType: appType,
            });
          }
        });
      });

      Object.keys(contacts).forEach((appType) => {
        contacts[appType].forEach((contact) => {
          if (contact.name.trim()) {
            allContacts.push({
              ...contact,
              applicationType: appType,
            });
          }
        });
      });

      const updateData = {
        name,
        type: certificateAbbreviation,
        summary,
        applicationMode,
        onlineUrl,
        offlineAddress,
        processSteps: allProcessSteps,
        eligibilityItems: allEligibilityItems,
        documents: allDocuments,
        contacts: allContacts,
      };

      console.log("Manual save update data:", updateData);

      await apiClient.updateCertificateService(
        certificateService.id,
        updateData,
      );

      toast({
        title: "Saved",
        description: "Changes saved successfully",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save changes");
      toast({
        title: "Save failed",
        description: "Failed to save changes",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateService || isPublishing) return;

    setIsPublishing(true);
    try {
      // First save any pending changes
      await saveData();

      // Then publish the certificate service
      await apiClient.publishCertificateService(certificateService.id);

      toast({
        title: "Published",
        description: "Certificate service published successfully",
        duration: 2000,
      });

      navigate("/admin-certificate-service", { replace: true });
    } catch (error) {
      console.error("Error publishing certificate:", error);
      setError("Failed to publish certificate service");
      toast({
        title: "Publish failed",
        description: "Failed to publish certificate service",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSaveAndNext = async () => {
    if (isSaving) return;

    try {
      await saveData();
      nextStep();
    } catch (error) {
      // Error is already handled in saveData
    }
  };

  const renderStep = () => {
    const currentProcessSteps = processSteps[activeApplicationType] || [];
    const currentDocuments = documents[activeApplicationType] || [];
    const currentEligibility = eligibility[activeApplicationType] || [];
    const currentContacts = contacts[activeApplicationType] || [];

    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Add Process for {activeApplicationType}</CardTitle>
              <CardDescription>
                Add the steps for the certificate application process.
              </CardDescription>
              {/* Application Type Selector */}
              <div className="mt-4">
                <Label>Application Type</Label>
                <Select
                  value={activeApplicationType}
                  onValueChange={setActiveApplicationType}
                >
                  <SelectTrigger>
                    <SelectValue />
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
            </CardHeader>
            <CardContent className="space-y-4">
              {currentProcessSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50"
                >
                  <span className="text-lg font-bold text-gray-500">
                    {idx + 1}
                  </span>
                  <Textarea
                    value={step.stepDetails}
                    onChange={(e) =>
                      handleProcessStepChange(idx, e.target.value)
                    }
                    placeholder={`Step ${idx + 1} details...`}
                    className="flex-1 bg-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProcessStep(idx)}
                    disabled={currentProcessSteps.length === 1}
                    className="text-red-500 hover:bg-red-100"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addProcessStep}
                className="w-full mt-4"
              >
                + Add Another Step
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Add Documents for {activeApplicationType}</CardTitle>
              <CardDescription>
                Add required documents for the certificate service.
              </CardDescription>
              {/* Application Type Selector */}
              <div className="mt-4">
                <Label>Application Type</Label>
                <Select
                  value={activeApplicationType}
                  onValueChange={setActiveApplicationType}
                >
                  <SelectTrigger>
                    <SelectValue />
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
            </CardHeader>
            <CardContent className="space-y-4">
              {currentDocuments.map((doc, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Document Type</Label>
                      <Input
                        value={doc.documentType}
                        onChange={(e) =>
                          handleDocumentChange(
                            idx,
                            "documentType",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Identity Proof"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Valid Proof</Label>
                      <Input
                        value={doc.validProof}
                        onChange={(e) =>
                          handleDocumentChange(
                            idx,
                            "validProof",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Aadhar Card, Passport"
                      />
                    </div>
                  </div>
                  {currentDocuments.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDocument(idx)}
                    >
                      Remove Document
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addDocument}
                className="w-full"
              >
                + Add Document
              </Button>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Add Eligibility for {activeApplicationType}</CardTitle>
              <CardDescription>
                Add eligibility requirements for this certificate.
              </CardDescription>
              {/* Application Type Selector */}
              <div className="mt-4">
                <Label>Application Type</Label>
                <Select
                  value={activeApplicationType}
                  onValueChange={setActiveApplicationType}
                >
                  <SelectTrigger>
                    <SelectValue />
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
            </CardHeader>
            <CardContent className="space-y-4">
              {currentEligibility.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleChange(
                        (newEligibility) =>
                          setEligibility({
                            ...eligibility,
                            [activeApplicationType]: newEligibility,
                          }),
                        currentEligibility,
                        idx,
                        e.target.value,
                      )
                    }
                    placeholder="Enter eligibility requirement"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleRemove(
                        (newEligibility) =>
                          setEligibility({
                            ...eligibility,
                            [activeApplicationType]: newEligibility,
                          }),
                        currentEligibility,
                        idx,
                      )
                    }
                    disabled={currentEligibility.length === 1}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  handleAdd(
                    (newEligibility) =>
                      setEligibility({
                        ...eligibility,
                        [activeApplicationType]: newEligibility,
                      }),
                    currentEligibility,
                  )
                }
              >
                + Add Eligibility
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>
                Add Contact Person for {activeApplicationType}
              </CardTitle>
              <CardDescription>
                Provide contact details for this certificate service.
              </CardDescription>
              {/* Application Type Selector */}
              <div className="mt-4">
                <Label>Application Type</Label>
                <Select
                  value={activeApplicationType}
                  onValueChange={setActiveApplicationType}
                >
                  <SelectTrigger>
                    <SelectValue />
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
            </CardHeader>
            <CardContent className="space-y-4">
              {currentContacts.map((contact, idx) => (
                <div key={idx} className="space-y-4 border p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={contact.district}
                      onChange={(e) =>
                        handleContactChange(idx, "district", e.target.value)
                      }
                      placeholder="District"
                    />
                    <Input
                      value={contact.subDistrict}
                      onChange={(e) =>
                        handleContactChange(idx, "subDistrict", e.target.value)
                      }
                      placeholder="Sub District"
                    />
                    <Input
                      value={contact.block}
                      onChange={(e) =>
                        handleContactChange(idx, "block", e.target.value)
                      }
                      placeholder="Block"
                    />
                    <Input
                      value={contact.name}
                      onChange={(e) =>
                        handleContactChange(idx, "name", e.target.value)
                      }
                      placeholder="Contact Person's Name"
                    />
                    <Input
                      value={contact.designation}
                      onChange={(e) =>
                        handleContactChange(idx, "designation", e.target.value)
                      }
                      placeholder="Designation"
                    />
                    <Input
                      value={contact.contact}
                      onChange={(e) =>
                        handleContactChange(idx, "contact", e.target.value)
                      }
                      placeholder="Contact Number"
                    />
                    <Input
                      value={contact.email}
                      onChange={(e) =>
                        handleContactChange(idx, "email", e.target.value)
                      }
                      placeholder="Email Address"
                    />
                  </div>
                  {currentContacts.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeContact(idx)}
                      variant="destructive"
                      size="sm"
                    >
                      - Remove Contact
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addContact}>
                + Add Contact
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Edit Certificate: {certificateService?.name || "Loading..."}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading && !certificateService && (
          <div className="text-center py-8">
            <div className="text-lg">Loading certificate service...</div>
          </div>
        )}

        {!loading && !certificateService && !error && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-500">
              Certificate service not found
            </div>
          </div>
        )}

        {certificateService && (
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 gap-4 place-content-center bg-white p-6 rounded-lg shadow-md">
              <div className="border p-4 mb-6 rounded-md bg-white shadow-md">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Certificate Details</CardTitle>
                    <CardDescription>
                      Edit the basic information about this certificate.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Certificate Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          autoSave();
                        }}
                        placeholder="Enter Certificate name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificateAbbreviation">
                        Certificate Abbreviation *
                      </Label>
                      <Input
                        id="certificateAbbreviation"
                        name="certificateAbbreviation"
                        value={certificateAbbreviation}
                        onChange={(e) => {
                          setCertificateAbbreviation(e.target.value);
                          autoSave();
                        }}
                        placeholder="Enter Certificate Abbreviation"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Certificate Summary *</Label>
                      <Textarea
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(e) => {
                          setSummary(e.target.value);
                          autoSave();
                        }}
                        placeholder="Short summary of the certificate"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="applicationMode">
                        Application Mode *
                      </Label>
                      <Select
                        value={applicationMode}
                        onValueChange={(value) => {
                          setApplicationMode(value);
                          autoSave();
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Offline">Offline</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(applicationMode === "Online" ||
                      applicationMode === "Both") && (
                      <div className="space-y-2">
                        <Label htmlFor="onlineUrl">Online Service URL</Label>
                        <Input
                          id="onlineUrl"
                          name="onlineUrl"
                          value={onlineUrl}
                          onChange={(e) => {
                            setOnlineUrl(e.target.value);
                            autoSave();
                          }}
                          placeholder="Enter the online service URL"
                        />
                      </div>
                    )}

                    {(applicationMode === "Offline" ||
                      applicationMode === "Both") && (
                      <div className="space-y-2">
                        <Label htmlFor="offlineAddress">
                          Offline Service Address
                        </Label>
                        <Input
                          id="offlineAddress"
                          name="offlineAddress"
                          value={offlineAddress}
                          onChange={(e) => {
                            setOfflineAddress(e.target.value);
                            autoSave();
                          }}
                          placeholder="Enter the offline service address"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="mb-4 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Add Process
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Add Documents
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Add Eligibility
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 4 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Add Contact Person
                  </button>
                </div>

                {renderStep()}
                <div className="flex justify-between mt-8">
                  <div>
                    {step > 1 && (
                      <Button type="button" onClick={prevStep}>
                        Back
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-4">
                    {step < 4 && (
                      <Button
                        type="button"
                        onClick={handleSaveAndNext}
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save and Next"}
                      </Button>
                    )}
                    {step === 4 && (
                      <Button
                        type="submit"
                        className="bg-green-600 text-white"
                        onClick={handlePublish}
                        disabled={isPublishing || isSaving}
                      >
                        {isPublishing
                          ? "Saving and Publishing..."
                          : "Save and Publish"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
