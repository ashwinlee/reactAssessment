import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
//MY MODULES
import UserDetails from "./UserDetails";
import UserSummary from "./UserSummary"; 

//GENERAL
import { Box, Typography, Snackbar, SnackbarContent } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
//STEPPER
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
//FORM
import Button from "@material-ui/core/Button";
//CONTEXT
import { UserContext } from "./UserContext";
import { StarRate } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8, 12)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 6)
    }
  },
  center: {
    textAlign: "center"
  },
  content: {
    padding: theme.spacing(3, 0, 3, 5)
  },
  buttonsContainer: {
    margin: theme.spacing(2, 0)
  },
  button: {
    marginRight: theme.spacing(2)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

const steps = ["Basic information", "Summary"];

//MAIN COMPONENT
export default props => {
  const [completed, setCompleted] = React.useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useContext(UserContext);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const isStepOptional = step => {
    return step === 1;
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (activeStep < steps.length - 1) handleNext();
    else {
      setCompleted(true);
    }
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <UserDetails />;
      case 1:
        return <UserSummary />; 
      default:
        return "Unknown step";
    }
  };

  const handleError = e => {
    errors[e.target.name] = e.target.validationMessage;
    setState({ ...state, errors: { ...errors } });
    setOpen(true);
  };

  const handleChange = e => { 
    // const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");  
    // console.log(strongPassword.test(state.user.password));
    // if(e.target.name === "password" && strongPassword.test(state.user.password)){ 
    //   e.target.setCustomValidity("");
    // }else{ 
    //   e.target.setCustomValidity("Password must be 8 character with at least 1 uppercase, 1 lowercase, 1 symbol and 1 number.");
    // } 
    // const checkPhone = new RegExp("^(?=.*[0-9])");  
    // console.log(checkPhone.test(state.user.phone));
    // if( e.target.name === "phone" && e.target.value !== state.user.phone ){
    //   if(!checkPhone.test(state.user.phone)){
    //     e.target.setCustomValidity("Padwwng");
    //   } 
    // }
    //PASSWORD MATCHING 
    if ( e.target.name === "confirmPassword" && e.target.value !== state.user.password ) {
      e.target.setCustomValidity("Passwords are not matching");
    } else {
      e.target.setCustomValidity("");
    }
    if (e.target.name === "password") {
      const confirm = e.target.form.querySelector(
        "input[name='confirmPassword']"
      ); 
      if (e.target.value === state.user.confirmPassword) {
        delete errors[confirm.name];
        confirm.setCustomValidity("");
      } else {
        confirm.setCustomValidity("Passwords are not matchingzzz");
        errors[confirm.name] = confirm.validationMessage;
      }
    }
    if (e.target.validity.valid) { 
      delete errors[e.target.name];
    } else {
      errors[e.target.name] = e.target.validationMessage;
    }
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      user: { ...state.user, [e.target.name]: value },
      errors: { ...errors }
    });
  };

  return (
    <Fragment>
      {!completed && (
        <Box className={classes.root}>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((label, index) => {
              const labelProps = {};
                
              return (
                <Step key={index}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                  <StepContent>
                    <form
                      onSubmit={handleSubmit}
                      onInvalid={handleError}
                      onChange={handleChange}
                      className={classes.content}
                    >
                      {getStepContent(activeStep)}
                      <div className={classes.buttonsContainer}>
                        <Button
                          disabled={activeStep === 0}
                          className={classes.button}
                          variant='contained'
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        {activeStep < steps.length - 1 && (
                          <Button
                            type='submit'
                            className={classes.button}
                            variant='contained'
                            color='primary'
                          >
                            Submit
                          </Button>
                        )} 
                      </div>
                    </form>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        resumeHideDuration={3000}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        open={open}
      >
        <SnackbarContent
          className={(classes.error, classes.error)}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {"Invalid data"}
            </span>
          }
        />
      </Snackbar> 
    </Fragment>
  );
};
