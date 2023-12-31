import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import { Drawer } from "../../ui/Drawer";
import { AppBar } from "../../ui/AppBar";
import Toolbar from "../../ui/Toolbar";
import { Link } from "@tanstack/react-router";

// TODO: Refactor any type
export const Dashboard = (props: any) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open} elevation={0} color="transparent">
        <Toolbar sx={{ pr: "20px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "#282828" }} to="/dogs">
              Dogs { props.title ? ' | ' + props.title : '' }
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar color="transparent" >
          <PetsIcon sx={{ margin: 1 }} />
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "#282828" }} to="/">
              Hase
            </Link>
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        { props.sidebar }
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          padding: 1,
          overflow: "auto",
          height: "100vh",
        }}
      >
        <Toolbar />
        { props.main }
      </Box>
    </Box>
  );
};

export default Dashboard;
