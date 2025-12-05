import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Church,
  Award,
  Flame,
  Target,
  Gift,
  TrendingUp,
  Share2,
  Settings,
  ChevronRight,
  Trophy,
  Star,
  Heart,
  Calendar,
  Zap,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  const userData = {
    firstName: user?.user_metadata?.first_name || "User",
    lastName: user?.user_metadata?.last_name || "",
    email: user?.email || "",
    church: "Shoreline Church",
    memberSince: "March 2024",
    allTimeGiven: 523.45,
    thisYear: 478.23,
    streak: 8,
    leaderboardRank: 4,
    totalDonations: 72,
    nextMilestone: 600,
  };

  const badges = [
    { name: "First Donation", icon: Gift, earned: true, date: "Mar 2024" },
    { name: "3 Month Streak", icon: Flame, earned: true, date: "Jun 2024" },
    { name: "6 Month Streak", icon: Flame, earned: true, date: "Sep 2024" },
    { name: "12 Month Streak", icon: Flame, earned: false, date: null },
    { name: "$100 Given", icon: Target, earned: true, date: "Apr 2024" },
    { name: "$250 Given", icon: Target, earned: true, date: "Jul 2024" },
    { name: "$500 Given", icon: Target, earned: true, date: "Nov 2024" },
    { name: "$1,000 Given", icon: Trophy, earned: false, date: null },
  ];

  const milestones = [
    { amount: 100, reached: true },
    { amount: 250, reached: true },
    { amount: 500, reached: true },
    { amount: 750, reached: false },
    { amount: 1000, reached: false },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const upcomingBadges = badges.filter(b => !b.earned);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8 space-y-8">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <Avatar className="w-24 h-24 border-4 border-card">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {userData.firstName[0]}{userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Church className="w-4 h-4" />
                    {userData.church}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Member since {userData.memberSince}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="soft" size="sm" asChild>
                  <Link to="/dashboard/settings">
                    <Settings className="w-4 h-4" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold">${userData.allTimeGiven}</p>
              <p className="text-sm text-muted-foreground">All-Time Given</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-display text-2xl font-bold">${userData.thisYear}</p>
              <p className="text-sm text-muted-foreground">This Year</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 text-terracotta mx-auto mb-2" />
              <p className="font-display text-2xl font-bold">{userData.streak} mo</p>
              <p className="text-sm text-muted-foreground">Giving Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold">#{userData.leaderboardRank}</p>
              <p className="text-sm text-muted-foreground">Church Rank</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Badges Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Earned Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Earned Badges ({earnedBadges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {earnedBadges.map((badge, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                        <badge.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-muted-foreground" />
                  Upcoming Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {upcomingBadges.map((badge, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/50 border border-border text-center opacity-60"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
                        <badge.icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{badge.name}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">Locked</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Impact Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-4 left-0 right-0 h-1 bg-muted rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${(userData.allTimeGiven / 1000) * 100}%` }}
                    />
                  </div>
                  
                  {/* Milestones */}
                  <div className="flex justify-between relative">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.reached
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {milestone.reached ? (
                            <Star className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <span className={`text-xs mt-2 ${
                          milestone.reached ? "font-semibold" : "text-muted-foreground"
                        }`}>
                          ${milestone.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress to ${userData.nextMilestone}</span>
                    <span className="text-sm text-accent font-semibold">
                      ${userData.allTimeGiven} / ${userData.nextMilestone}
                    </span>
                  </div>
                  <Progress value={(userData.allTimeGiven / userData.nextMilestone) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    ${(userData.nextMilestone - userData.allTimeGiven).toFixed(2)} to go!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold">#{userData.leaderboardRank}</p>
                    <p className="text-sm text-muted-foreground">in your church</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You're in the top 5% of givers at {userData.church}! Keep up the amazing work.
                </p>
                <Button variant="soft" size="sm" className="w-full">
                  View Leaderboard
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Streak Card */}
            <Card className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 border-terracotta/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-terracotta/20 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-terracotta" />
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold">{userData.streak} months</p>
                    <p className="text-sm text-muted-foreground">giving streak</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  You've been giving consistently for {userData.streak} months! 
                  Only 4 more months to earn the "12 Month Streak" badge.
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Donations</span>
                  <span className="font-semibold">{userData.totalDonations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Donation</span>
                  <span className="font-semibold">${(userData.allTimeGiven / userData.totalDonations).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Badges Earned</span>
                  <span className="font-semibold">{earnedBadges.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Share Impact */}
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-display font-semibold mb-2">Share Your Impact</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Inspire others by sharing how much you've given through Daily Bread.
                </p>
                <Button variant="outline-gold" size="sm">
                  <Share2 className="w-4 h-4" />
                  Share My Impact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
