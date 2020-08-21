import React from 'react';
import axios from 'axios';

import {authenticateUser, dataUser} from './auth'
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, IconButton} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';


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

export default function Signin() {
  const classes = useStyles();

  const [user, setUser] = React.useState({
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
  })

  const {name, lastName, email, password, confirmPassword} = user;

  const OnChange = e => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
  }

  const OnSUbmit = e => {
    e.preventDefault();

    // Comprobacion de datos
    axios.post('http://192.168.1.104:8000/users', {
      firstName: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    })
    .then(function (response) {
      if (response.statusText === "Created"){
        authenticateUser(response.data.accessToken);
        dataUser(user.name, user.lastName);
        console.log(response)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    // Limpiar los values
  }

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
                    value={name}
                    onChange={OnChange}
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
                    value={lastName}
                    onChange={OnChange}
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
            value={email}
            onChange={OnChange}
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
            value={password}
            onChange={OnChange}
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
            value={confirmPassword}
            onChange={OnChange}
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