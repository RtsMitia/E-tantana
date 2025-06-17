import React from "react";
import Moment from "moment";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import { cilTags } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export default class PublicPaymentsLogged extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pending: false,
      payments: [],
      activityYears: [],
      activityYear: 0,
      activityField: 0,
      hierarchies: [],
      activityFields: [],
      activity_fields: [],
      hierarchies2: [],
      hierarchy: "",
      index: 0,
      check: [],
      checkAll: false,
    };
  }

  componentDidMount() {
    this.getActivityYears();
    this.getHierarchies();
  }

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
    this.setActivityField(e);
  };

  getActivityYears = () => {
    this.setLoading(true);
    fetch(api("activityYears?page=1&pageNumber=100"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({ activityYears: data.data });
        this.setLoading(false);
      });
  };

  getPayments = (activityField, activityYear) => {
    this.setLoading(true);
    fetch(
      api(
        `payments/public?activityField=${Number(
          activityField
        )}&activityYear=${Number(activityYear)}`
      )
    ).then((res) => {
      if (res.ok)
        res.json().then((data) => {
          if (data && data.payment)
            this.setState({
              payments: data.payment,
              check: data.payment.map(() => false),
            });
        });
      this.setLoading(false);
    });
  };

  generateTickets = () => {
    let res = this.state.payments.map((p, i) => {
      if (this.state.check[i]) return p.paymentDetailId;
      return null;
    });
    res = res.filter((value) => {
      return value !== null;
    });
    res = "".concat(res);
    this.props.history.push(`/paymentTickets/${res}`);
  };

  render() {
    const { hierarchies, activityFields } = this.state;

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des paiements</strong>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {this.state.check.includes(true) && (
                    <CButton color={"primary"} onClick={this.generateTickets}>
                      <CIcon icon={cilTags} className="me-2" />
                      Génerer tickets
                    </CButton>
                  )}
                </span>
              </CCardHeader>
              <CCardBody>
                {this.state.loading ? (
                  <Loading />
                ) : (
                  <>
                    <CRow>
                      {hierarchies.map((hierarchy, index) => (
                        <CCol md={4} key={index}>
                          <CFormLabel htmlFor="inputPassword4">
                            {hierarchy.name}
                          </CFormLabel>
                          <CFormSelect
                            onChange={(e) =>
                              this.setActivityFields(e.target.value, index)
                            }
                            value={
                              activityFields[index] && activityFields[index].id
                            }
                            aria-label="Default select example"
                          >
                            <option value="">
                              Selectionner votre {hierarchy.name}
                            </option>
                            {activityFields[index] &&
                              activityFields[index].map(
                                (activityField, index) => (
                                  <option value={activityField.id} key={index}>
                                    {activityField.name}
                                  </option>
                                )
                              )}
                          </CFormSelect>
                        </CCol>
                      ))}
                      <div className="mb-3">
                        <CFormLabel htmlFor="activityYear">
                          Année d'activité
                        </CFormLabel>
                        <CFormSelect
                          id="activityYear"
                          value={this.state.activityYear}
                          onChange={this.setActivityYear}
                        >
                          <option>Selectionner une année</option>
                          {this.state.activityYears &&
                            this.state.activityYears.map((a) => (
                              <option
                                key={a.id}
                                value={a.id}
                              >{`${a.start_year} - ${a.end_year}`}</option>
                            ))}
                        </CFormSelect>
                      </div>
                      <div className="mb-3">
                        <CButton
                          onClick={() => {
                            this.getPayments(
                              this.state.activityField,
                              this.state.activityYear
                            );
                          }}
                        >
                          Afficher
                        </CButton>
                      </div>
                    </CRow>
                  </>
                )}
                {this.state.payments && this.state.payments.length > 0 && (
                  <CTable>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell scope="col">
                          <CFormCheck
                            checked={this.state.checkAll}
                            onChange={this.checkAll}
                          />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Prénom(s)
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Lieu d'activité
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Date de paiement
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {this.state.payments &&
                        this.state.payments.map((payment, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              <CFormCheck
                                checked={this.state.check[index]}
                                onChange={() => this.setCheck(index)}
                              />
                            </CTableDataCell>
                            <CTableDataCell>{payment.last_name}</CTableDataCell>
                            <CTableDataCell>
                              {payment.first_name}
                            </CTableDataCell>
                            <CTableDataCell>
                              {payment.activityField}
                            </CTableDataCell>
                            <CTableDataCell>
                              {Moment(payment.date).format("D/MM/y")}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }

  setLoading = (state) => {
    this.setState({
      loading: state,
    });
  };

  setPending = (state) => {
    this.setState({
      pending: state,
    });
  };

  setActivityField = (value) => {
    this.setState({
      activityField: value,
    });
  };

  setActivityYear = (e) => {
    this.setState({
      activityYear: e.target.value,
    });
  };

  checkAll = () => {
    this.state.check.forEach((c, i) => {
      this.setCheck(i, !this.state.checkAll);
    });
    this.setState({ checkAll: !this.state.checkAll });
  };

  setCheck = (index, value = !this.state.check[index]) => {
    let check = this.state.check;
    check[index] = value;
    this.setState({
      check,
    });
  };
}
