import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Typography, Grid} from '@material-ui/core';
import MaterialTable from 'material-table'
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

import { loadingUserAction } from '../actions/usersAction';
import {getUser} from './auth'

const useStyles = makeStyles((theme) => ({
    user: {
        marginTop: '1vh',
      },
    }));


const Users = () => {
    const classes = useStyles();
    const userData = getUser();
    const dispatch = useDispatch();
    const loadUsers = () => dispatch(loadingUserAction());
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);
    
    useEffect(() => {
        if (loading) {
            loadUsers();
        }
      },[loading]); 
    
    return ( 
        <>
            <Container>
                {userData && 
                <>
                    <Grid container alignItems='flex-end' spacing={1} className={classes.user}>
                        <Grid item>
                            <PersonIcon  color='secondary' />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" >
                                {userData.name} {userData.lastName}
                            </Typography>
                        </Grid>
                    </Grid>  
                </>}
                <MaterialTable
                  title="Simple Action Preview"
                  columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Last Name', field: 'lastName' },
                    { title: 'Email', field: 'email'},
                  ]}
                  data={[
                    { name: 'Federico', lastName: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                  ]}        
                  actions={[
                    {
                      icon: 'save',
                      tooltip: 'Save User',
                      onClick: (event, rowData) => alert("You saved " + rowData.name)
                    }
                  ]}
                />
            </Container>
        </>
     );
}
 
export default Users;