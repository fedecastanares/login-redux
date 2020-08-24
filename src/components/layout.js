import React , {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
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
  },
  header: {
    backgroundColor: '#24292e'
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  const [logout, setlogout] = useState(false);
  const auth = useSelector(state => state.login.auth);

  useEffect(() => {
    isUserAuthenticated() ? setlogout(true) : setlogout(false)
  },[auth]);


  return (
      <>
      <Paper className={classes.paper}>
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Link color="inherit" href="/" className={classes.title}>
                        <Typography variant="h6">
                        Login w/auth - redux
                        </Typography>
                    </Link>
                    {
                    logout && 
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