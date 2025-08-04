import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-xl">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Admin Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden">
                {/* Placeholder for image */}
                <span className="text-4xl text-gray-400">👤</span>
              </div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">John</div>
              </div>
              <div>
                <Label>Surname</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">Doe</div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  admin@email.com
                </div>
              </div>
              <div>
                <Label>Contact</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  +1 234 567 890
                </div>
              </div>
              <div>
                <Label>Admin ID</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">
                  ADM123456
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="default">Reset Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
