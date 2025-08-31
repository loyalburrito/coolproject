import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { 
  User, 
  School, 
  Mail, 
  Shield, 
  Bell, 
  Eye, 
  Lock,
  Save,
  Edit3
} from "lucide-react";

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsMenu = ({ isOpen, onClose }: SettingsMenuProps) => {
  const { user, updateUserData } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    school: user?.school || "",
    rollNumber: user?.rollNumber || "",
    facultyId: user?.facultyId || "",
    bio: ""
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showProgress: true,
    showActivity: false,
    allowMessages: true,
    shareData: false
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    achievementAlerts: true,
    reminderNotifications: false
  });

  const handleSaveProfile = () => {
    // Update user data
    updateUserData({
      name: profileData.name,
      email: profileData.email,
      school: profileData.school,
      ...(user?.role === 'student' && { rollNumber: profileData.rollNumber }),
      ...(user?.role === 'teacher' && { facultyId: profileData.facultyId })
    });

    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved."
    });
    
    setIsEditing(false);
  };

  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast.info("Privacy setting updated", {
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`
    });
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast.info("Notification setting updated", {
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Settings
          </SheetTitle>
          <SheetDescription>
            Manage your profile, privacy, and notification preferences.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("profile")}
              className="flex-1"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant={activeTab === "privacy" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("privacy")}
              className="flex-1"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </Button>
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("notifications")}
              className="flex-1"
            >
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user?.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {user?.role === 'student' ? 'Student' : 'Teacher'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="school">School</Label>
                    <Input
                      id="school"
                      value={profileData.school}
                      onChange={(e) => setProfileData({...profileData, school: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  {user?.role === 'student' && (
                    <div>
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        value={profileData.rollNumber}
                        onChange={(e) => setProfileData({...profileData, rollNumber: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  )}

                  {user?.role === 'teacher' && (
                    <div>
                      <Label htmlFor="facultyId">Faculty ID</Label>
                      <Input
                        id="facultyId"
                        value={profileData.facultyId}
                        onChange={(e) => setProfileData({...profileData, facultyId: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button onClick={handleSaveProfile} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Show Profile to Others
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow other users to see your profile information
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showProfile}
                      onCheckedChange={(value) => handlePrivacyChange("showProfile", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Show Learning Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Display your learning progress and achievements
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showProgress}
                      onCheckedChange={(value) => handlePrivacyChange("showProgress", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Show Recent Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Let others see your recent learning activities
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showActivity}
                      onCheckedChange={(value) => handlePrivacyChange("showActivity", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Allow Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive messages from teachers and classmates
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.allowMessages}
                      onCheckedChange={(value) => handlePrivacyChange("allowMessages", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Share Data for Research
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Help improve the platform by sharing anonymous usage data
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.shareData}
                      onCheckedChange={(value) => handlePrivacyChange("shareData", value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(value) => handleNotificationChange("emailNotifications", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get instant notifications on your device
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(value) => handleNotificationChange("pushNotifications", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Weekly Progress Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a summary of your weekly learning progress
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReport}
                      onCheckedChange={(value) => handleNotificationChange("weeklyReport", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Achievement Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you earn badges or reach milestones
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.achievementAlerts}
                      onCheckedChange={(value) => handleNotificationChange("achievementAlerts", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Gentle reminders to keep up with your learning goals
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.reminderNotifications}
                      onCheckedChange={(value) => handleNotificationChange("reminderNotifications", value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};