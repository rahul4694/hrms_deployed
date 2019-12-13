import React from "react";
import PropTypes, { object } from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import WorkIcon from "@material-ui/icons/Work";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import OfficialDetails from "./officialDetails";
import BasicDetails from "./basicDetails";
import Preview from "./preview";
import { saveUser } from "../actions/adduser";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCurrentComponent } from "../actions/componentActions";
import { Header } from "semantic-ui-react";
import { basicDetails } from "../actions/adduser";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
          <div className={classes.circle} />
        )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <GroupAddIcon />,
    2: <WorkIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    padding: "10px"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
const style = {
  h1: {
    fontFamily: "Times New Roman",
    fontWeight: "bolder"
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em"
  }
};
function getSteps() {
  return ["Basic Details", "Official", "Preview"];
}

function CustomizedSteppers(props) {
  let {
    name,
    email,
    gender,
    selectedDepartment,
    selectedDesignation,
    selectedkraAttributes,
    selectedreportingManager,
    errors
  } = props.addUserForm;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicDetails func={sendBasicDetails} />;
      case 1:
        return <OfficialDetails />;
      case 2:
        return <Preview />;
      default:
        return "Unknown step";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [Name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const steps = getSteps();

  const validator = () => {
    if (activeStep === 0) {
      if (Name.length < 1 || Email.length < 1 || Gender.length < 1) {
        alert("please fill all fields");
        return false;
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          Email
        )
      ) {
        // (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(Email))
        alert("please fill a valid email");
        return false;
      }
    } else if (activeStep === 1) {
      if (
        selectedDepartment.name === undefined ||
        selectedDesignation.name === undefined ||
        selectedkraAttributes[0] === undefined ||
        selectedreportingManager.name === undefined
      ) {
        alert("please choose all fields");
        return false;
      }
    }
    return true;
  };

  const sendBasicDetails = details => {
    if (Object.keys(details)[0] === "name") {
      setName(Object.values(details)[0]);
    } else if (Object.keys(details)[0] === "email") {
      setEmail(Object.values(details)[0]);
    } else {
      setGender(Object.values(details)[0]);
    }
  };
  const handleNext = () => {
    if (validator()) {
      if (activeStep === 0) {
        console.log();
        props.basicDetails({ name: Name, email: Email, gender: Gender });
      }
      if (activeStep === 2) {
        const res = window.confirm("Are you sure that you want to submit ?");
        if (res) {
          onsubmit();
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  onsubmit = () => {
    props.saveUser({
      name: name,
      email: email,
      gender: gender,
      department_id: selectedDepartment,
      designation_id: selectedDesignation,
      reportingManager: selectedreportingManager,
      kraAttributes: selectedkraAttributes
    });
  };
  return (
    <Paper className={classes.root}>
      <Header
        as="h3"
        content="ADD NEW USER"
        style={style.h1}
        textAlign="center"
      />

      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <p>{props.error}</p>
            </div>
          ) : (
              <div>
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </Paper>
  );
}

const mapStateToProps = state => {
  return {
    addUserForm: state.addUserForm,
    error: state.errors.error
  };
};

export default connect(mapStateToProps, {
  saveUser,
  setCurrentComponent,
  basicDetails
})(withRouter(CustomizedSteppers));
