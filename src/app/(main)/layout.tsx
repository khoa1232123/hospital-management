"use client";
import { Header, Sidebar } from "@/components/layout";
import { LayoutProvider, MainProvider, useLayoutContext } from "@/contexts";
import useAuth from "@/hooks/useAuth";
import { Box, CircularProgress, CssBaseline, styled } from "@mui/material";
import React, { useState } from "react";

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

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full">
        <CircularProgress />
      </div>
    );
  }

  console.log({ openSidebar });

  return (
    <LayoutProvider>
      <MainProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar openSidebar={openSidebar} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              maxWidth: `${
                openSidebar ? "calc(100% - 240px)" : "calc(100% - 65px)"
              }`,
              transitionDuration: "225ms",
              animationDuration: "225ms",
            }}
          >
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      </MainProvider>
    </LayoutProvider>
  );
};

export default MainLayout;
