import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Bell,
  Zap,
  DollarSign,
  Shield,
  ChevronRight,
  Pause,
  Play,
  Trash2,
  AlertCircle,
} from "lucide-react";

const Settings = () => {
  const [roundupsEnabled, setRoundupsEnabled] = useState(true);
  const [threshold, setThreshold] = useState("7");
  const [multiplier, setMultiplier] = useState("1");
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [monthlySummary, setMonthlySummary] = useState(true);
  const [notifyBeforeDonation, setNotifyBeforeDonation] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Giving Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your round-up preferences and payment methods
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Round-ups Toggle */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">Round-ups</CardTitle>
                      <CardDescription>
                        {roundupsEnabled ? "Currently active" : "Paused"}
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={roundupsEnabled}
                    onCheckedChange={setRoundupsEnabled}
                  />
                </div>
              </CardHeader>
              {!roundupsEnabled && (
                <CardContent>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Round-ups are paused. Your accumulated spare change ($4.32) will be saved until you resume.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Threshold */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg">Donation Threshold</CardTitle>
                    <CardDescription>
                      We'll donate when your round-ups reach this amount
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup value={threshold} onValueChange={setThreshold} className="grid grid-cols-3 gap-4">
                  {["7", "10", "25"].map((value) => (
                    <Label
                      key={value}
                      htmlFor={`threshold-${value}`}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        threshold === value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={value} id={`threshold-${value}`} className="sr-only" />
                      <span className="font-display text-2xl font-bold">${value}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {value === "7" && "Most popular"}
                        {value === "10" && "Weekly feel"}
                        {value === "25" && "Monthly batch"}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Multiplier */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-light/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg">Round-up Multiplier</CardTitle>
                    <CardDescription>
                      Increase your impact by multiplying each round-up
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup value={multiplier} onValueChange={setMultiplier} className="grid grid-cols-3 gap-4">
                  {[
                    { value: "1", label: "1x", desc: "$0.75 stays $0.75" },
                    { value: "2", label: "2x", desc: "$0.75 becomes $1.50" },
                    { value: "3", label: "3x", desc: "$0.75 becomes $2.25" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`multiplier-${option.value}`}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        multiplier === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={`multiplier-${option.value}`} className="sr-only" />
                      <span className="font-display text-2xl font-bold">{option.label}</span>
                      <span className="text-xs text-muted-foreground mt-1 text-center">{option.desc}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg">Notifications</CardTitle>
                    <CardDescription>
                      Choose how you'd like to be notified
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Email Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified after each donation</p>
                  </div>
                  <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Monthly Summary</p>
                    <p className="text-sm text-muted-foreground">Receive a summary at month's end</p>
                  </div>
                  <Switch checked={monthlySummary} onCheckedChange={setMonthlySummary} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Pre-donation Notice</p>
                    <p className="text-sm text-muted-foreground">Alert before each charge</p>
                  </div>
                  <Switch checked={notifyBeforeDonation} onCheckedChange={setNotifyBeforeDonation} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-muted/50 border border-border mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">•••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/26</p>
                    </div>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <CreditCard className="w-4 h-4" />
                  Change Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm text-accent font-medium">Bank-level encryption</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your financial data is secured using 256-bit encryption. We never store your 
                  bank credentials – everything is handled securely by Plaid.
                </p>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Pause className="w-4 h-4" />
                  Pause All Giving
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
