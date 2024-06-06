"use client";
import { Header, Sidebar } from "@/components/layout";
import LayoutMain from "@/components/layout/LayoutMain";
import { LayoutProvider, MainProvider, useLayoutContext } from "@/contexts";
import useAuth from "@/hooks/useAuth";
import { Box, CircularProgress, CssBaseline, styled } from "@mui/material";
import React, { useState } from "react";

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
