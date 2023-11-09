import React from "react";
import {
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import { FilterGroup } from "../FilterGroup";
import { Link } from "@tanstack/react-router";

const context = window.location.pathname === "/dogs" ;

export const Sidebar = (props: any) => {
  return (
    <List component="nav">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link to="/dogs">
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItemButton>
      { context ? <FilterGroup /> : null }
      <Divider sx={{ my: 1 }} />
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton> 
    </List>
  );
};
export default Sidebar;
