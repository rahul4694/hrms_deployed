import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";

class Preview extends Component {
  render() {
    const {
      name,
      email,
      gender,
      selectedDesignation,
      selectedDepartment,
      selectedreportingManager,
      selectedkraAttributes
    } = this.props.addUserForm;
    return (
      <MDBContainer>
        <table className="table table-sm" border="solid 0.1px black">
          <tbody>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row">Name</th>
              <td>{name}</td>
            </tr>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row">Email</th>
              <td>{email}</td>
            </tr>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row">Gender</th>
              <td>{gender}</td>
            </tr>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row">Department</th>
              <td>{selectedDepartment.name}</td>
            </tr>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row">Designation</th>
              <td>{selectedDesignation.name}</td>
            </tr>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row">Reporting Manager</th>
              <td>{selectedreportingManager.name}</td>
            </tr>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <th scope="row" rowSpan={10}>
                KRA Attributes
              </th>
              <td>
                {selectedkraAttributes.map(kra => {
                  return (
                    <li style={{ listStyleType: "none" }} key={kra.name}>
                      {kra.name}
                    </li>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    addUserForm: state.addUserForm
  };
};

export default connect(mapStateToProps)(Preview);
