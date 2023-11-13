import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Slider, ToggleButtonGroup, ToggleButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../store/slices/filters.slice";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';

function valuetext(value: number) {
  return `${value}`;
}

// TODO: Refactor any type
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
      let { height, weight, life, breed } = props.filters;

      switch (filter) {
        case "height":
          height = newValue as number[];
          break;
        case "weight":
          weight = newValue as number[];
          break;
        case "life":
          life = newValue as number[];
          break;
        case "breed":
          breed = newValue as string;
          break;
      }

      return !suppress && dispatch<any>(setFilters({ height, weight, breed, life }));
    };

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
        
      <ListItem>
        <ListItemIcon>
          <AvTimerIcon titleAccess="Age in Years" />
        </ListItemIcon>
        <ListItemText>
          <Slider
            getAriaLabel={() => "Age Range"}
            value={life}
            onChange={handleChange("life")}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={1}
            marks
            min={0}
            max={20}
          />
          {/* <strong>{ life[0] }-{ life[1] }</strong> */}
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <HeightIcon titleAccess="Height in Inches" />
        </ListItemIcon>
        <ListItemText>
            <Slider
              getAriaLabel={() => "Height Range"}
              value={height}
              onChange={handleChange("height")}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              step={1}
              marks
              min={0}
              max={40}
            />
            {/* { height[0] }-{ height[1] } */}
          </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ScaleIcon titleAccess="Weight in Pounds" />
        </ListItemIcon>
        <ListItemText>
        <Slider
          getAriaLabel={() => "Weight Range"}
          value={weight}
          onChange={handleChange("weight")}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          step={5}
          marks
          min={0}
          max={170}
        />
        {/* <strong>{ weight[0] }-{ weight[1] }</strong> */}
        </ListItemText>
      </ListItem>

      {/* <Box py={1}>
        <Input
          id="filter"
          name="filter"
          type="text"
          placeholder="Search"
          sx={{width:'100%'}}
          onChange={(event) => props.setFilters(event.target.value)}
        />
      </Box> */}
    </Box>
  );
}
export default FilterGroup;
