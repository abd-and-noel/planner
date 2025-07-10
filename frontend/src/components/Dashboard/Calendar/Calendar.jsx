import React, { useEffect, useRef } from "react";
import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const CalendarView = () => {
  const containerRef = useRef(null);
  const calendarRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    if (!containerRef.current) return;

    // Delay initialization to next event loop tick
    const initTimeout = setTimeout(() => {
      if (!calendarRef.current) {
        calendarRef.current = new Calendar(containerRef.current, {
          defaultView: "month",
          taskView: false,
          scheduleView: ["time"],
          useDetailPopup: true,
          useCreationPopup: false,
          usageStatistics: false,
        });

        calendarRef.current.createSchedules([
          {
            id: "1",
            calendarId: "1",
            title: "Sample Event",
            category: "time",
            start: new Date().toISOString(),
            end: new Date(new Date().getTime() + 3600000).toISOString(),
          },
        ]);
      }
    }, 0);

    const resizeObserver = new ResizeObserver(() => {
      if (calendarRef.current) {
        calendarRef.current.render();
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(initTimeout);
      if (calendarRef.current) {
        calendarRef.current.destroy();
        calendarRef.current = null;
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: isMobile
          ? "calc(100vh - 160px)"
          : isTablet
          ? "calc(100vh - 140px)"
          : "calc(100vh - 120px)",
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        borderRadius: 2,
        boxShadow: 3,
        p: { xs: 1, sm: 2, md: 3 }, // padding inside the container for spacing
        m: { xs: 1, sm: 2 },        // margin to give breathing space from the edge
      }}
    >
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      />
    </Box>
  );
};

export default CalendarView;
