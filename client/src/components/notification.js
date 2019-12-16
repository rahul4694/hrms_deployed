import React, { useState, useEffect } from "react";
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

function Notification({ notifications, getNotifications, clickNotification }) {
  const classes = useStyles();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getNotifications(0);
  }, [getNotifications])

  if (notifications) {
    return (
      <Grid item xs={12} md={12} className={classes.demo}>
        <List>
          {notifications.map((ele) => {
            return (
              <ListItem
                style={{ background: ele.read === true ? "whiteSmoke" : "lightgrey", color: ele.read === true ? "grey" : 'black' }}
                key={ele._id}
                onClick={e => { !ele.read && clickNotification(ele._id) }}
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
          <button disabled={skip <= 0 ? true : false} onClick={e => { setSkip(skip - 8); getNotifications(skip - 8); }}>prev</button>
          <button disabled={notifications.length < 8 ? true : false} onClick={e => { setSkip(skip + 8); getNotifications(skip + 8); }}>next</button>
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
