"use client";
import LayoutMain from "@/components/layout/LayoutMain";
import { LayoutProvider, MainProvider } from "@/contexts";
import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isPageLoading } = useAuth();

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <LayoutProvider>
      <MainProvider>
        <LayoutMain>{children}</LayoutMain>
      </MainProvider>
    </LayoutProvider>
  );
};

export default MainLayout;
