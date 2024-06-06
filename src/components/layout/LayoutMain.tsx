"use client";
import { Box, CssBaseline, styled } from "@mui/material";
import React from "react";
import { Header, Sidebar } from ".";
import { useLayoutContext } from "@/contexts";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type Props = {
  children: React.ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  const { openSidebar } = useLayoutContext();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
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
  );
};

export default LayoutMain;
