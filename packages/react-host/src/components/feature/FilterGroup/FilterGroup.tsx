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

function FilterToggle(props: any) {
  const { data, handler, options, icon } = props.config;
  console.log(props.config)
  return (
    <ListItem>
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText>
        <ToggleButtonGroup
          color="primary"
          value={data}
          exclusive
          onChange={handler}
        >
          { options.map((name:string) => (<ToggleButton value={name}>{name}</ToggleButton>))}
        </ToggleButtonGroup>
      </ListItemText>
    </ListItem>
  )
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

const Filters = (filters:any, handler:any) => {
  const { height, weight, life, breed } = filters;

  return [{
    type:'toggle',
    data: breed,
    handler: handler("breed"),
    label: "Breed",
    options: ["Pure", "Hybrid", "Mixed"],
    icon: <AssessmentIcon titleAccess="Breed"/>
  },{
    type:'range',
    data: life,
    handler: handler("life"),
    label: "Age Range",
    min: 0,
    max: 20,
    step: 1,
    icon: <AvTimerIcon titleAccess="Age in Years" />
  },{
    type:'range',
    data: height,
    handler: handler("height"),
    label: "Height Range",
    min: 0,
    max: 40,
    step: 1,
    icon: <HeightIcon titleAccess="Height in Inches" />
  },{
    type:'range',
    data: weight,
    handler: handler("weight"),
    label: "Weight Range",
    min: 0,
    max: 170,
    step: 5,
    icon: <ScaleIcon titleAccess="Weight in Pounds" />
  }]
}

export function FilterGroup(props: any) {
  const dispatch = useDispatch();
  const filters = Filters(props.filters, (filter: string) =>
  (
    event: React.MouseEvent<HTMLElement> | Event,
    newValue: string | number | number[],
  ) => {
    return dispatch<any>(setFilters(update(filter, newValue, props.filters )));
  })
    
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      { 
        filters.map((item, i) => item.type==="range" ? 
          (<FilterItem key={i} config={ item } />) : item.type==="toggle" ? 
          (<FilterToggle key={i} config={ item}/>):'') 
      }
    </Box>
  );
}

export default FilterGroup;