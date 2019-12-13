import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Avatar, Button } from "@material-ui/core";
import { viewUsers } from "../actions/viewUser";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";

const columns = [
  { id: "_id", label: "Employee Code", minWidth: 100 },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "left"
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "left"
  },
  {
    id: "department_id.name",
    label: "Department",
    minWidth: 170,
    align: "left"
  },
  {
    id: "designation_id.name",
    label: "Designation",
    minWidth: 170,
    align: "left"
  },
  {
    id: "jobStatus",
    label: "Status",
    minWidth: 170,
    align: "right"
  }
];
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
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: "auto"
  },
  red: {
    color: "#fff",
    float: "right",
    backgroundColor: "#ff0000"
  },
  green: {
    color: "#fff",
    float: "right",
    backgroundColor: "#1b5e20"
  }
});

function ViewUsers(props) {
  const classes = useStyles();

  const [skipvalue, setskipvalue] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const { allusers } = props;

  if (flag === false) {
    props.viewUsers(0);
    setFlag(true);
  }

  const next = () => {
    props.viewUsers(skipvalue + 2);
    setskipvalue(skipvalue + 2);
  };
  const prev = () => {
    props.viewUsers(skipvalue - 2);
    setskipvalue(skipvalue - 2);
  };

  return (
    <Paper className={classes.root}>
      <Header as="h3" content="ALL USERS" style={style.h1} textAlign="center" />
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allusers &&
              allusers.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>{`${user.prefix}${user._id}`}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.department_id.name}</TableCell>
                  <TableCell>{user.designation_id.name}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {user.jobStatus === "working" ? (
                      <Avatar className={classes.green}>W</Avatar>
                    ) : user.jobStatus === "abscond" ? (
                      <Avatar className={classes.red}>A</Avatar>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Button disabled={skipvalue <= 0 ? true : false} onClick={e => prev()}>
        prev
      </Button>
      <Button
        disabled={skipvalue >= props.userlen - 1 ? true : false}
        onClick={e => next()}
      >
        next
      </Button>
    </Paper>
  );
}
const mapStateToProps = state => {
  return {
    allusers: state.allusers.all_users,
    userlen: state.allusers.userlen
  };
};

export default connect(mapStateToProps, { viewUsers })(ViewUsers);
