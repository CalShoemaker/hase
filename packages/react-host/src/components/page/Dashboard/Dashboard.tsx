import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PetsIcon from '@mui/icons-material/Pets';
import { FilterGroup } from '../../FilterGroup';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

// NOTE: These are more UserRole components that display as a list. 
// TODO: Abtract sidebar list components such that they consume UserRole related lists.
import { mainListItems, secondaryListItems } from '../../ui/ListItems'
import { Drawer } from '../../ui/Drawer';
import { AppBar } from '../../ui/AppBar';
import { Footer } from '../../Footer';
import { Widget } from "../../ui/Widget";
import { Link, useParams } from '@tanstack/react-router';
import { selectDogs } from '../../../store/slices/dogs.slice';
import { IDog } from '../../../store/slices/dogs.slice';

// NOTE: Deprecated Hook
// const useDogsData = (url:string) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await fetch(url)
        
//         if (!response.ok) {
//           throw new Error(
//             `This is an HTTP error: The status is ${response.status}`
//           );
//         }

//         let actualData = await response.json();
//         setData(actualData);
//         setError(null);

//       } catch(err:any) {
//         setError(err.message);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }  
//     }
//     getData()
//   }, [])

//   return { data, error, loading }
// };

// TODO: Abstract this further to support multiple UserRoles with corresponding views.
export const Dashboard = () => {
  // const { dogId } = useParams({ from:'/Dashboard' });
  const data = useSelector(selectDogs);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: '24px' }} >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <PetsIcon sx={{ margin:1 }} />
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Hase
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* {mainListItems} */}
          {/* {secondaryListItems} */}
          <FilterGroup />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height:'100vh' }}>
        <Grid container spacing={3}>
            {data.dogs && (data.dogs as IDog[]).map(({title, facts, id, statistics}) => (
              <Grid item xs={12} key={title}  md={4} lg={3}>
                <Link from='/' to={"/dogs/$dogId"} params={{ dogId: id }}>
                  <Widget>
                      <p>{ title }</p>
                      {/* <img src={(image.data.message) as string} /> */}
                      <p>{ statistics && Object.keys(statistics).map(key =>(<li key={key}>{key}: {(statistics as any)[key]}</li>))}</p>
                  </Widget>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;