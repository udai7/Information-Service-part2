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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiClient } from "../types/api";
import { toast } from "@/hooks/use-toast";

export default function EditContactDepartment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentService, setCurrentService] = useState<any>(null);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [offices, setOffices] = useState<any[]>([]);
  const [isAddOfficeDialogOpen, setIsAddOfficeDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [officeToDeleteIndex, setOfficeToDeleteIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
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
      if (!id) return;

      try {
        // Try direct fetch first
        const response = await apiClient.getContactService(parseInt(id));
        const service = response.contactService;

        if (service) {
          setCurrentService(service);
          setServiceDetails(service);
          if (service.contacts) {
            const mappedOffices = service.contacts.map((contact: any) => ({
              id: contact.id,
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
        } else {
          toast({
            title: "Error",
            description: "Contact service not found",
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
      }
    };

    fetchContactService();
  }, [id, navigate]);

  const handleNewOfficeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOffice((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewOfficeSelectChange = (name: string, value: string) => {
    if (name === "level" && value === "State") {
      setNewOffice((prev) => ({ ...prev, [name]: value, district: "" }));
    } else {
      setNewOffice((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOffice = async () => {
    if (!currentService) {
      toast({
        title: "Error",
        description: "No service selected",
        variant: "destructive",
      });
      return;
    }

    const isDistrictRequired = newOffice.level !== "State";
    if (
      !newOffice.officeName ||
      !newOffice.level ||
      (isDistrictRequired && !newOffice.district)
    ) {
      const missingFields = [];
      if (!newOffice.officeName) missingFields.push("Office Name");
      if (!newOffice.level) missingFields.push("Level");
      if (isDistrictRequired && !newOffice.district) missingFields.push("District");

      toast({
        title: "Missing Fields",
        description: `Please fill: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Use the new dedicated endpoint to add office without destroying existing data
      const response = await apiClient.addOfficeToContactService(
        currentService.id,
        {
          officeName: newOffice.officeName,
          level: newOffice.level,
          pincode: newOffice.officePinCode,
          district: newOffice.level === "State" ? "All Districts" : newOffice.district,
          block: newOffice.block,
          subdivision: newOffice.subdivision,
        },
      );

      if (response.success && response.office) {
        // Add the new office to local state
        setOffices((prev) => [
          ...prev,
          {
            id: response.office.id,
            officeName: response.office.name,
            level: response.office.designation,
            officePinCode: response.office.contact,
            district: response.office.district,
            block: response.office.block,
            subdivision: response.office.subDistrict,
            status: "active",
          },
        ]);

        // Refresh the full service to keep state in sync
        const refreshed = await apiClient.getContactService(currentService.id);
        if (refreshed.contactService) {
          setCurrentService(refreshed.contactService);
        }

        toast({
          title: "Success",
          description: "Office added successfully",
        });

        setNewOffice({
          officeName: "",
          level: "",
          officePinCode: "",
          district: "",
          block: "",
          subdivision: "",
        });
        setIsAddOfficeDialogOpen(false);
      }
    } catch (error: any) {
      console.error("Error adding office:", error);
      toast({
        title: "Error",
        description: `Failed to add office: ${error?.message || "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteOffice = async () => {
    if (!currentService || officeToDeleteIndex === null) return;

    const officeToDelete = offices[officeToDeleteIndex];
    if (!officeToDelete.id) {
      toast({
        title: "Error",
        description: "Office ID not found",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiClient.deleteContactFromService(
        currentService.id,
        officeToDelete.id,
      );

      const updatedOffices = offices.filter((_, i) => i !== officeToDeleteIndex);
      setOffices(updatedOffices);

      toast({
        title: "Success",
        description: "Office deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting office:", error);
      toast({
        title: "Error",
        description: "Failed to delete office",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setOfficeToDeleteIndex(null);
    }
  };

  const handleViewOffice = (office: any) => {
    navigate(`/admin/office-details/${office.officeName}`);
  };

  const handleSaveDetails = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      await apiClient.updateContactService(parseInt(id), {
        name: serviceDetails?.name,
        summary: serviceDetails?.summary,
        type: serviceDetails?.type,
      });
      toast({
        title: "Success",
        description: "Department details saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save details.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishService = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      await apiClient.updateContactService(parseInt(id), {
        name: serviceDetails?.name,
        summary: serviceDetails?.summary,
        type: serviceDetails?.type,
      });

      await apiClient.publishContactService(parseInt(id));

      toast({
        title: "Service Published!",
        description: "The contact service is now live.",
      });

      navigate("/admin-contact-service?tab=published");
    } catch (error) {
      console.error("Error publishing service:", error);
      toast({
        title: "Error",
        description: "Failed to publish service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              onClick={handleSaveDetails}
              className="mt-4 w-full"
              variant="outline"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Details"}
            </Button>
            <Button
              onClick={() => setIsAddOfficeDialogOpen(true)}
              className="mt-2 w-full"
            >
              + Add Office
            </Button>
            <Button
              onClick={handlePublishService}
              className="mt-2 w-full bg-green-600 hover:bg-green-700"
              disabled={isSaving}
            >
              {isSaving ? "Publishing..." : "Publish Service"}
            </Button>
          </div>

          {/* Right Column: Office Management */}
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Offices ({offices.length})</CardTitle>
                <CardDescription>
                  Add offices, then click View to manage posts and employees within each office.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {offices.length === 0 ? (
                  <p className="text-gray-500">No offices added yet. Add an office to get started.</p>
                ) : (
                  <div className="grid gap-4">
                    {offices.map((office, index) => (
                      <Card
                        key={office.id || index}
                        className="flex justify-between items-center p-4"
                      >
                        <div>
                          <CardTitle className="text-lg">
                            {office.officeName}
                          </CardTitle>
                          <CardDescription>
                            {office.level} - {office.district}
                            {office.block && ` - ${office.block}`}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewOffice(office)}
                          >
                            View / Manage
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setOfficeToDeleteIndex(index);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Delete
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
              <Button onClick={handleAddOffice} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Office"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Office</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the office "
                {officeToDeleteIndex !== null ? offices[officeToDeleteIndex]?.officeName : ""}
                "? This will also delete all posts and employees within this office. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteOffice}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
