import React from "react";
import api from "../../../const/api";
import Loading from "../../pages/Loading";
import {
  CCard,
  CCardBody,
  CAlert,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";
import BackButton from "../../../components/BackButton";
import AdminLayout from "../../../layout/AdminLayout";

export default class UpdateActivityYear extends AdminLayout {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      status: "",
      ready: false,
      insertVisible: false,
      updateVisible: false,
      deletetVisible: false,
      start_year: "",
      end_year: "",
      note: "",
      index: 0,
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      pagination: [],
      pending: false,
      error: "",
      body: undefined,
      alert: false,
    };
  }

  setBody = (body) => {
    this.setState({ body: body });
  };

  onChangeStartYear = (e) => {
    this.setState({
      start_year: e.target.value,
    });
  };

  setError = (error) => {
    this.setState({ error: error });
    if (error !== undefined || error !== "") {
      this.setState({ alert: true });
    } else {
      this.setState({ alert: false });
    }
  };

  onChangeEndYear = (e) => {
    this.setState({
      end_year: e.target.value,
    });
  };

  onChangeNote = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  onChangeId = (idActivityYear) => {
    this.setState({
      id: idActivityYear,
    });
  };

  pageUpdate = (index) => {
    this.setState({
      updateVisible: true,
      index: index,
      start_year: this.state.list[index].start_year,
      end_year: this.state.list[index].end_year,
      note: this.state.list[index].note,
    });
  };

  getError = (index) => {
    const errors = {
      "start_year should not be empty":
        "Le champ `debut d'annee` est obligatoire.",
      "end_year should not be empty": "Le champ `fin d'annee` est obligatoire.",
    };
    return errors[index];
  };

  checkYear = (year) => {
    if (Number(year)) {
      // console.log(true);
      if (Number(year) < 0) {
        this.setError("Annee negative");
        return false;
      } else {
        return true;
      }
    }
    this.setError("Une annee ne doit contenir que des chiffres");
    return false;
  };

  checkFields = (startYear, endYear, note) => {
    if (startYear === "" && endYear === "") {
      this.setError(
        "Les champs `debut d'annee` et `fin d'annee` sont obligatoires"
      );
      return false;
    } else if (startYear === "" && endYear !== "") {
      this.setError("Le champ `debut d'annee` est obligatoire.");
      return false;
    } else if (startYear !== "" && endYear === "") {
      this.setError("Le champ `fin d'annee` est obligatoire.");
      return false;
    }
    if (this.checkYear(startYear)) {
      if (this.checkYear(endYear)) {
        if (Number(startYear) > Number(endYear)) {
          this.setError("Le debut d'année doit etre inferieur au fin d'année");
        } else return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  pageDelete = (index) => {
    this.setState({
      deleteVisible: true,
      index: index,
      start_year: this.state.list[index].start_year,
      end_year: this.state.list[index].end_year,
      note: this.state.list[index].note,
    });
  };

  setPending = (pending) => {
    this.setState({ pending: pending });
  };

  setInsertVisible = (visible) => {
    this.clearFields();
    this.setState({ insertVisible: visible });
  };

  viewPageUpdate = (visible, index) => {
    this.clearFields();
    this.setState({ updateVisible: visible, index: index });
  };

  viewPageDelete = (visible, index) => {
    this.clearFields();
    this.setState({ deleteVisible: visible, index: index });
  };

  update = (event) => {
    const check = this.checkFields(
      this.state.start_year,
      this.state.end_year,
      this.state.note
    );
    if (check) {
      this.setPending(true);
      const option = {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          start_year: this.state.start_year,
          end_year: this.state.end_year,
          note: this.state.note,
        }),
      };
      fetch(api("activityYears/" + this.props.match.params.id), option)
        .then((res) => {
          this.setPending(false);
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => {
          this.props.history.push(`/activityYear`);
        });
    }
  };

  clearFields = () => {
    this.setState({
      start_year: "",
      end_year: "",
      note: "",
      error: "",
      alert: false,
    });
  };

  getActivityYear = () => {
    fetch(api(`activityYears/${this.props.match.params.id}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        this.setState({
          start_year: data.activityYear.start_year,
          end_year: data.activityYear.end_year,
          note: data.activityYear.note,
        });
        this.setState({ ready: true });
      });
  };
  componentDidMount() {
    this.getActivityYear();
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <Loading />;
    }

    return (
      <>
        <BackButton to={"/activityYear"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Modification d'année d'activité</strong>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end"></span>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">Debut d'année </CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.start_year}
                    onChange={this.onChangeStartYear}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Fin d'année</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.end_year}
                    onChange={this.onChangeEndYear}
                    required
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">Note</CFormLabel>
                  <CFormTextarea
                    aria-label="With textarea"
                    value={this.state.note}
                    onChange={this.onChangeNote}
                  ></CFormTextarea>
                </CCol>
              </CForm>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <CButton
                color="primary"
                onClick={this.update}
                disabled={this.state.pending ? true : false}
              >
                Modifier
              </CButton>
            </CCardBody>
          </CCard>

          {/* update modal */}

          <>
            <CModal
              alignment="center"
              size="xl"
              visible={this.state.updateVisible}
              onClose={() => this.viewPageUpdate(false, this.state.index)}
            >
              <CModalHeader>
                <CModalTitle>Modification d'une année d'activité</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="row g-3">
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputEmail4">Debut d'année</CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.start_year}
                      onChange={this.onChangeStartYear}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputPassword4">
                      Fin d'année
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      value={this.state.end_year}
                      onChange={this.onChangeEndYear}
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="inputPassword4">Note</CFormLabel>
                    <CFormTextarea
                      aria-label="With textarea"
                      value={this.state.note}
                      onChange={this.onChangeNote}
                    ></CFormTextarea>
                  </CCol>
                </CForm>
                <center>
                  <code> {this.state.error}</code>
                </center>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  onClick={() => this.viewPageUpdate(false, this.state.index)}
                >
                  Fermer
                </CButton>
                <CButton
                  color="secondary"
                  onClick={this.update}
                  disabled={this.state.pending ? true : false}
                >
                  Modifier
                </CButton>
              </CModalFooter>
            </CModal>
          </>
        </CCol>
      </>
    );
  }
}
