import React from 'react';
import { List, Divider, Input } from '@mui/material';
import { FilterGroup } from '../FilterGroup';
import { mainListItems, secondaryListItems } from '../../ui/ListItems';

export const Sidebar = (props:any) => {
  return (
    <List component="nav">
      <Input 
            id="filter" 
            name="filter"
            type="text" 
            onChange={event => props.setFilters(event.target.value)} />

      <Divider sx={{ my: 1 }} />
      {mainListItems}
      {secondaryListItems}
      
      <FilterGroup />
      <Divider sx={{ my: 1 }} />
    </List>
  );
}
export default Sidebar