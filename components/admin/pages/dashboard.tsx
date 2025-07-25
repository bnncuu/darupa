"use client"

import React, { useState } from 'react'
import { Settings, AlertTriangle, Database, Shield, Bug, ArrowUpRight, ArrowDownRight, Users, Clock, MessageSquare, FolderOpen, Activity, GitCommit, UserPlus, FileText, CheckCircle, Menu, X } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'




interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: {
    value: string
    direction: 'up' | 'down'
    period: string
  }
  denominator?: string
}

interface IssueItemProps {
  id: string
  title: string
  description: string
  author: string
  priority: 'high' | 'medium' | 'low'
  status: string
  statusColor: string
  reports: string
  time: string
  icon: React.ReactNode
  iconBg: string
}

interface ActivityItemProps {
  id: string
  description: string
  time: string
  icon: React.ReactNode
  iconBg: string
}

const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ')
}



const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, denominator }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium truncate">{title}</CardTitle>
        <div className="flex-shrink-0">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">
          {value}
          {denominator && (
            <span className="text-xs sm:text-sm text-muted-foreground font-normal ml-1">
              / {denominator}
            </span>
          )}
        </div>
      </CardContent>
      {trend && (
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground flex items-center">
            {trend.direction === 'up' ? (
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
            )}
            <span className="truncate">{trend.value} {trend.period}</span>
          </p>
        </CardFooter>
      )}
    </Card>
  )
}

const IssueItem: React.FC<IssueItemProps> = ({
  title,
  description,
  author,
  priority,
  status,
  statusColor,
  reports,
  time,
  icon,
  iconBg
}) => {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="p-3 sm:p-4 border rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
      <div className="flex items-start space-x-3">
        <div className={cn("p-1.5 sm:p-2 rounded-md flex-shrink-0", iconBg)}>
          {icon}
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <div>
            <p className="font-semibold text-sm sm:text-base truncate">{title}</p>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">by {author}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant={getPriorityVariant(priority)} className="text-xs">
                {priority}
              </Badge>
              <Badge variant="outline" className="flex items-center text-xs">
                <div className={cn("mr-1 sm:mr-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full", statusColor)} />
                {status}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-muted-foreground">
              <span>{reports}</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ActivityItem: React.FC<ActivityItemProps> = ({ description, time, icon, iconBg }) => {
  return (
    <div className="flex items-start justify-between p-2 sm:p-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors">
      <div className="flex items-start space-x-3 flex-1 min-w-0">
        <div className={cn("p-1.5 sm:p-2 rounded-md flex-shrink-0", iconBg)}>
          {icon}
        </div>
        <p className="text-xs sm:text-sm flex-1 leading-relaxed">{description}</p>
      </div>
      <p className="text-xs text-muted-foreground ml-2 flex-shrink-0">{time}</p>
    </div>
  )
}

const ActivitySidebar: React.FC<{ activityData: ActivityItemProps[] }> = ({ activityData }) => {
  return (
    <div className="space-y-2">
      {activityData.map((activity) => (
        <ActivityItem key={activity.id} {...activity} />
      ))}
    </div>
  )
}

const Dashboard: React.FC = () => {
  

  const statsData = [
    {
      title: "Active Projects",
      value: "4",
      icon: <FolderOpen className="h-4 w-4 text-muted-foreground" />,
      trend: { value: "+12%", direction: "up" as const, period: "this month" }
    },
    {
      title: "Response Time",
      value: "1.8s",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      trend: { value: "-5%", direction: "down" as const, period: "this week" }
    },
    {
      title: "Message Credits",
      value: "8.5K",
      denominator: "15K",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
      trend: { value: "+23%", direction: "up" as const, period: "this month" }
    },
    {
      title: "Team Members",
      value: "12",
      denominator: "25",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: { value: "+2", direction: "up" as const, period: "this week" }
    },
    {
      title: "Uptime",
      value: "99.9%",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      trend: { value: "+0.1%", direction: "up" as const, period: "this month" }
    },
    {
      title: "API Calls",
      value: "2.4M",
      icon: <Database className="h-4 w-4 text-muted-foreground" />,
      trend: { value: "+18%", direction: "up" as const, period: "this month" }
    }
  ]

  const issuesData = [
    {
      id: "1",
      title: "Database connection timeout",
      description: "Users experiencing slow query responses in production",
      author: "Sarah Chen",
      priority: "high" as const,
      status: "Investigating",
      statusColor: "bg-red-400",
      reports: "12 reports",
      time: "2 minutes ago",
      icon: <Database className="h-4 w-4 text-white" />,
      iconBg: "bg-red-900"
    },
    {
      id: "2",
      title: "Authentication service degraded",
      description: "Login attempts failing intermittently",
      author: "Mike Johnson",
      priority: "high" as const,
      status: "In Progress",
      statusColor: "bg-yellow-400",
      reports: "8 reports",
      time: "15 minutes ago",
      icon: <Shield className="h-4 w-4 text-white" />,
      iconBg: "bg-red-900"
    },
    {
      id: "3",
      title: "Memory leak in worker processes",
      description: "Background jobs consuming excessive memory",
      author: "Alex Rivera",
      priority: "medium" as const,
      status: "Monitoring",
      statusColor: "bg-blue-400",
      reports: "3 reports",
      time: "1 hour ago",
      icon: <Bug className="h-4 w-4 text-white" />,
      iconBg: "bg-yellow-800"
    },
    {
      id: "4",
      title: "CDN cache invalidation",
      description: "Static assets not updating properly",
      author: "Emma Davis",
      priority: "low" as const,
      status: "Resolved",
      statusColor: "bg-green-400",
      reports: "1 report",
      time: "3 hours ago",
      icon: <AlertTriangle className="h-4 w-4 text-white" />,
      iconBg: "bg-gray-600"
    }
  ]

  const questionsData = [
    {
      id: "1",
      title: "How to implement rate limiting?",
      description: "Need guidance on API rate limiting best practices",
      author: "Tom Wilson",
      priority: "medium" as const,
      status: "Pending",
      statusColor: "bg-yellow-400",
      reports: "0 answers",
      time: "30 minutes ago",
      icon: <MessageSquare className="h-4 w-4 text-white" />,
      iconBg: "bg-blue-600"
    },
    {
      id: "2",
      title: "Database migration strategy",
      description: "Planning for zero-downtime database updates",
      author: "Lisa Park",
      priority: "high" as const,
      status: "Urgent",
      statusColor: "bg-red-400",
      reports: "2 answers",
      time: "1 hour ago",
      icon: <Database className="h-4 w-4 text-white" />,
      iconBg: "bg-red-900"
    }
  ]

  const activityData = [
    {
      id: "1",
      description: "Deploy completed for production environment",
      time: "5 min ago",
      icon: <GitCommit className="h-4 w-4 text-white" />,
      iconBg: "bg-green-600"
    },
    {
      id: "2",
      description: "New team member added to development team",
      time: "12 min ago",
      icon: <UserPlus className="h-4 w-4 text-white" />,
      iconBg: "bg-blue-600"
    },
    {
      id: "3",
      description: "Security scan completed with no issues",
      time: "25 min ago",
      icon: <Shield className="h-4 w-4 text-white" />,
      iconBg: "bg-green-600"
    },
    {
      id: "4",
      description: "Documentation updated for API v2.1",
      time: "1 hr ago",
      icon: <FileText className="h-4 w-4 text-white" />,
      iconBg: "bg-purple-600"
    },
    {
      id: "5",
      description: "Backup process completed successfully",
      time: "2 hr ago",
      icon: <CheckCircle className="h-4 w-4 text-white" />,
      iconBg: "bg-green-600"
    },
    {
      id: "6",
      description: "Performance monitoring alert resolved",
      time: "3 hr ago",
      icon: <Activity className="h-4 w-4 text-white" />,
      iconBg: "bg-orange-600"
    }
  ]

  return (
    <main className="bg-background min-h-screen">
      <div className="px-6 max-w-7xl mx-auto space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="min-w-0">
          <p className="text-muted-foreground text-sm">My Workspace</p>
          <h1 className="text-2xl sm:text-3xl font-bold truncate">Good afternoon, Tails</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Settings className="h-4 w-4" />
          </Button>
          
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Issues/Questions Section */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <Tabs defaultValue="issues" className="w-full">
                <div className="flex flex-row items-center sm:justify-between space-x-2">
                  <TabsList className="flex-grow w-auto grid-cols-2">
                    <TabsTrigger value="issues" className="text-xs sm:text-sm">Issue Reports</TabsTrigger>
                    <TabsTrigger value="questions" className="text-xs sm:text-sm">Questions</TabsTrigger>
                  </TabsList>
                  <div className="lg:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="self-end sm:self-auto">
                          <Activity className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                          <SheetTitle>Recent Activity</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <ActivitySidebar activityData={activityData} />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
                <TabsContent value="issues" className="mt-4">
                  <div className="space-y-3 sm:space-y-4">
                    {issuesData.map((issue) => (
                      <IssueItem key={issue.id} {...issue} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="questions" className="mt-4">
                  <div className="space-y-3 sm:space-y-4">
                    {questionsData.map((question) => (
                      <IssueItem key={question.id} {...question} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
        
        
      {/* Desktop Activity Sidebar */}
        <div className="hidden lg:block">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ActivitySidebar activityData={activityData} />
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </main>
  )
}

export default Dashboard
