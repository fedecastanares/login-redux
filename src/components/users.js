import React from 'react';

import {Container, Typography, Grid,} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

import {getUser} from './auth'

const useStyles = makeStyles((theme) => ({
    user: {
        marginTop: '1vh',
      },
    }));


const Users = () => {
    const classes = useStyles();
    const userData = getUser();
    
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
                <br/>
                <br/>
                <br/>
                <h2>Tabla</h2>
            </Container>
        </>
     );
}
 
export default Users;