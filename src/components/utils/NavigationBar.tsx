

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Logout from '../auth/Logout'
import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Birthday App
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/profile")}>
          Profile
        </Button>
        <Logout />
      </Toolbar>
    </AppBar>
  );
}
