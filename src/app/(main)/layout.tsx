"use client";
import { Header, Sidebar } from "@/components/main";
import useAuth from "@/hooks/useAuth";
import { Box, CssBaseline, styled } from "@mui/material";
import React from "react";

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
        Loading...
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header onToggle={handleDrawerToggle} />
      <Sidebar open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
