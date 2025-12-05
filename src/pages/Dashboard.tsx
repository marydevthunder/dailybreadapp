import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  TrendingUp,
  Church,
  Calendar,
  Award,
  ArrowUpRight,
  Flame,
  Target,
  Gift,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data - later will come from database
  const userData = {
    firstName: user?.user_metadata?.first_name || "Friend",
    church: "Shoreline Church",
    churchLogo: null,
    thisMonth: 47.32,
    allTime: 523.45,
    currentRoundUp: 4.32,
    threshold: 7,
    streak: 8,
    nextMilestone: 600,
  };

  const recentActivity = [
    { id: 1, date: "Nov 28, 2024", amount: 7.23, type: "Round-ups", status: "completed" },
    { id: 2, date: "Nov 21, 2024", amount: 8.45, type: "Round-ups", status: "completed" },
    { id: 3, date: "Nov 14, 2024", amount: 7.12, type: "Round-ups", status: "completed" },
    { id: 4, date: "Nov 7, 2024", amount: 9.87, type: "Round-ups", status: "completed" },
  ];

  const badges = [
    { name: "First Donation", icon: Gift, earned: true },
    { name: "3 Month Streak", icon: Flame, earned: true },
    { name: "6 Month Streak", icon: Flame, earned: false },
    { name: "$500 Milestone", icon: Target, earned: true },
  ];

  const progressToThreshold = (userData.currentRoundUp / userData.threshold) * 100;
  const progressToMilestone = (userData.allTime / userData.nextMilestone) * 100;

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Hi, {userData.firstName}! 👋
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Church className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Giving to: {userData.church}</span>
            </div>
          </div>
          <Button variant="gold" asChild>
            <Link to="/dashboard/settings">
              <Sparkles className="w-4 h-4" />
              Adjust Giving
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* This Month */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                ${userData.thisMonth.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 mt-1 text-accent">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12% vs last month</span>
              </div>
            </CardContent>
          </Card>

          {/* All Time */}
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                All Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                ${userData.allTime.toFixed(2)}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Next: ${userData.nextMilestone}</span>
                  <span className="text-accent">{progressToMilestone.toFixed(0)}%</span>
                </div>
                <Progress value={progressToMilestone} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          {/* Current Round-ups */}
          <Card className="bg-gradient-to-br from-gold-light/20 to-gold-light/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Current Round-ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                ${userData.currentRoundUp.toFixed(2)}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">of ${userData.threshold} threshold</span>
                  <span className="text-primary">{progressToThreshold.toFixed(0)}%</span>
                </div>
                <div className="progress-gold">
                  <div 
                    className="progress-gold-fill" 
                    style={{ width: `${progressToThreshold}%` }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Giving Streak */}
          <Card className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 border-terracotta/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Giving Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                {userData.streak} months
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Keep it going! 🔥
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-lg">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/activity">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">${activity.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                        <Badge variant="secondary" className="mt-1">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges & Achievements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-center transition-all ${
                        badge.earned
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted/50 opacity-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          badge.earned ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        <badge.icon
                          className={`w-5 h-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <p className={`text-xs font-medium ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
                        {badge.name}
                      </p>
                      {badge.earned && (
                        <Badge variant="secondary" className="mt-2 text-[10px]">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-xl">🏆</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Leaderboard</p>
                      <p className="text-xs text-muted-foreground">You're #4 in your church this month!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Church Info Card */}
        <Card className="bg-gradient-to-r from-card to-muted/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Church className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{userData.church}</h3>
                  <p className="text-sm text-muted-foreground">
                    Total donated: ${userData.allTime.toFixed(2)} • 127 members giving
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to="/dashboard/church">
                  View Church
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
