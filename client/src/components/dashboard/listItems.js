import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PageviewIcon from '@material-ui/icons/Pageview';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Add Employee" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="View All" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NotificationImportantIcon />
      </ListItemIcon>
      <ListItemText primary="KRA Request" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PageviewIcon />
      </ListItemIcon>
      <ListItemText primary="All KRA" />
    </ListItem>
  </div>
);
