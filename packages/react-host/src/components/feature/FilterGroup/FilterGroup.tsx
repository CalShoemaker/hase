import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../store/slices/filters.slice";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import { Box, Slider, ToggleButtonGroup, ToggleButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";

function valuetext(value: number) {
  return `${value}`;
}

function FilterItem(props: any) {
  const { data, handler, label,  min, max, step, icon } = props.config;
  return (      
    <ListItem>
      <ListItemIcon>
        { icon }
      </ListItemIcon>
      <ListItemText>
      <Slider
        getAriaLabel={() => label}
        value={data}
        onChange={handler}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={step}
        marks
        min={min}
        max={max}
      />
      </ListItemText>
    </ListItem>
  )
}

function update(filter: string, payload: string | number |  number[], filters: any) {
  let { height, weight, life, breed } = filters;

  switch (filter) {
    case "height":
      height = payload as number[];
      break;
    case "weight":
      weight = payload as number[];
      break;
    case "life":
      life = payload as number[];
      break;
    case "breed":
      breed = payload as string;
      break;
  }

  return { height, weight, life, breed }
}

export function FilterGroup(props: any) {
  const dispatch = useDispatch();
  const { height, weight, life, breed } = props.filters;
  const suppress = window.location.pathname !== '/dogs';

  // Currywurst die beste
  const handleChange =
    (filter: string) =>
    (
      event: React.MouseEvent<HTMLElement> | Event,
      newValue: string | number | number[],
    ) => {
      return !suppress && dispatch<any>(setFilters(update(filter, newValue, props.filters )));
    };

  const filters = [{
    data: life,
    handler: handleChange("life"),
    label: "Age Range",
    min: 0,
    max: 20,
    step: 1,
    icon: <AvTimerIcon titleAccess="Age in Years" />
  },{
    data: height,
    handler: handleChange("height"),
    label: "Height Range",
    min: 0,
    max: 40,
    step: 1,
    icon: <HeightIcon titleAccess="Height in Inches" />
  },{
    data: weight,
    handler: handleChange("weight"),
    label: "Weight Range",
    min: 0,
    max: 170,
    step: 5,
    icon: <ScaleIcon titleAccess="Weight in Pounds" />
  }]
    
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <ListItem>
        <ListItemIcon>
          <AssessmentIcon titleAccess="Breed"/>
        </ListItemIcon>
        <ListItemText>
        <ToggleButtonGroup
          color="primary"
          value={breed}
          exclusive
          onChange={handleChange("breed")}
          defaultValue={"Mixed"}
          aria-label="Breed"
        >
          <ToggleButton value="Pure">Pure</ToggleButton>
          <ToggleButton value="Hybrid">Hybrid</ToggleButton>
          <ToggleButton value="Mixed">Mixed</ToggleButton>
        </ToggleButtonGroup>
        </ListItemText>
      </ListItem>

      { 
        // NOTE: Data driven for scale
        filters.map((item, i) => (<FilterItem key={i} config={ item } />)) 
      }
    </Box>
  );
}

export default FilterGroup;