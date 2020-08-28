import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Typography, Grid} from '@material-ui/core';
import MaterialTable from 'material-table'
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

import { loadingUserAction, deleteUserAction } from '../actions/usersAction';
import {getUser} from './auth'

const useStyles = makeStyles((theme) => ({
    user: {
        marginTop: '5vh',
        marginBottom: '10vh',
      },
    }));


const Users = () => {
    const classes = useStyles();
    const userData = getUser();
    const dispatch = useDispatch();
    const loadUsers = () => dispatch(loadingUserAction());
    const deleteUser = (id) => dispatch(deleteUserAction(id));
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);

    const [dataColumn, setdataColumn] = useState([]);
    
    useEffect(() => {
        if (loading) {
            loadUsers();
        }
      },[loading]); 

      useEffect(() => {
        if (users && users.length >= 1) {
            const data = users.map(user => ({firstName: user.firstName, lastName: user.lastName, email: user.email, id: user.id}));
            setdataColumn(data);
        }
      },[users]); 

     const columns = [
        { title: 'Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Email', field: 'email'},
        { title: 'ID', field: 'id'},
      ];

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
                  title="Users"
                  columns={columns}
                  data={dataColumn}        
                  actions={[
                    {
                      icon: 'delete',
                      tooltip: 'Delete User',
                      onClick: (event, rowData) => deleteUser(rowData.id)
                    }
                  ]}
                />
            </Container>
        </>
     );
}
 
export default Users;