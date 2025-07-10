import React, { useState } from "react";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import CalendarView from "../components/Dashboard/Calendar/Calendar";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Navbar onMenuClick={handleDrawerToggle} />

      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <Sidebar />
        </Drawer>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "calc(100vh - 64px)",
        }}
      >
        {!isMobile && <Sidebar />}
        <CalendarView />
      </Box>
    </>
  );
}
