import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Slider, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../store/slices/filters.slice";

function valuetext(value: number) {
  return `${value}`;
}

// TODO: Refactor any type
export function FilterGroup(props: any) {
  const dispatch = useDispatch();
  const { height, weight, life, breed } = props.filters;
  // Temp hack to disable filter on /dogs/:dog
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
    <Box sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Breed:
        </Typography>
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
      </Box>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Age Range in Years: <strong>{ life[0] }-{ life[1] }</strong>
        </Typography>
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
      </Box>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Height Range in Inches: <strong>{ height[0] }-{ height[1] }</strong>
        </Typography>
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
      </Box>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Weight Range in Pounds: <strong>{ weight[0] }-{ weight[1] }</strong>
        </Typography>
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
      </Box>
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
