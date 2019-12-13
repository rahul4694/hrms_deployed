import React from "react";
import styled from "@emotion/styled";
import Select from "react-dropdown-select";
import { MDBContainer } from "mdbreact";
import { connect } from "react-redux";
import { formData, getDropdown } from "../actions/adduser";

export class OfficialDetails extends React.Component {
  state = { reportingManager: [] };
  componentDidMount() {
    this.props.getDropdown();
  }

  filterRM = async design => {
    await this.setState({
      reportingManager: this.props.addUserForm.reportingManager
    });
    if (design.name === "Manager") {
      const arr = this.state.reportingManager.filter(rm => {
        return rm.name === "CEO" ? true : false;
      });
      await this.setState({ reportingManager: arr });
    } else if (design.name === "Employee/Team Lead") {
      const arr = this.state.reportingManager.filter(rm => {
        return rm.name !== "CEO" ? true : false;
      });
      await this.setState({ reportingManager: arr });
    }
  };

  render() {
    const {
      designation,
      department,
      kraAttributes,
      selectedDepartment,
      selectedDesignation,
      selectedreportingManager,
      selectedkraAttributes
    } = this.props.addUserForm;
    return (
      <MDBContainer>
        <div style={{ maxWidth: "350px", margin: "0 auto" }}>
          Designation
          <StyledSelect
            multi={false}
            color="orange"
            searchBy="name"
            searchable={true}
            dropdownHandle={true}
            dropdownHeight="300px"
            direction="ltr"
            values={[selectedDesignation]}
            labelField="name"
            valueField="name"
            options={designation}
            onChange={value => {
              this.props.formData({ selectedDesignation: value[0] });
              this.filterRM(value[0]);
            }}
            noDataLabel="No matches found"
          />
        </div>
        <br />
        <div style={{ maxWidth: "350px", margin: "0 auto" }}>
          Department
          <StyledSelect
            placeholder={selectedDepartment.name || "Department"}
            color="orange"
            searchBy="name"
            searchable="true"
            dropdownHandle="true"
            dropdownHeight="300px"
            direction="ltr"
            values={[selectedDepartment]}
            labelField="name"
            valueField="name"
            options={department}
            keepSelectedInList={true}
            onChange={value => {
              this.props.formData({ selectedDepartment: value[0] });
            }}
            noDataLabel="No matches found"
          />
        </div>
        <br />
        <div style={{ maxWidth: "350px", margin: "0 auto" }}>
          Reporting Manager
          <StyledSelect
            placeholder={selectedreportingManager.name || "Reporting Manager"}
            color="orange"
            searchBy="name"
            searchable="true"
            dropdownHandle="true"
            dropdownHeight="300px"
            direction="ltr"
            values={[selectedreportingManager]}
            labelField="name"
            valueField="name"
            options={this.state.reportingManager}
            keepSelectedInList={true}
            onChange={value =>
              this.props.formData({ selectedreportingManager: value[0] })
            }
            noDataLabel="No matches found"
          />
        </div>
        <br />
        <div style={{ maxWidth: "350px", margin: "0 auto" }}>
          Kra Attributes
          <StyledSelect
            placeholder="KraAttributes"
            color="orange"
            searchBy="name"
            searchable={true}
            dropdownHandle={true}
            dropdownHeight="300px"
            direction="ltr"
            values={selectedkraAttributes}
            dropdownPosition="bottom"
            multi={true}
            labelField="name"
            valueField="name"
            options={kraAttributes}
            keepSelectedInList={true}
            onChange={value => {
              this.props.formData({ selectedkraAttributes: value });
            }}
            noDataLabel="No matches found"
          />
        </div>
      </MDBContainer>
    );
  }
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `.react-dropdown-select-dropdown {
overflow: initial;
}`}
`;

const mapStateToProps = state => {
  return {
    addUserForm: state.addUserForm
  };
};

export default connect(mapStateToProps, { formData, getDropdown })(
  OfficialDetails
);
