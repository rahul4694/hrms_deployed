import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import EventNoteIcon from "@material-ui/icons/EventNote";
import {
  getNotifications,
  clickNotification
} from "../actions/viewNotifications";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

function Notification(props) {
  const classes = useStyles();
  const [skip, setSkip] = React.useState(0);
  const [flag, setFlag] = React.useState(false);

  if (flag === false) {
    props.getNotifications(0);
    setFlag(true);
  }

  if (props.notifications) {
    return (
      <Grid item xs={12} md={8} className={classes.demo}>
          <List>
            {props.notifications.map((ele) => {
              return (
                <ListItem
                  style={{ background: ele.read===true?"whiteSmoke":"lightgrey", color:ele.read===true?"grey":'black' }}
                  key={ele._id}
                  onClick={e => props.clickNotification(ele._id)}
                >
                  <ListItemAvatar>
                    {ele.typeId.type === "KRA filled" ? (
                      <Avatar
                        style={{
                          fontSize: "medium",
                          backgroundColor: "orange"
                        }}
                      >
                        <EventNoteIcon />
                      </Avatar>
                    ) : ele.typeId.type === "KRA Approved" ? (
                      <Avatar
                        style={{ fontSize: "medium", backgroundColor: "blue" }}
                      >
                        <DoneAllIcon />
                      </Avatar>
                    ) : (
                      <Avatar
                        style={{ fontSize: "medium", backgroundColor: "green" }}
                      >
                        <HowToRegIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  {ele.from.name + " " + ele.typeId.msg}
                </ListItem>
              );
            })}
            <button disabled={skip<=0?true:false} onClick={e=>{setSkip(skip-8); props.getNotifications(skip-8); }}>prev</button>
            <button onClick={e=>{setSkip(skip+8); props.getNotifications(skip+8); }}>next</button>
          </List>
      </Grid>
    );
  } else {
    return <div>No new notification</div>;
  }
}

const mapStateToProps = state => ({
  notifications: state.getnotification.notifications
});

export default connect(mapStateToProps, {
  getNotifications,
  clickNotification
})(Notification);
