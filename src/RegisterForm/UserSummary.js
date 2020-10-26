import React, { useContext, Fragment } from "react";
import { UserContext } from "./UserContext";
import { makeStyles } from "@material-ui/core/styles";

//GENERAL
import {
  Typography,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  summary: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2)
  }
}));
// SUMMARY COMPONENT
export default props => {
  const classes = useStyles();
  const [state] = useContext(UserContext);
  const { email, birthdate, phone, password } = state.user;
  return (
    <Fragment>
      <Grid container className={classes.summary}>
        <Grid item xs={12}>
          <Typography variant='h4'>Summary</Typography>
        </Grid> 
         
        <Grid item xs={12}>
          <Typography variant='h6'>User Name</Typography>
          <Typography variant='body2'>{email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Birthdate</Typography>
          <Typography variant='body2'>{birthdate}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Phone</Typography>
          <Typography variant='body2'>{phone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Password</Typography>
          <Typography variant='body2'>{password}</Typography>
        </Grid>
      </Grid> 
    </Fragment>
  );
};
