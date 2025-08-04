import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { apiClient } from "../types/api";
import { toast } from "@/hooks/use-toast";

export default function EditContactDepartment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentService, setCurrentService] = useState<any>(null);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [offices, setOffices] = useState<any[]>([]);
  const [isAddOfficeDialogOpen, setIsAddOfficeDialogOpen] = useState(false);
  const [newOffice, setNewOffice] = useState({
    officeName: "",
    level: "",
    officePinCode: "",
    district: "",
    block: "",
    subdivision: "",
  });

  useEffect(() => {
    const fetchContactService = async () => {
      console.log("fetchContactService called with id:", id);
      console.log("id type:", typeof id);
      console.log("parsed id:", id ? parseInt(id) : "no id");

      if (!id) {
        console.log("No ID provided");
        return;
      }

      try {
        // Get all contact services to find by ID
        console.log("Fetching contact services...");
        const response = await apiClient.getContactServices();
        console.log("API response:", response);
        console.log("Looking for service with ID:", id);
        console.log("Available services:", response.contactServices);
        console.log(
          "Available IDs:",
          response.contactServices?.map((s) => `${s.id} (${typeof s.id})`),
        );

        const contactService = response.contactServices?.find(
          (service: any) =>
            service.id === id ||
            service.id === parseInt(id!) ||
            service.id.toString() === id,
        );

        console.log("Found contact service:", contactService);

        // If not found in list, try to get individual service by ID
        if (!contactService) {
          try {
            console.log("Trying to get individual service by ID:", id);
            const individualResponse = await apiClient.getContactService(
              parseInt(id!),
            );
            console.log("Individual service response:", individualResponse);
            const individualService = individualResponse.contactService;

            if (individualService) {
              console.log(
                "Setting current service from individual call:",
                individualService,
              );
              setCurrentService(individualService);
              setServiceDetails(individualService);
              // Map contacts to office format for display
              if (individualService.contacts) {
                const mappedOffices = individualService.contacts.map(
                  (contact) => ({
                    officeName: contact.name,
                    level: contact.designation,
                    officePinCode: contact.contact,
                    district: contact.district,
                    block: contact.block,
                    subdivision: contact.subDistrict,
                    status: "active",
                  }),
                );
                setOffices(mappedOffices);
                console.log("Mapped offices:", mappedOffices);
              }
              return; // Exit early since we found the service
            }
          } catch (individualError) {
            console.log("Failed to get individual service:", individualError);
          }
        }

        if (contactService) {
          console.log("Setting current service:", contactService);
          setCurrentService(contactService);
          setServiceDetails(contactService);
          // Map contacts to office format for display
          if (contactService.contacts) {
            const mappedOffices = contactService.contacts.map((contact) => ({
              officeName: contact.name,
              level: contact.designation,
              officePinCode: contact.contact,
              district: contact.district,
              block: contact.block,
              subdivision: contact.subDistrict,
              status: "active",
            }));
            setOffices(mappedOffices);
            console.log("Mapped offices:", mappedOffices);
          }
        } else {
          console.log(
            "Service not found, available IDs:",
            response.contactServices?.map((s) => s.id),
          );
          toast({
            title: "Error",
            description: `Contact service not found with ID: ${id}. Available IDs: ${response.contactServices?.map((s) => s.id).join(", ") || "none"}`,
            variant: "destructive",
          });
          navigate("/admin-contact-service");
        }
      } catch (error) {
        console.error("Error fetching contact service:", error);
        toast({
          title: "Error",
          description: "Failed to load contact service",
          variant: "destructive",
        });
        navigate("/admin-contact-service");
      } finally {
        // Loading state removed
      }
    };

    fetchContactService();
  }, [id]);

  const handleNewOfficeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOffice((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewOfficeSelectChange = (name: string, value: string) => {
    if (name === "level" && value === "State") {
      // Clear district when level is set to State
      setNewOffice((prev) => ({ ...prev, [name]: value, district: "" }));
    } else {
      setNewOffice((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOffice = async () => {
    console.log("handleAddOffice called");
    console.log("currentService:", currentService);
    console.log("newOffice:", newOffice);

    if (!currentService) {
      console.log("No current service found");
      toast({
        title: "Error",
        description: "No service selected",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    const isDistrictRequired = newOffice.level !== "State";
    if (
      !newOffice.officeName ||
      !newOffice.level ||
      (isDistrictRequired && !newOffice.district)
    ) {
      const missingFields = [];
      if (!newOffice.officeName) missingFields.push("Office Name");
      if (!newOffice.level) missingFields.push("Level");
      if (isDistrictRequired && !newOffice.district)
        missingFields.push("District");

      toast({
        title: "Error",
        description: `Please fill in all required fields (${missingFields.join(", ")})`,
        variant: "destructive",
      });
      return;
    }

    const newContact = {
      serviceName: currentService.name,
      name: newOffice.officeName,
      designation: newOffice.level,
      contact: newOffice.officePinCode,
      email: "",
      district:
        newOffice.level === "State" ? "All Districts" : newOffice.district,
      subDistrict: newOffice.subdivision || "",
      block: newOffice.block,
    };

    console.log("Creating office with level:", newOffice.level);

    try {
      // Create update data with all contacts including the new one
      const updatedContacts = [...(currentService.contacts || []), newContact];

      const updateData = {
        name: currentService.name,
        summary: currentService.summary,
        type: currentService.type,
        targetAudience: currentService.targetAudience || [],
        applicationMode: currentService.applicationMode,
        onlineUrl: currentService.onlineUrl,
        offlineAddress: currentService.offlineAddress,
        status: currentService.status,
        eligibilityDetails: currentService.eligibilityDetails || [],
        contactDetails: currentService.contactDetails || [],
        processDetails: currentService.processDetails || [],
        contacts: updatedContacts,
      };

      console.log("Sending update to API:", updateData);
      const response = await apiClient.updateContactService(
        currentService.id,
        updateData,
      );
      console.log("API response:", response);

      // Update the current service state with the response from the server
      const updatedService = response.contactService;
      if (updatedService) {
        setCurrentService(updatedService);
        setServiceDetails(updatedService);

        // Update the offices display by mapping the updated contacts
        if (updatedService.contacts) {
          const mappedOffices = updatedService.contacts.map((contact: any) => ({
            officeName: contact.name,
            level: contact.designation,
            officePinCode: contact.contact,
            district: contact.district,
            block: contact.block,
            subdivision: contact.subDistrict,
            status: "active",
          }));
          setOffices(mappedOffices);
        }
      }

      toast({
        title: "Success",
        description: "Office added successfully",
      });

      // Reset the form
      setNewOffice({
        officeName: "",
        level: "",
        officePinCode: "",
        district: "",
        block: "",
        subdivision: "",
      });
      setIsAddOfficeDialogOpen(false);
    } catch (error: any) {
      console.error("Error adding office:", error);
      toast({
        title: "Error",
        description: `Failed to add office: ${error?.message || "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  const handleToggleOfficeStatus = async (index: number) => {
    if (!currentService) return;

    const updatedOffices = offices.map((office, i) =>
      i === index
        ? {
            ...office,
            status: office.status === "active" ? "inactive" : "active",
          }
        : office,
    );
    setOffices(updatedOffices);

    try {
      const updateData = {
        ...currentService,
        status: updatedOffices[index].status,
      };

      await apiClient.updateContactService(currentService.id, updateData);

      toast({
        title: "Success",
        description: "Office status updated successfully",
      });
    } catch (error) {
      console.error("Error updating office status:", error);
      toast({
        title: "Error",
        description: "Failed to update office status",
        variant: "destructive",
      });
      // Revert the UI change
      setOffices(offices);
    }
  };

  const handleViewOffice = (office: any) => {
    navigate(`/admin/office-details/${office.officeName}`);
  };

  const handlePublishService = async () => {
    try {
      // Update service details first
      const updateData = {
        name: serviceDetails?.name,
        summary: serviceDetails?.summary,
        type: serviceDetails?.type,
      };

      await apiClient.updateContactService(parseInt(id!), updateData);

      // Then publish the service
      await apiClient.publishContactService(parseInt(id!));

      toast({
        title: "Service Published Successfully!",
        description: "The contact service has been published and is now live.",
      });

      navigate("/admin-contact-service?tab=published");
    } catch (error) {
      console.error("Error publishing service:", error);
      toast({
        title: "Error",
        description: "Failed to publish service. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Edit Department: {serviceDetails?.name || ""}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Service Details */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>
                  Update the essential details about your Department
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Department Name *</Label>
                  <Input
                    id="serviceName"
                    name="serviceName"
                    value={serviceDetails?.name || ""}
                    onChange={(e) =>
                      setServiceDetails((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter department name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceSummary">Department Summary *</Label>
                  <textarea
                    id="serviceSummary"
                    name="serviceSummary"
                    value={serviceDetails?.summary || ""}
                    onChange={(e) =>
                      setServiceDetails((prev: any) => ({
                        ...prev,
                        summary: e.target.value,
                      }))
                    }
                    placeholder="Short summary of the service"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Department Type *</Label>
                  <Select
                    value={serviceDetails?.type || ""}
                    onValueChange={(value) =>
                      setServiceDetails((prev: any) => ({
                        ...prev,
                        type: value,
                      }))
                    }
                  >
                    <SelectTrigger id="serviceType" name="serviceType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency Contacts">
                        Emergency Service Provider
                      </SelectItem>
                      <SelectItem value="General Contacts">
                        Regular Service Provider
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            <Button
              onClick={() => setIsAddOfficeDialogOpen(true)}
              className="mt-4 w-full"
            >
              + Add Office
            </Button>
            <Button
              onClick={handlePublishService}
              className="mt-2 w-full bg-green-600 hover:bg-green-700"
            >
              Publish Service
            </Button>
          </div>

          {/* Right Column: Office Management */}
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Offices</CardTitle>
              </CardHeader>
              <CardContent>
                {offices.length === 0 ? (
                  <p className="text-gray-500">No offices added yet.</p>
                ) : (
                  <div className="grid gap-4">
                    {offices.map((office, index) => (
                      <Card
                        key={index}
                        className="flex justify-between items-center p-4"
                      >
                        <div>
                          <CardTitle className="text-lg">
                            {office.officeName}
                          </CardTitle>
                          <CardDescription>
                            {office.level} - {office.district}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewOffice(office)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleOfficeStatus(index)}
                          >
                            {office.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Office Dialog */}
        <Dialog
          open={isAddOfficeDialogOpen}
          onOpenChange={setIsAddOfficeDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Office</DialogTitle>
              <DialogDescription>
                Enter the details for the new office.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="officeName" className="text-right">
                  Office Name
                </Label>
                <Input
                  id="officeName"
                  name="officeName"
                  value={newOffice.officeName}
                  onChange={handleNewOfficeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Level
                </Label>
                <Select
                  name="level"
                  value={newOffice.level}
                  onValueChange={(value) =>
                    handleNewOfficeSelectChange("level", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="State">State</SelectItem>
                    <SelectItem value="District">District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="officePinCode" className="text-right">
                  Pincode
                </Label>
                <Input
                  id="officePinCode"
                  name="officePinCode"
                  value={newOffice.officePinCode}
                  onChange={handleNewOfficeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="district" className="text-right">
                  District
                </Label>
                <Select
                  value={newOffice.district}
                  onValueChange={(value) =>
                    handleNewOfficeSelectChange("district", value)
                  }
                  disabled={newOffice.level === "State"}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={
                        newOffice.level === "State"
                          ? "Not applicable for State level"
                          : "Select district"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dhalai">Dhalai</SelectItem>
                    <SelectItem value="Gomati">Gomati</SelectItem>
                    <SelectItem value="Khowai">Khowai</SelectItem>
                    <SelectItem value="North Tripura">North Tripura</SelectItem>
                    <SelectItem value="Sepahijala">Sepahijala</SelectItem>
                    <SelectItem value="South Tripura">South Tripura</SelectItem>
                    <SelectItem value="Unakoti">Unakoti</SelectItem>
                    <SelectItem value="West Tripura">West Tripura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="block" className="text-right">
                  Block
                </Label>
                <Input
                  id="block"
                  name="block"
                  value={newOffice.block}
                  onChange={handleNewOfficeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subdivision" className="text-right">
                  Subdivision
                </Label>
                <Input
                  id="subdivision"
                  name="subdivision"
                  value={newOffice.subdivision}
                  onChange={handleNewOfficeChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  console.log("Save Office button clicked");
                  handleAddOffice();
                }}
              >
                Save Office
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
