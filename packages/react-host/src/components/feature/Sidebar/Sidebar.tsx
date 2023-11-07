import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, IconButton, List, Divider, Input } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PetsIcon from '@mui/icons-material/Pets';
import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FilterGroup } from '../FilterGroup';

export const Sidebar = (props:any) => {
  return (
    <List component="nav">
    {/* {mainListItems} */}
    {/* {secondaryListItems} */}
      <Input 
            id="filter" 
            name="filter"
            type="text" 
            onChange={event => props.setFilters(event.target.value)} />
      <FilterGroup />
      <Divider sx={{ my: 1 }} />
    </List>
  );
}
export default Sidebar