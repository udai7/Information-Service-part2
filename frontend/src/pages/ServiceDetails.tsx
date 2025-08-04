import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service] = useState<any>({
    id: id,
    title: "Dummy Service Name",
    description: "This is a dummy service description.",
    details: "These are dummy service details.",
    applicationMode: "Online",
    views: 123,
    provider: "Dummy Provider",
    status: "Active",
  });
  const [loading] = useState(false);
  const [error] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!service) return <div>No service found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          Back
        </Button>
        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide the essential details about your service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Service Name *</Label>
              <div className="border rounded px-3 py-2 bg-gray-50">
                {service.title}
              </div>
            </div>
            <div>
              <Label>Service Summary *</Label>
              <div className="border rounded px-3 py-2 bg-gray-50">
                {service.description}
              </div>
            </div>
            <div>
              <Label>Service Details *</Label>
              <div className="border rounded px-3 py-2 bg-gray-50">
                {service.details}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Add Contact Person */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Contact Person</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Service Name</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  Market Research Analytics
                </div>
              </div>
              <div>
                <Label>District</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  Central District
                </div>
              </div>
              <div>
                <Label>Sub District</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  North Subdivision
                </div>
              </div>
              <div>
                <Label>Block</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  Block A
                </div>
              </div>
              <div>
                <Label>Name</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  John Doe
                </div>
              </div>
              <div>
                <Label>Designation</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  Manager
                </div>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Official Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Contact</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    +1 234 567 890
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    john.doe@email.com
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Add Supportive Document */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Supportive Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Service Name</Label>
              <div className="border rounded px-3 py-2 bg-gray-50">
                Market Research Analytics
              </div>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Sl. No.</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">1</div>
                </div>
                <div>
                  <Label>Document Type</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    ID Proof
                  </div>
                </div>
                <div>
                  <Label>Valid Proof</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Passport
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Publish Service Detail */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Publish Service Detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Service Details</Label>
              <div className="border rounded px-3 py-2 bg-gray-50">
                This service provides market research analytics for businesses.
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <div className="flex gap-4 mt-1">
                <Badge variant="default">Active</Badge>
                <Badge variant="secondary">Deactive</Badge>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Process</h3>
              <div className="space-y-4">
                <div>
                  <Label>New</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    New process details here.
                  </div>
                </div>
                <div>
                  <Label>Update</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Update process details here.
                  </div>
                </div>
                <div>
                  <Label>Lost</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Lost process details here.
                  </div>
                </div>
                <div>
                  <Label>Surrender</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Surrender process details here.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Documents */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="pt-4">
              <div className="space-y-4">
                <div>
                  <Label>New</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    New document details here.
                  </div>
                </div>
                <div>
                  <Label>Update</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Update document details here.
                  </div>
                </div>
                <div>
                  <Label>Lost</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Lost document details here.
                  </div>
                </div>
                <div>
                  <Label>Surrender</Label>
                  <div className="border rounded px-3 py-2 bg-gray-50">
                    Surrender document details here.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
