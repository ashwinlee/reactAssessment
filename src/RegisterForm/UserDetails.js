import React, { useContext } from "react";
//GENERAL
import { TextField, Grid } from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
//CONTEXT
import { UserContext } from "./UserContext"; 
import PhoneInput from 'react-phone-number-input';

export default props => {
  const [state] = useContext(UserContext);
  const { user, errors, setValue } = state;
  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);
  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12}>
        <TextField
          placeholder='Type your email here'
          name='email'
          label='User Name'
          value={user.email}
          type='email'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["email"]}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Type your password here'
          name='password'
          label='Password'
          value={user.password}
          type='password'
          helperText='Password must be larger than 8 character'
          variant='outlined'
          margin='normal' 
          InputLabelProps={{
            shrink: true
          }}
          required
          error={!!errors["password"]}
          inputProps={{
            minLength: 8,
            maxLength: 20,
            autoComplete: "off" 
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Re-type your password here'
          label='Confirm Password'
          name='confirmPassword'
          value={user.confirmPassword}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["confirmPassword"]}
          inputProps={{
            minLength: 8,
            maxLength: 20,
            autoComplete: "off" 
          }}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          type='date'
          name='birthdate'
          id='birthdate'
          label='Birthdate'
          defaultValue={user.birthdate}
          helperText='You need to be at least 18 years old'
          variant='outlined'
          margin='normal' 
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: "1920-01-01",
            max: dateLimit.toISOString().slice(0, 10)
          }}
          error={!!errors["birthdate"]}
          required
          fullWidth={isWidthDown("sm")}
        />
      </Grid>

      
      <Grid item xs={12}> 
        {/* <PhoneInput
          placeholder='Enter phone number'
          value={user.phone}
          onChange={setValue} 
        /> */}
        <TextField
          placeholder='Type your phone number here'
          name='phone' 
          label='Phone number'
          value={user.phone}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          required
          inputProps={{ 
            maxLength: 10,
            autoComplete: "off" 
          }}
          error={!!errors["phone"]}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
