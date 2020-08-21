import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import {isUserAuthenticated, getUser} from './components/auth';
import Login from './components/login';
import Signup from './components/signup';
import Users from './components/users';
import Layout from './components/layout';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {Provider} from 'react-redux';
import store from './store'

function App() {

  const [darkmode, setDarkmode] = useState(false)
  const [auth, setauth] = useState(false)
  const [userData, setuserData] = useState([])

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


  useEffect(() => {
    const userData = getUser();
    setuserData(userData);
  }, [auth])
 
  
  // State viendo si es autenticado para que renderice
  // Controlar que exista token para rutas privadas


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
                  : <Login setauth={setauth}/>} />
              <Route exact path='/signup' render={() =>
                isUserAuthenticated()
                  ? (<Redirect to='/users' />)
                  : <Signup setauth={setauth}/> }/>
              <Route exact path='/users' render={() => 
                isUserAuthenticated() 
                  ? (<Users setauth={setauth} userData={userData}/>) 
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
