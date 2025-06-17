import {
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import { Component } from "react";
import { withRouter } from "react-router";
import api from "../const/api";

class RoleSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hierarchies: [],
      activityFields: [],
      roles: [],
      activity_fields: [],
      role: "",
      hierarchies2: [],
      hierarchy: "",
      index: 0,
      foibe: false,
      conat: false,
      foibeId: 14,
      conatId: 1,
    };
  }

  componentDidMount() {
    this.getRoles();
    this.getRoleFoibe();
    this.getRoleConat();
    this.getHierarchies();
  }

  getRoleConat = () => {
    fetch(api(`memberRoles?name=CONAT`)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (
            data &&
            data.memberRoles &&
            data.memberRoles.data &&
            data.memberRoles.data.length > 0
          )
            this.setState({ conatId: data.memberRoles.data[0].id });
        });
      }
      throw res;
    });
  };

  getRoleFoibe = () => {
    fetch(api(`memberRoles?name=Foibe (Ekipa Nasionaly, RAPI)`)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (
            data &&
            data.memberRoles &&
            data.memberRoles.data &&
            data.memberRoles.data.length > 0
          )
            this.setState({ foibeId: data.memberRoles.data[0].id });
        });
      }
      throw res;
    });
  };

  onChangeFoibe = () => {
    this.setState(
      {
        foibe: !this.state.foibe,
      },
      () => {
        if (this.state.foibe) {
          this.setState({ role: this.state.foibeId });
          this.props.onChangeRole({ target: { value: this.state.foibeId } });
          this.props.setActivityFields(1, -1);
        }
      }
    );
  };

  onChangeConat = () => {
    this.setState(
      {
        conat: !this.state.conat,
      },
      () => {
        if (this.state.conat) {
          this.setState({ role: this.state.conatId });
          this.props.onChangeRole({ target: { value: this.state.conatId } });
        } else {
          this.setState({ role: this.state.foibeId });
          this.props.onChangeRole({ target: { value: this.state.foibeId } });
        }
        this.props.setActivityFields(1, -1);
      }
    );
  };

  getHierarchies = () => {
    fetch(api("hierarchies/hierarchies"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ hierarchies: data.hierarchies });
        const option = {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          url: api("activityFields/superiorFieldAndHierarchy"),
          body: JSON.stringify({
            hierarchy: data.hierarchies[this.state.index].name,
          }),
        };
        fetch(api("activityFields/superiorFieldAndHierarchy"), option).then(
          (res) => {
            if (res.ok) {
              return res.json().then((data) => {
                const activityFields = new Array(this.state.hierarchies.length);
                const activity_fields = new Array(
                  this.state.hierarchies.length
                );
                activityFields[0] = data.activityFieds;
                this.setState({
                  activity_fields: activity_fields,
                  activityFields: activityFields,
                  index: this.state.index + 1,
                });
              });
            }
            throw res;
          }
        );
      });
  };

  onChangeRole = (e) => {
    this.setState({
      role: e.target.value,
    });
    this.state.roles.forEach((role) => {
      if (
        role.name.toLowerCase() !== "beazina" &&
        role.id.toString() === e.target.value
      ) {
        this.setState({ hierarchies2: this.state.hierarchies });
      } else if (
        role.name.toLowerCase() === "beazina" &&
        role.id.toString() === e.target.value
      ) {
        this.setState({ hierarchies2: [], hierarchy: "" });
      }
    });
    this.props.onChangeRole(e);
  };

  onChangeRoleInput = (e) => {
    this.setState({
      role: e.target.value,
    });
    this.state.roles.forEach((role) => {
      if (
        role.name.toLowerCase() !== "beazina" &&
        role.id.toString() === e.target.value
      ) {
        this.setState({ hierarchies2: this.state.hierarchies });
      } else if (
        role.name.toLowerCase() === "beazina" &&
        role.id.toString() === e.target.value
      ) {
        this.setState({ hierarchies2: [], hierarchy: "" });
      }
    });
    // this.props.onChangeRole(e);
  };

  getRoles = () => {
    // Change the role to show according to the selected hierarchy
    let hierarchyId = 2;
    if (this.state.activity_fields[1] && this.state.activity_fields[1] !== "")
      hierarchyId = 3;
    if (this.state.activity_fields[2] && this.state.activity_fields[2] !== "")
      hierarchyId = 4;
    // Get the roles
    fetch(api(`memberRoles?hierarchy_id=${hierarchyId}`)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ roles: data.memberRoles.data });
        });
      }
      throw res;
    });
  };

  setActivityFields = async (e, hierarchyIndex) => {
    this.state.activity_fields[hierarchyIndex] = e;
    if (hierarchyIndex < this.state.hierarchies.length - 1) {
      const option = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        url: api("activityFields/superiorFieldAndHierarchy"),
        body: JSON.stringify({
          hierarchy: this.state.hierarchies[hierarchyIndex + 1].name,
          superiorField: this.state.activity_fields[hierarchyIndex],
        }),
      };
      this.state.activityFields.forEach((activityField, index) => {
        if (hierarchyIndex < index) {
          this.state.activityFields[index] = undefined;
          this.state.activity_fields[index] = undefined;
        }
      });
      await fetch(api("activityFields/superiorFieldAndHierarchy"), option).then(
        (res) => {
          if (res.ok) {
            return res.json().then((data) => {
              const activityFields = this.state.activityFields;
              activityFields[hierarchyIndex + 1] = data.activityFieds;
              this.setState({
                activityFields: activityFields,
                index: this.state.index + 1,
              });
            });
          }
          throw res;
        }
      );
    }
    this.props.setActivityFields(e, hierarchyIndex);
    this.getRoles();
  };

  render() {
    const { hierarchies, activityFields, roles } = this.state;
    return (
      <>
        <CCol md={12}>
          <CFormCheck
            id="foibeCheck"
            label="Ekipa foibe"
            onChange={this.onChangeFoibe}
            checked={this.state.foibe}
          />
        </CCol>
        {this.state.foibe ? (
          <>
            <CCol md={12}>
              <CFormCheck
                id="conatCheck"
                label="CONAT"
                onChange={this.onChangeConat}
                checked={this.state.conat}
              />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="role">Rôle</CFormLabel>
              <CFormInput
                type="text"
                value={this.state.roleInput}
                onChange={this.onChangeRoleInput}
              />
            </CCol>
          </>
        ) : (
          <>
            {hierarchies.map((hierarchy, index) => (
              <CCol md={4} key={index}>
                <CFormLabel htmlFor="inputPassword4">
                  {hierarchy.name}
                </CFormLabel>
                <CFormSelect
                  onChange={(e) =>
                    this.setActivityFields(e.target.value, index)
                  }
                  value={activityFields[index] && activityFields[index].id}
                  aria-label="Default select example"
                >
                  <option value="">Selectionner votre {hierarchy.name}</option>
                  {activityFields[index] &&
                    activityFields[index].map((activityField, index) => (
                      <option value={activityField.id} key={index}>
                        {activityField.name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
            ))}
            <CCol md={12}>
              <CFormLabel htmlFor="inputPassword4"> Rôle </CFormLabel>
              <CFormSelect
                value={this.state.role}
                onChange={this.onChangeRole}
                aria-label="Default select example"
              >
                <option>Selectionner un rôle</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </>
        )}
      </>
    );
  }
}

export default withRouter(RoleSelection);
