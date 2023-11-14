import React from "react";
import { useParams } from "@tanstack/react-router";
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

// TODO: Refactor any type
export const Sidebar = (props: any) => {
  const { dogId } = useParams({ from: "/Dogs/Dog" });
  return (
    <List component="nav">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link to="/dogs" style={{ textDecoration:'none' }}>
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItemButton>
      {!dogId ? (
        <FilterGroup
          filters={props.filters.filters}
          setFilters={props.setFilters}
        />
      ) : null}
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