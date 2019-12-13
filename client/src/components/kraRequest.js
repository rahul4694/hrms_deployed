import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { getKraRequest, updateKra } from "../actions/kraRequest";
import { setCurrentComponent } from "../actions/componentActions";
import ApproveKra from "../components/approveKra";

const columns = [
  { id: "_id", label: "Employee Code", minWidth: 100 },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "center"
  },
  {
    id: "department_id.name",
    label: "Department",
    minWidth: 170,
    align: "center"
  },

  {
    id: "kraStatus",
    label: "Aprooved Status",
    minWidth: 170,
    align: "center"
  },
  {
    id: "View",
    label: "View",
    minWidth: 170,
    align: "center"
  }
]
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
  }
});

function KraRequest(props) {
  const classes = useStyles();
  const { kraRequest } = props;
  const [flag, setFlag] = React.useState(false);

  if (flag === false) {
    props.getKraRequest();
    setFlag(true);
  }

  const viewRequest = (Component, sheetId) => {
    props.updateKra(sheetId);
    props.setCurrentComponent(Component);
  };

  if (kraRequest !== null) {
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Header
            as="h3"
            content="KRA REQUEST"
            style={style.h1}
            textAlign="center"
          />
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
              {kraRequest.kraRequest.map((user, i) => (
                <TableRow key={i}>
                  <TableCell align="center">A{user.userId._id}</TableCell>
                  <TableCell align="center">{user.userId.name}</TableCell>
                  <TableCell align="center">
                    {user.userId.department_id.name}
                  </TableCell>
                  <TableCell align="center">
                    {user.kraSheet[0].Status}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        viewRequest(
                          <ApproveKra
                            status={user.kraSheet[0].Status}
                            user_Id={user.userId._id}
                          />,
                          user.kraSheet[0]._id
                        );
                      }}
                    >
                      Check
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button disabled>prev</Button>
        <Button disabled>next</Button>
      </Paper>
    );
  } else {
    return "";
  }
}
const mapStateToProps = state => ({
  kraRequest: state.kraRequest,
  showTab: state.showTab.comp
});

export default connect(mapStateToProps, {
  setCurrentComponent,
  getKraRequest,
  updateKra
})(KraRequest);
