import React, { Component } from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import {
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CAlert,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
} from "@coreui/react";
import RoleSelection from "../../components/RoleSelection";
export default class IndividualPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_name: "",
      first_name: "",
      email: "",
      phone_number: "",
      address: "",
      birthdate: "",
      fee_type: "",
      superiors: [],
      year: "",
      role: "",
      hierarchy: "",
      activity_fields: [],
      hierarchies: [],
      hierarchies2: [],
      roles: [],
      years: [],
      feeTypes: [],
      amount: 0,
      status: true,
      modalPayment: false,
      paymentTypes: [],
      payment_type_id: "",
      activityFields: [],
      index: 0,
      alert: false,
      error: "",
      pending: false,
      membershipFee: undefined,
      activityYears: [],
      activity_year_id: 0,
    };
  }

  getActivityYears = (page=1, pageNumber=1000) => {
    fetch(
      api(
        "activityYears?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ activityYears: data.data });
      });
  };

  setError = (error) => {
    this.setState({ error: error });
  };

  clearFields = () => {
    this.setState({
      fee_type: "",
      last_name: "",
      first_name: "",
      year: "",
      activity_fields: new Array(this.state.hierarchies.length),
      activityFields: new Array(this.state.hierarchies.length),
      status: true,
      role: "",
      hierarchy: "",
      phone_number: "",
      email: "",
      error: "",
      amount: 0,
      membershipFee: undefined,
      modalPayment: false,
      alert: false,
      birthdate: "",
      address: "",
      activity_year_id: 0,
    });
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: api("activityFields/superiorFieldAndHierarchy"),
      body: JSON.stringify({
        hierarchy: this.state.hierarchies[0].name,
      }),
    };
    fetch(api("activityFields/superiorFieldAndHierarchy"), option).then(
      (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            const activityFields = new Array(this.state.hierarchies.length);
            activityFields[0] = data.activityFieds;
            this.setState({
              activityFields: activityFields,
            });
          });
        }
        throw res;
      }
    );
  };

  onChangePaymentTypeId = (e) => {
    this.setState({ payment_type_id: e.target.value });
  };

  setModalPayment = (visible) => {
    if (visible === true) {
      if (
        this.state.last_name !== "" &&
        this.state.first_name !== "" &&
        this.state.phone_number !== ""
      ) {
        this.state.hierarchies.every((hierarchy, index) => {
          if (!this.state.activity_fields[index]) {
            // console.log(true);
            this.setError(" Vous devez selectionner un " + hierarchy.name);
            this.setState({ alert: true });
            return false;
          } else if (index === this.state.hierarchies.length - 1) {
            this.setState({ modalPayment: visible, error: "", alert: false });
          }
          return true;
        });
      } else {
        this.setError(" Vous devez remplir tous les champs du formulaire");
        this.setState({ alert: true });
      }
    } else {
      this.setState({ modalPayment: visible, error: "", alert: false });
    }
  };

  onChangeBirthdate = (e) => {
    this.setState({
      birthdate: e.target.value,
    });
  };

  onChangePhoneNumber = (e) => {
    this.setState({
      phone_number: e.target.value,
    });
  };

  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  setActivityFields = async (e, hierarchyIndex) => {
    console.log(this.state.activity_fields);
    if (hierarchyIndex < 0)
      this.setState({
        activity_fields: [e],
      });
    else this.state.activity_fields[hierarchyIndex] = e;
  };

  // setActivityFields = async (e, hierarchyIndex) => {
  //   this.state.activity_fields[hierarchyIndex] = e;
  //   if (hierarchyIndex < this.state.hierarchies.length - 1) {
  //     const option = {
  //       headers: { "Content-Type": "application/json" },
  //       method: "POST",
  //       url: api("activityFields/superiorFieldAndHierarchy"),
  //       body: JSON.stringify({
  //         hierarchy: this.state.hierarchies[hierarchyIndex + 1].name,
  //         superiorField: this.state.activity_fields[hierarchyIndex],
  //       }),
  //     };
  //     this.state.activityFields.forEach((activityField, index) => {
  //       if (hierarchyIndex < index) {
  //         this.state.activityFields[index] = undefined;
  //         this.state.activity_fields[index] = undefined;
  //       }
  //     });
  //     await fetch(api("activityFields/superiorFieldAndHierarchy"), option).then(
  //       (res) => {
  //         if (res.ok) {
  //           return res.json().then((data) => {
  //             const activityFields = this.state.activityFields;
  //             activityFields[hierarchyIndex + 1] = data.activityFieds;
  //             this.setState({
  //               activityFields: activityFields,
  //               index: this.state.index + 1,
  //             });
  //           });
  //         }
  //         throw res;
  //       }
  //     );
  //   }
  //   this.getFeeTypes();
  //   this.getRoles();
  // };

  // onChangeRole = (e) => {
  //   this.setState({
  //     role: e.target.value,
  //   });
  //   this.state.roles.forEach((role) => {
  //     if (
  //       role.name.toLowerCase() !== "beazina" &&
  //       role.id.toString() === e.target.value
  //     ) {
  //       this.setState({ hierarchies2: this.state.hierarchies });
  //     } else if (
  //       role.name.toLowerCase() === "beazina" &&
  //       role.id.toString() === e.target.value
  //     ) {
  //       this.setState({ hierarchies2: [], hierarchy: "" });
  //     }
  //   });
  // };

  onChangeRole = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  onChangeYear = (e) => {
    this.setState({
      activity_year_id: e.target.value,
    });
  };

  onChangeHierarchy = (e) => {
    this.setState({
      hierarchy: e.target.value,
    });
  };

  onChangeFeeType = (e) => {
    this.setState({
      fee_type: e.target.value,
    });
  };

  onChangeLastName = (e) => {
    this.setState({
      last_name: e.target.value,
    });
  };

  onChangeFirstName = (e) => {
    this.setState({
      first_name: e.target.value,
    });
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
                  ready: true,
                  index: this.state.index + 1,
                });
              });
            }
            throw res;
          }
        );
      });
  };

  getPaymentTypes = () => {
    fetch(api("paymentTypes")).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ paymentTypes: data });
        });
      }
      throw res;
    });
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

  paymentIndividual = () => {
    const body = {
      activityFields: this.state.activity_fields,
      member_role_id: this.state.role,
      email: this.state.email,
      last_name: this.state.last_name,
      first_name: this.state.first_name,
      activity_year_id: this.state.activity_year_id,
      activity_field_id:
        this.state.activity_fields[this.state.activity_fields.length - 1],
      payment_type_id: this.state.payment_type_id,
      fee_type_id: this.state.fee_type,
      amount: this.state.amount,
      birthdate: this.state.birthdate,
      address: this.state.address,
    };
    if (this.state.phone_number !== "") {
      body.phone_number = this.state.phone_number;
    }
    if (this.state.email !== "") {
      body.email = this.state.email;
    }
    if (this.state.hierarchy !== "") {
      body.hierarchy_id = this.state.hierarchy;
    }
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    };
    // console.log(body);
    fetch(api("paymentDrafts/individualPayment"), option).then((res) => {
      if (res.ok) {
        this.clearFields();
        this.setModalPayment(false);
      }
    });
  };

  getFeeTypes = () => {
    let url = "feeTypes/feeTypeForActivityField?";
    this.state.activity_fields.forEach((activityField) => {
      if (activityField) {
        url = url + "activityFields=" + activityField + "&";
      }
    });
    fetch(api(url)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ feeTypes: data });
        });
      }
      throw res;
    });
  };

  getAmount = () => {
    let url =
      "membershipFees?member_role_id=" +
      this.state.role +
      "&activity_year_id=" +
      this.state.activity_year_id +
      "&fee_type_id=" +
      this.state.fee_type;
    if (this.state.hierarchy) {
      url = url + "&hierarchy_id=" + this.state.hierarchy;
    }
    fetch(api(url)).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // console.log(data.membershipFees.data[0]);
          this.setState({
            membershipFee: data.membershipFees.data[0],
            amount: data.membershipFees.data[0].amount,
            status: false,
          });
        });
      }
      throw res;
    });
  };

  getYears = () => {
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year + 2; i >= year; i--) {
      years.push(i);
    }
    for (let i = year - 1; i >= year - 2; i--) {
      years.push(i);
    }
    this.setState({ years: years });
  };

  componentDidMount() {
    this.getFeeTypes();
    this.getRoles();
    this.getActivityYears();
    this.getPaymentTypes();
    this.getHierarchies();
  }

  componentDidUpdate() {
    if (
      this.state.fee_type !== "" &&
      this.state.activity_year_id !== 0 &&
      this.state.role !== "" &&
      this.state.status === true
    ) {
      this.getAmount();
    }
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <div>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">Paiement individuel</CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">Nom</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.last_name}
                    onChange={this.onChangeLastName}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Prénom</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.first_name}
                    onChange={this.onChangeFirstName}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputBirthdate">
                    Date de naissance
                  </CFormLabel>
                  <CFormInput
                    type="date"
                    value={this.state.birthdate}
                    onChange={this.onChangeBirthdate}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputAddress">Adresse</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">Téléphone *</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.phone_number}
                    onChange={this.onChangePhoneNumber}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">E-mail *</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </CCol>
                <RoleSelection
                  onChangeRole={this.onChangeRole}
                  setActivityFields={this.setActivityFields}
                />
                {/* {hierarchies.map((hierarchy, index) => (
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
                </CCol> */}
                {/* <CCol md={6}></CCol> */}
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">
                    {" "}
                    Année de cotisation{" "}
                  </CFormLabel>
                  <CFormSelect
                    value={this.state.activity_year_id}
                    onChange={this.onChangeYear}
                    aria-label="Default select example"
                  >
                    <option>Selectionner une année</option>
                    {this.state.activityYears.map((year, index) => (
                      <option key={index} value={year.id}>
                        {`${year.start_year}-${year.end_year}`}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">
                    {" "}
                    Type de frais{" "}
                  </CFormLabel>
                  <CFormSelect
                    value={this.state.fee_type}
                    onChange={this.onChangeFeeType}
                    aria-label="Default select example"
                  >
                    <option>Selectionner un frais</option>
                    {this.state.feeTypes.map((feeType, index) => (
                      <option key={index} value={feeType.id}>
                        {feeType.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CForm>{" "}
              <br></br>
              <p className="text-muted">* champs non-obligatoires</p>
              <CAlert
                visible={this.state.alert}
                color="danger"
                onClose={() => this.setError("")}
              >
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <center>
                {" "}
                <h5>
                  Selon les informations saisies, le montant calculé est de{" "}
                  {this.state.amount} Ar{" "}
                </h5>
                <br></br>
                {this.state.amount !== 0 && (
                  <CForm>
                    <CFormLabel htmlFor="inputPassword4">
                      {" "}
                      Type de paiement{" "}
                    </CFormLabel>
                    <CFormSelect
                      value={this.state.payment_type_id}
                      onChange={this.onChangePaymentTypeId}
                      aria-label="Default select example"
                    >
                      <option>Choisissez votre type de paiement</option>
                      {this.state.paymentTypes.map((paymentType, index) => (
                        <option key={index} value={paymentType.id}>
                          {paymentType.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <br></br>
                  </CForm>
                )}
                <CButton
                  color="dark"
                  disabled={
                    this.state.amount === 0 ||
                    this.state.payment_type_id === "" ||
                    this.state.pending === true
                  }
                  size="lg"
                  onClick={() => this.paymentIndividual()}
                >
                  {" "}
                  Payer ma cotisation{" "}
                </CButton>
              </center>
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    );
  }
}
