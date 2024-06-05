"use client";
import { Header, Sidebar } from "@/components/layout";
import useAuth from "@/hooks/useAuth";
import { Box, CircularProgress, CssBaseline, styled } from "@mui/material";
import React from "react";
import { MainProvider } from "../contexts";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isPageLoading } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <MainProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header onToggle={handleDrawerToggle} />
        <Sidebar open={open} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, maxWidth: "calc(100% - 65px)" }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </MainProvider>
  );
};

export default MainLayout;
