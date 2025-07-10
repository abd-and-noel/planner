import React from "react";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import CalendarView from "../components/Dashboard/Calendar/Calendar";
import { Box } from "@mui/material";

export default function Dashboard(){
    return(
        <>
      <Navbar />
      <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' }, // column on mobile, row on bigger screens
    height: 'calc(100vh - 64px)',
  }}
>
  <Sidebar/>
  <CalendarView />
</Box>

    </>
        
    );
}