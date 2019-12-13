import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Header } from "semantic-ui-react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import getCurrentMonthAndYear from "./utils/getCurrentMonthAndYear";
import { connect } from "react-redux";
import { viewkra } from "../actions/viewkra";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

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
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));
let i;
let years = [];
for (i = getCurrentMonthAndYear().year; i >= 2015; i--) {
  years.push({ i });
}

function CustomizedTables(props) {
  const classes = useStyles();
  const [first, setfirst] = useState(true);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  if (first === true) {
    const d = new Date();
    props.viewkra(d.getFullYear());
    setfirst(false);
  }

  const showlist = () => {
    if (props.viewkradata) {
      const trowhead = props.viewkradata.map(month => {
        let d = new Date(month.date);
        return months[d.getMonth()];
      });
      return props.viewkradata.map((month, i) => {
        return (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Key Result Area</StyledTableCell>
                {props.kraattr.map(kra => (
                  <StyledTableCell align="center" key={kra._id}>
                    {kra.name}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {trowhead[i]}
                </StyledTableCell>
                {month.kraAttributes.map((kra, j) => {
                  return (
                    <StyledTableCell key={j} align="center">
                      {kra.value}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell align="center">{month.Status}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        );
      });
    }
  };

  return (
    <Paper className={classes.root}>
      <Header
        as="h3"
        content="MY Key Result Area"
        style={style.h1}
        textAlign="center"
      />

      <Select
        defaultValue={getCurrentMonthAndYear().year}
        onChange={e => props.viewkra(e.target.value)}
      >
        {years.map((d, i) => (
          <option key={i} value={d.i}>
            {d.i}
          </option>
        ))}
      </Select>
      {props.viewkradata.length > 0 ? (
        showlist()
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          NO KRA FILLED
        </div>
      )}
    </Paper>
  );
}

const mapStateToProps = state => {
  return {
    viewkradata: state.addKra.viewKraData,
    kraattr: state.auth.user.userdata.kraAttributes,
    errormsg: state.errors.error
  };
};
export default connect(mapStateToProps, { viewkra })(CustomizedTables);
