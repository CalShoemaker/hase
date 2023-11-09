import React from "react";
import {
  List,
  Divider,
  Input,
  Slider,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { FilterGroup } from "../FilterGroup";
import { mainListItems, secondaryListItems } from "../../ui/ListItems";

function valuetext(value: number) {
  return `${value}`;
}

export const Sidebar = (props: any) => {
  const [value, setValue] = React.useState<number[]>([2, 15]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const [alignment, setAlignment] = React.useState("web");

  const handleBreed = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <List component="nav">
      <Box padding={2}>
        <Typography id="non-linear-slider" gutterBottom>
          Breed:
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleBreed}
          defaultValue={"mixed"}
          aria-label="Breed"
        >
          <ToggleButton value="pure">Pure</ToggleButton>
          <ToggleButton value="mixed">Mixed</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box padding={2}>
        <Typography id="non-linear-slider" gutterBottom>
          Age Range in Years:
        </Typography>
        <Slider
          getAriaLabel={() => "Age Range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={20}
        />
      </Box>
      <Box padding={2}>
        <Typography id="non-linear-slider" gutterBottom>
          Height Range in Inches:
        </Typography>
        <Slider
          getAriaLabel={() => "Age Range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={40}
        />
      </Box>
      <Box padding={2}>
        <Typography id="non-linear-slider" gutterBottom>
          Weight Range in Pounds:
        </Typography>
        <Slider
          getAriaLabel={() => "Age Range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={170}
        />
      </Box>
      <Input
        id="filter"
        name="filter"
        type="text"
        onChange={(event) => props.setFilters(event.target.value)}
      />

      <Divider sx={{ my: 1 }} />
      {mainListItems}
      {secondaryListItems}
    </List>
  );
};
export default Sidebar;
