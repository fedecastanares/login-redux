import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, IconButton} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Alert from './alert'

import {isUserAuthenticated} from './auth'
import {signupUserAction, showAlert} from '../actions/signupAction';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.federicocastanares.com.uy">
        Federico Castañares
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spacing: {
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0, 1) + ' !important'
      },  
  },
  container: {
    marginTop: 0, 
    marginBottom: 0,
  }
}));

export default function Signin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signup = (user) => dispatch(signupUserAction(user));
  const error = useSelector(state => state.signup.error);
  const auth = useSelector(state => state.signup.auth);

  const [user, setUser] = React.useState({
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
  })

  const handleInputChange = e => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
  }

  const OnSUbmit = e => {
    e.preventDefault();
    if (user.name.trim() === '' || user.lastName.trim() === '' || user.email.trim() === '' || user.password.trim() === '' || user.confirmPassword.trim() === '') {
      dispatch(showAlert({type: 'warning', msg: 'All is required'}))
      return
    }
    if (user.password.length <= 7 || user.confirmPassword.length <= 7) {
      dispatch(showAlert({type: 'warning', msg: '8 caracters minimum for password'}))
      return
    }
    if (user.password !== user.confirmPassword){
      dispatch(showAlert({type: 'warning', msg: 'Passwords not equals'}))
      return
    }
    signup(user);
  }

    useEffect(() => {
      if (isUserAuthenticated()){
        props.props.history.push('/');
      }
    },[auth]); 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Grid container alignItems='center'>
              <Grid item xs={5}>
                <Link href="/">
                    <IconButton color='primary'>
                        <ArrowBackIcon/>
                    </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
              </Grid>
          </Grid>
        <Typography component="h1" variant="h5">
            Create your Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={OnSUbmit}>
          <Alert error={error} />
          <Grid container spacing={2} justify='space-around' alignItems='center' className={classes.container}>
              <Grid item xs={12} sm={6} className={classes.spacing}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="First Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={user.name}
                    onChange={handleInputChange}
                    />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.spacing}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    />
              </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm your Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={user.confirmPassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}