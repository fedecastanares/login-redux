import React from 'react';
import axios from 'axios';

import {authenticateUser, getToken, dataUser} from './auth'
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
}));

export default function Login({setauth}) {
  const classes = useStyles();

  const [user, setUser] = React.useState({
      email: '',
      password: '',
  })

  const {email, password} = user;

  const OnChange = e => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
  }

  const OnSUbmit = e => {
    e.preventDefault();
    axios.post('http://192.168.1.104:8000/login', {
      email: user.email,
      password: user.password
    })
    .then(function (response) {
      if (response.statusText === "OK"){
        authenticateUser(response.data.accessToken);
        const token = getToken();
        var config = {
          method: 'get',
          url: `http://192.168.1.104:8000/440/users?email=${user.email}`,
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        };
        axios(config)
        .then(function (response) {
          dataUser(response.data[0].firstName, response.data[0].lastName);
          setauth(true)
        })
        .catch(function (error) {
          dataUser('hubo', 'un error');
        });
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={OnSUbmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}