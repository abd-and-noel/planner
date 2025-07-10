import React, { useEffect, useRef } from "react";
import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const CalendarView = () => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (calendarRef.current && !calendarInstance.current) {
      calendarInstance.current = new Calendar(calendarRef.current, {
        defaultView: "month",
        taskView: true,
        scheduleView: true,
        useDetailPopup: true,
        useCreationPopup: false,
        usageStatistics: false,
      });

      calendarInstance.current.createSchedules([
        {
          id: "1",
          calendarId: "1",
          title: "Sample Class",
          category: "time",
          start: new Date().toISOString(),
          end: new Date(new Date().getTime() + 3600000).toISOString(),
        },
      ]);
    }

    return () => {
      if (calendarInstance.current) {
        calendarInstance.current.destroy();
        calendarInstance.current = null;
      }
    };
  }, []);

  return (
    <Box
      ref={calendarRef}
      sx={{
        flexGrow: 1,
        height: isMobile ? "calc(100vh - 128px)" : "calc(100vh - 100px)", // Adjust for navbar + maybe sidebar height
        minHeight: 400,
        overflow: "hidden",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        m: 2,
        boxSizing: "border-box",
        display: "flex",          // Important: Make container flexbox to allow full height
        flexDirection: "column",  // and column to layout calendar properly
      }}
    />
  );
};

export default CalendarView;
