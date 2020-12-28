import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function Copyright() {
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap align="center">
                Expertrons
                </Typography>
            </Toolbar>
            </AppBar>
        </React.Fragment>
    );
  }

