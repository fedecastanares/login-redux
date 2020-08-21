import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import {isUserAuthenticated} from './components/auth';
import Login from './components/login';
import Signup from './components/signup';
import Users from './components/users';
import Layout from './components/layout';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';

function App() {

  const [darkmode, setDarkmode] = useState(false)
  const [auth, setauth] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: darkmode ? 'dark': 'light' ,
      primary: {
        main: '#e17100',
      },
      secondary: {
        main: darkmode ? '#f2f2f2' : '#24292e'
      },
    },
  })

  return (
    <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout auth={auth}>
          <Router>
            <Switch>
              <Route exact path='/'  render={() => 
                isUserAuthenticated() 
                  ? (<Redirect to='/users' />) 
                  : <Login />} />
              <Route exact path='/signup' render={() =>
                isUserAuthenticated()
                  ? (<Redirect to='/users' />)
                  : <Signup /> }/>
              <Route exact path='/users' render={() => 
                isUserAuthenticated() 
                  ? (<Users />) 
                  : (<Redirect to='/' />)} />
            </Switch>
          </Router>
        </Layout>
      </Provider>
    </ThemeProvider>
    </>
  );
}

export default App;
