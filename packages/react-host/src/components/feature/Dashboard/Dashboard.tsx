import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PetsIcon from '@mui/icons-material/Pets';
import { useState } from "react";
import { Drawer } from '../../ui/Drawer';
import { AppBar } from '../../ui/AppBar';
import { Link } from '@tanstack/react-router';

export const Dashboard = (props:any) => {
  // const { dogId } = useParams({ from:'/Dashboard' });
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
            <Link style={{textDecoration:'none', color:'#fff'}} to='/dogs'>
            Dogs
            </Link>
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
            <Link style={{textDecoration:'none', color:'#000'}} to='/'>Hase</Link>
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        { props.sidebar }
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height:'calc(100vh - 105px)' }}>
          { props.main }
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;