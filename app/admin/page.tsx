"use client"

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DataLibrary from "@/components/admin/pages/data-library";
import Dashboard from "@/components/admin/pages/dashboard";
import PublicGallery from "@/components/admin/pages/public-gallery";
import IntegrationsSection from "@/components/admin/pages/integrations";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

export default function Page() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [activeParent, setActiveParent] = useState("Project");
  const scrollDirection = useScrollDirection();

  const handleNavClick = (parent: string, child: string) => {
    setActiveParent(parent);
    setActiveComponent(child);
  };

  useEffect(() => {
    if (scrollDirection === 'down') {
      document.body.classList.add('scrolled');
    } else if (scrollDirection === 'up') {
      document.body.classList.remove('scrolled');
    }
  }, [scrollDirection]);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar onNavClick={handleNavClick} />
      <SidebarInset>
        <header className={`sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b border-dashed bg-background/95 backdrop-blur-sm transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {activeParent}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeComponent}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="py-4">
          {activeComponent === "Data-Library" ? (
            <DataLibrary />
          ) : activeComponent === "Dashboard" ? (
            <Dashboard />
          ) : activeComponent === "Public Gallery" ? (
            <PublicGallery />
          ) : activeComponent === "Integrations" ? (
            <IntegrationsSection />
          ) : (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card className="aspect-video" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
