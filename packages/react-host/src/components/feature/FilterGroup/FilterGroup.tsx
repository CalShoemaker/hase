import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Slider, ToggleButtonGroup, ToggleButton } from "@mui/material";

function valuetext(value: number) {
  return `${value}`;
}

// Custom Hook
function useFilterGroup() {
  const [height, setHeight] = React.useState<number[]>([2, 15]);
  const [weight, setWeight] = React.useState<number[]>([2, 15]);
  const [life, setLife] = React.useState<number[]>([2, 15]);
  const [breed, setBreed] = React.useState("web");
  return {
    height,
    setHeight,
    weight,
    setWeight,
    life,
    setLife,
    breed,
    setBreed,
  };
}

// TODO: Refactor any type
export const FilterGroup = (props: any) => {
  //useHook(()=>{
  const {
    height,
    setHeight,
    weight,
    setWeight,
    life,
    setLife,
    breed,
    setBreed,
  } = useFilterGroup();
  //},[])

  // Currywurst die beste
  const handleChange =
    (filter: string) =>
    (
      event: React.MouseEvent<HTMLElement> | Event,
      newValue: string | number | number[],
    ) => {
      switch (filter) {
        case "height":
          return setHeight(newValue as number[]);
        case "weight":
          return setWeight(newValue as number[]);
        case "life":
          return setLife(newValue as number[]);
        case "breed":
          return setBreed(newValue as string);
      }
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
          defaultValue={"mixed"}
          aria-label="Breed"
        >
          <ToggleButton value="pure">Pure</ToggleButton>
          <ToggleButton value="mixed">Mixed</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Age Range in Years:
        </Typography>
        <Slider
          getAriaLabel={() => "Age Range"}
          value={life}
          onChange={handleChange("life")}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={20}
        />
      </Box>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Height Range in Inches:
        </Typography>
        <Slider
          getAriaLabel={() => "Height Range"}
          value={height}
          onChange={handleChange("height")}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={40}
        />
      </Box>
      <Box py={1}>
        <Typography id="non-linear-slider" gutterBottom>
          Weight Range in Pounds:
        </Typography>
        <Slider
          getAriaLabel={() => "Weight Range"}
          value={weight}
          onChange={handleChange("weight")}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
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
};
export default FilterGroup;
