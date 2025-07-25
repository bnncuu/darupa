import React from 'react';
import { Plus, Search, Book, AlertTriangle, HelpCircle, Package, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataCard } from '@/components/ui/data-card';
import { Badge } from '@/components/ui/badge';

interface DataItem {
  id: string;
  name: string;
  date: string;
  type: 'Context' | 'Issues' | 'Inquiries' | 'Products';
  content?: string;
  count?: number;
  status?: string;
  metricLabel?: string;
  metricValue?: string;
  progress?: number;
}

interface FilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}

const DataLibrary: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('Context');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filterOptions: FilterOption[] = [
    { id: 'Context', label: 'Context', icon: Book, active: true },
    { id: 'Issues', label: 'Issues', icon: AlertTriangle, active: false },
    { id: 'Inquiries', label: 'Inquiries', icon: HelpCircle, active: false },
    { id: 'Products', label: 'Products', icon: Package, active: false },
  ];

  const dataItems: DataItem[] = [
    {
      id: '1',
      name: 'Customer Onboarding Guide',
      date: 'Jul 10, 2025',
      type: 'Context',
      content: 'Comprehensive guide for new customer setup and initial product usage.'
    },
    {
      id: '2',
      name: 'Bug Report: Login Failure',
      date: 'Jul 9, 2025',
      type: 'Issues',
      content: 'Users unable to log in after recent update.',
      count: 15,
      status: 'Critical'
    },
    {
      id: '3',
      name: 'Feature Request: Dark Mode',
      date: 'Jul 8, 2025',
      type: 'Inquiries',
      content: 'Inquiry about the possibility of adding a dark mode to the application.',
      // For inquiry, content will be the main body, footer can be used for actions
    },
    {
      id: '4',
      name: 'Product Launch: New Analytics Dashboard',
      date: 'Jul 7, 2025',
      type: 'Products',
      content: 'Overview of the new analytics dashboard features and benefits.',
      metricLabel: 'Adoption Rate',
      metricValue: '75%',
      progress: 75
    },
    {
      id: '5',
      name: 'API Documentation',
      date: 'Jul 6, 2025',
      type: 'Context',
      content: 'Detailed documentation for all public API endpoints.'
    },
    {
      id: '6',
      name: 'Performance Issue: Dashboard Load Time',
      date: 'Jul 5, 2025',
      type: 'Issues',
      content: 'Dashboard taking too long to load for large datasets.',
      count: 8,
      status: 'High'
    },
    {
      id: '7',
      name: 'Support Question: Billing Discrepancy',
      date: 'Jul 4, 2025',
      type: 'Inquiries',
      content: 'Customer query regarding an unexpected charge on their latest bill.',
    },
    {
      id: '8',
      name: 'Product Update: Mobile App v2.0',
      date: 'Jul 3, 2025',
      type: 'Products',
      content: 'Key new features and improvements in the mobile application version 2.0.',
      metricLabel: 'User Engagement',
      metricValue: '92%',
      progress: 92
    },
  ];
  

  const filteredItems = dataItems.filter(item => 
    item.type === activeFilter && 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      

      {/* Main Content Area */}
      <main>
        <div className="px-6 max-w-7xl mx-auto">
        {/* Page Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Your Thetails</h2>
              
              {/* Context Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Context:</span>
                <Select defaultValue="ivann-dupe">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ivann-dupe">Ivann Dupe</SelectItem>
                    <SelectItem value="library-2">Library 2</SelectItem>
                    <SelectItem value="library-3">Library 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-muted-foreground">
                Manage your knowledge base and training data.
              </p>
            </div>

            {/* Primary Action Button */}
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Context
            </Button>
          </div>
        </div>

        {/* Controls & Filtering Section */}
        <div className="space-y-6 mb-6">
          {/* Mode Toggle */}
          <Tabs defaultValue="browse" className="w-full">
            <TabsList>
              <TabsTrigger value="browse">Browse Data</TabsTrigger>
              <TabsTrigger value="search">Semantic Search</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{filter.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Sort & Count Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Content Display Area */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            let cardProps: any = {
              title: item.name,
              content: item.content,
            };

            switch (item.type) {
              case 'Context':
                cardProps.variant = 'context';
                cardProps.category = 'In Clueso Stories';
                cardProps.date = item.date;
                cardProps.author = 'Ashutosh Raj';
                cardProps.readTime = '13 Min read';
                break;
              case 'Issues':
                cardProps.variant = 'issues';
                cardProps.count = item.count;
                cardProps.status = item.status;
                break;
              case 'Inquiries':
                cardProps.variant = 'inquiry';
                // For inquiry, content is already set, footer can be added if needed
                break;
              case 'Products':
                cardProps.variant = 'product';
                cardProps.metricLabel = item.metricLabel;
                cardProps.metricValue = item.metricValue;
                cardProps.progress = item.progress;
                break;
              default:
                cardProps.variant = 'context'; // Fallback
            }

            return (
              <DataCard key={item.id} {...cardProps} />
            );
          })}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your criteria.</p>
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
};

export default DataLibrary;