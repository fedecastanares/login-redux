import React , {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { loginUserAction } from '../actions/loginAction';
import {isUserAuthenticated} from './auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.federicocastanares.com.uy" target="_blank" rel="noreferrer">
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
  alert:{
    height:'3rem',
  }
}));



export default function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const login = (user) => dispatch(loginUserAction(user));
  const auth = useSelector(state => state.login.auth);
  const error = useSelector(state => state.login.error);

  const [user, setUser] = useState({
      email: '',
      password: '',
  });

  useEffect(() => {
    if (isUserAuthenticated()){
      props.props.history.push('/');
    }
  },[auth]);


  // Si hay error en la store
  if (error){
    console.log(error);
  }
  // Renderizarlo


  const OnChange = e => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
  }

  const OnSUbmit = e => {
    e.preventDefault(); 
    login(user);
  }

  // Chequea campos vacios
  

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
        <div className={classes.alert}>
          <Alert severity="error" className={classes.alert}>This is an error alert — check it out!</Alert>
        </div>
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
            value={user.email}
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
            value={user.password}
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