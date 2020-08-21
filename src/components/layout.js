import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, Link, Paper} from '@material-ui/core';
import {isUserAuthenticated, deauthenticateUser} from './auth'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    minHeight: '100vh',
  }
}));

const Layout = (props) => {
    const classes = useStyles();

  return (
      <>
      <Paper className={classes.paper}>
        <div className={classes.root}>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    <Link color="inherit" href="/" className={classes.title}>
                        <Typography variant="h6">
                        Login w/auth - redux
                        </Typography>
                    </Link>
                    {
                    isUserAuthenticated() && 
                    <>
                      <Link href='/'>
                        <Button color="inherit" onClick={() => deauthenticateUser()}>
                          Logout
                        </Button>
                      </Link> 
                    </>}
                </Toolbar>
            </AppBar>
        </div>
        {props.children}
      </Paper>
    </>
  );
}
 
export default Layout;