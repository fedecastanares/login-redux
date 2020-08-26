import React , {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from './alert'

import { loginUserAction, showAlert } from '../actions/loginAction';
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

  const handleInputChange  = e => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
  }

  const OnSUbmit = e => {
    e.preventDefault(); 
    if (user.email.trim() === '' || user.password.trim === ''){
      dispatch(showAlert({type: 'warning', msg: 'All is required'}))
      return 
    } 
    login(user);
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={OnSUbmit}>
          <Alert error={error}/>
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
            onChange={handleInputChange }
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