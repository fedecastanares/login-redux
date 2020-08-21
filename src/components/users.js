import React from 'react';

import {Container, Typography, Grid,} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    user: {
        marginTop: '1vh',
      },
    }));


const Users = ({userData}) => {
    const classes = useStyles();
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
                <table style={{width: '100%'}}>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                  </tr>
                  <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                  </tr>
                </table>
            </Container>
        </>
     );
}
 
export default Users;