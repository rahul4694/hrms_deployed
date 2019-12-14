import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authAction";
import Adminfeatures from "./adminFeatures";
import Managerfeatures from "./managerFeatures";
import Employeefeatures from "./employeeFeatures";
import Popover from "@material-ui/core/Popover";
import Notification from "../notification";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { setCurrentComponent } from "../../actions/componentActions";
import Changepassword from "../ChangePassword";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    backgroundColor: "#1b1c1d",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  typography: {
    padding: theme.spacing(2)
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [designation, setDesignation] = React.useState(null);
  const [component, setComponent] = React.useState(null);
  const [flag, setFlag] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  if (flag === false) {
    setDesignation(props.auth.user.userdata.designation_id.name);
    if (designation === "Admin") {
      setFlag(true);
      setComponent(<Adminfeatures />);
    } else if (designation === "Manager") {
      setFlag(true);
      setComponent(<Managerfeatures />);
    } else if (designation === "Employee/Team Lead") {
      setFlag(true);
      setComponent(<Employeefeatures />);
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const notiopen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <IconButton
              color="inherit"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              className={classes.notification}
              mr={2}
            >
              <Badge
                badgeContent={props.auth.user.notificationLength}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Typography>

          <Popover
            id={id}
            open={notiopen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Typography className={classes.typography}>
              <Notification />
            </Typography>
          </Popover>
          <Button
            color="inherit"
            onClick={e => {
              onLogoutClick(e);
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <h3>Welcome {props.auth.user.userdata.name}</h3>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>{component}</div>
        </List>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.setCurrentComponent(<Changepassword />);
          }}
        >
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {props.showTab}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  email: state.auth.user.userdata.designation_id.email,
  showTab: state.showTab.comp
});
export default connect(mapStateToProps, { logoutUser, setCurrentComponent })(
  Dashboard
);
