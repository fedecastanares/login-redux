import React from 'react';
import AlertMU from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    alert:{
        height:'3rem',
    }
}));

const Alert = ({error}) => {
    const classes = useStyles();
    return ( 
    <div className={classes.alert}>
        {error && <AlertMU severity={error.type} className={classes.alert}>{error.msg}</AlertMU>}
    </div>
     );
}
 
export default Alert;