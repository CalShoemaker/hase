import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from '@mui/material/Link';

export const FilterGroup = (props:any) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ }} >
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            My Collections
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{whiteSpace:'initial'}}>
            <FormControlLabel control={<Checkbox />} label="Lap dogs" />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FilterGroup