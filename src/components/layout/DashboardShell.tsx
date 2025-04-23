"use client";
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { NAVIGATION } from "../navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            className="logoDashboard"
            src="/logo.png"
            alt="Mi empresa"
            style={{ height: 120, width: "auto" }}
          />
        ),
        title: "RealState Scraper",
        homeUrl: "/dashboard",
      }}
    >
      <DashboardLayout>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
