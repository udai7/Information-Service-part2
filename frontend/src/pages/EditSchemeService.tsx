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
import { Trash2, PlusCircle } from "lucide-react";
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
import { SchemeService } from "../types/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function EditSchemeService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [schemeService, setSchemeService] = useState<SchemeService | null>(
    null,
  );
  const [step, setStep] = useState(1); // Start with step 1 for eligibility

  // Basic form fields
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [type, setType] = useState("");
  const [targetAudience, setTargetAudience] = useState([""]);
  const [applicationMode, setApplicationMode] = useState("online");
  const [onlineUrl, setOnlineUrl] = useState("");
  const [offlineAddress, setOfflineAddress] = useState("");

  // Detailed form fields
  const [eligibility, setEligibility] = useState([""]);
  const [schemeDetails, setSchemeDetails] = useState([""]);
  const [process, setProcess] = useState([""]);
  const [contacts, setContacts] = useState([
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
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }

    const fetchSchemeService = async () => {
      if (!id) return;

      setLoading(true);
      try {
        console.log("Fetching scheme service with ID:", id);
        const response = await apiClient.getSchemeService(parseInt(id));
        console.log("API response:", response);

        // The response is the JSON directly, not wrapped in data
        const scheme = response.schemeService;
        console.log("Extracted scheme:", scheme);

        setSchemeService(scheme);

        // Populate basic fields
        if (scheme?.name) setName(scheme.name);
        if (scheme?.summary) setSummary(scheme.summary);
        if (scheme?.type) setType(scheme.type);
        if (scheme?.targetAudience) setTargetAudience(scheme.targetAudience);
        if (scheme?.applicationMode) setApplicationMode(scheme.applicationMode);
        if (scheme?.onlineUrl) setOnlineUrl(scheme.onlineUrl);
        if (scheme?.offlineAddress) setOfflineAddress(scheme.offlineAddress);

        // Populate detailed fields
        if (scheme?.eligibilityDetails)
          setEligibility(scheme.eligibilityDetails);
        if (scheme?.schemeDetails) setSchemeDetails(scheme.schemeDetails);
        if (scheme?.processDetails) setProcess(scheme.processDetails);
        if (scheme?.contacts) {
          setContacts(scheme.contacts);
        }
      } catch (error) {
        console.error("Error fetching scheme service:", error);
        setError("Failed to load scheme service");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeService();
  }, [id, isAuthenticated, navigate]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const handleAdd = (setter, arr) => {
    setter([...arr, ""]);
    autoSave();
  };

  const handleChange = (setter, arr, idx, value) => {
    setter(arr.map((v, i) => (i === idx ? value : v)));
    autoSave();
  };

  const handleRemove = (setter, arr, idx) => {
    setter(arr.filter((_, i) => i !== idx));
    autoSave();
  };

  const handleTargetAudienceChange = (index: number, value: string) => {
    const newTargetAudience = [...targetAudience];
    newTargetAudience[index] = value;
    setTargetAudience(newTargetAudience);
    autoSave();
  };

  const addTargetAudience = () => {
    setTargetAudience([...targetAudience, ""]);
    autoSave();
  };

  const removeTargetAudience = (index: number) => {
    if (targetAudience.length > 1) {
      const newTargetAudience = [...targetAudience];
      newTargetAudience.splice(index, 1);
      setTargetAudience(newTargetAudience);
      autoSave();
    }
  };

  // Auto-save functionality with debounce
  const autoSave = async () => {
    if (!schemeService) return;

    // Clear any existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save
    autoSaveTimeoutRef.current = setTimeout(async () => {
      try {
        const updateData = {
          name,
          summary,
          type,
          targetAudience: targetAudience.filter((ta) => ta.trim() !== ""),
          applicationMode,
          onlineUrl,
          offlineAddress,
          eligibilityDetails: eligibility.filter((e) => e.trim() !== ""),
          schemeDetails: schemeDetails.filter((sd) => sd.trim() !== ""),
          processDetails: process.filter((p) => p.trim() !== ""),
          contacts: contacts.filter((c) => c.serviceName.trim() !== ""),
        };

        await apiClient.updateSchemeService(schemeService.id, updateData);

        // Show success toast briefly
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
    }, 2000); // Auto-save after 2 seconds of inactivity
  };

  const saveData = async (status?: string) => {
    if (!schemeService) return;

    setLoading(true);
    try {
      const updateData = {
        eligibilityDetails: eligibility,
        schemeDetails: schemeDetails,
        processDetails: process,
        contacts: contacts,
      };

      await apiClient.updateSchemeService(schemeService.id, updateData);

      if (status) {
        // If status is provided, also update the status separately if needed
        // The backend might handle status updates differently
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schemeService) return;

    setLoading(true);
    try {
      // First save any pending changes
      await saveData();

      // Then publish/republish the scheme service
      await apiClient.publishSchemeService(schemeService.id);

      navigate("/admin-scheme-service", { replace: true });
    } catch (error) {
      console.error("Error publishing scheme:", error);
      setError("Failed to publish scheme service");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSaveAndNext = async () => {
    try {
      await saveData();
      nextStep();
    } catch (error) {
      // Error is already handled in saveData
    }
  };

  const handleContactChange = (idx, e) => {
    const { name, value } = e.target;
    setContacts(
      contacts.map((contact, i) =>
        i === idx ? { ...contact, [name]: value } : contact,
      ),
    );
  };

  const addContact = () => {
    setContacts([
      ...contacts,
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
    ]);
  };

  const removeContact = (idx) => {
    setContacts(contacts.filter((_, i) => i !== idx));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
              <CardDescription>
                Add eligibility requirements for this scheme.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {eligibility.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleChange(
                        setEligibility,
                        eligibility,
                        idx,
                        e.target.value,
                      )
                    }
                    placeholder="Enter eligibility requirement"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleRemove(setEligibility, eligibility, idx)
                    }
                    disabled={eligibility.length === 1}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => handleAdd(setEligibility, eligibility)}
              >
                + Add Eligibility
              </Button>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Scheme Details</CardTitle>
              <CardDescription>Add details about the scheme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {schemeDetails.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Textarea
                    value={item}
                    onChange={(e) =>
                      handleChange(
                        setSchemeDetails,
                        schemeDetails,
                        idx,
                        e.target.value,
                      )
                    }
                    placeholder="Enter scheme detail"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleRemove(setSchemeDetails, schemeDetails, idx)
                    }
                    disabled={schemeDetails.length === 1}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => handleAdd(setSchemeDetails, schemeDetails)}
              >
                + Add Detail
              </Button>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
              <CardDescription>
                Add the steps for the application process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50"
                >
                  <span className="text-lg font-bold text-gray-500">
                    {idx + 1}
                  </span>
                  <Textarea
                    value={item}
                    onChange={(e) =>
                      handleChange(setProcess, process, idx, e.target.value)
                    }
                    placeholder={`Step ${idx + 1} details...`}
                    className="flex-1 bg-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(setProcess, process, idx)}
                    disabled={process.length === 1}
                    className="text-red-500 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAdd(setProcess, process)}
                className="w-full mt-4"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another Step
              </Button>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Add Contact Person</CardTitle>
              <CardDescription>
                Provide contact details for this scheme service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contacts.map((contact, idx) => (
                <div key={idx} className="space-y-4 border p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="district"
                      value={contact.district}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="District"
                    />
                    <Input
                      name="subDistrict"
                      value={contact.subDistrict}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="Sub District"
                    />
                    <Input
                      name="block"
                      value={contact.block}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="Block"
                    />
                    <Input
                      name="name"
                      value={contact.name}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="Contact Person's Name"
                    />
                    <Input
                      name="designation"
                      value={contact.designation}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="Designation"
                    />
                    <Input
                      name="contact"
                      value={contact.contact}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="Contact Number"
                    />
                    <Input
                      name="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange(idx, e)}
                      placeholder="Email Address"
                    />
                  </div>
                  {contacts.length > 1 && (
                    <Button type="button" onClick={() => removeContact(idx)}>
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
          Edit Scheme: {schemeService?.name || "Loading..."}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading && !schemeService && (
          <div className="text-center py-8">
            <div className="text-lg">Loading scheme service...</div>
          </div>
        )}

        {!loading && !schemeService && !error && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-500">
              Scheme service not found
            </div>
          </div>
        )}

        {schemeService && (
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 gap-4 place-content-center bg-white p-6 rounded-lg shadow-md">
              <div className="border p-4 mb-6 rounded-md bg-white shadow-md">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Scheme Details</CardTitle>
                    <CardDescription>
                      Edit the basic information about this scheme.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Scheme Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          autoSave();
                        }}
                        placeholder="Enter scheme name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">
                        Scheme Summary * (minimum 10 characters)
                      </Label>
                      <Textarea
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(e) => {
                          setSummary(e.target.value);
                          autoSave();
                        }}
                        placeholder="Enter a brief summary of the scheme"
                        required
                        rows={3}
                      />
                      <div className="text-sm text-gray-500">
                        {summary.length}/10 characters minimum
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Scheme Type</Label>
                      <Select
                        name="type"
                        value={type}
                        onValueChange={(value) => {
                          setType(value);
                          autoSave();
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select scheme type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Central">
                            Central Government
                          </SelectItem>
                          <SelectItem value="State">
                            State Government
                          </SelectItem>
                          <SelectItem value="Social Welfare">
                            Social Welfare
                          </SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Agriculture">
                            Agriculture
                          </SelectItem>
                          <SelectItem value="Employment">Employment</SelectItem>
                          <SelectItem value="Housing">Housing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Target Audience *</Label>
                      {targetAudience.map((audience, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={audience}
                            onChange={(e) =>
                              handleTargetAudienceChange(index, e.target.value)
                            }
                            placeholder="e.g., Students, Farmers, Women, Senior Citizens"
                            required
                          />
                          {targetAudience.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTargetAudience(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTargetAudience}
                      >
                        + Add Target Audience
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="applicationMode">
                        Application Mode *
                      </Label>
                      <Select
                        name="applicationMode"
                        value={applicationMode}
                        onValueChange={(value) => {
                          setApplicationMode(value);
                          autoSave();
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select application mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online Only</SelectItem>
                          <SelectItem value="offline">Offline Only</SelectItem>
                          <SelectItem value="both">
                            Both Online and Offline
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(applicationMode === "online" ||
                      applicationMode === "both") && (
                      <div className="space-y-2">
                        <Label htmlFor="onlineUrl">
                          Online Application URL *
                        </Label>
                        <Input
                          id="onlineUrl"
                          name="onlineUrl"
                          type="url"
                          value={onlineUrl}
                          onChange={(e) => {
                            setOnlineUrl(e.target.value);
                            autoSave();
                          }}
                          placeholder="https://example.com/apply"
                          required
                        />
                        <div className="text-sm text-gray-500">
                          Must start with http:// or https://
                        </div>
                      </div>
                    )}

                    {(applicationMode === "offline" ||
                      applicationMode === "both") && (
                      <div className="space-y-2">
                        <Label htmlFor="offlineAddress">
                          Offline Application Address *
                        </Label>
                        <Textarea
                          id="offlineAddress"
                          name="offlineAddress"
                          value={offlineAddress}
                          onChange={(e) => {
                            setOfflineAddress(e.target.value);
                            autoSave();
                          }}
                          placeholder="Enter the physical address where applications can be submitted"
                          required
                          rows={3}
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
                    Eligibility
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Scheme Details
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Application Process
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${step === 4 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    Contact Service
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
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save and Next"}
                      </Button>
                    )}
                    {step === 4 && (
                      <Button
                        type="submit"
                        className="bg-green-600 text-white"
                        onClick={handlePublish}
                        disabled={loading}
                      >
                        {loading
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
