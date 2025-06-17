import React from "react";
import api from "../../const/api";
import {
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CCardBody,
  CCard,
  CCardHeader,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CAlert,
  CImage,
  CTableBody,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import aim from "../../assets/images/aim.png";
import Loading from "../pages/Loading";
import { cilDataTransferDown } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
export default class GroupPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payer: "",
      years: [],
      amount: 0,
      paymentDraftDetails: [],
      status: true,
      modalPayment: false,
      paymentTypes: [],
      payment_type_id: "",
      activityFields: [],
      file: null,
      year: "",
      error: "",
      alert: false,
      activityYears: [],
      activity_year_id: -1,
    };
  }

  getActivityYears = (page = 1, pageNumber = 1000) => {
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

  onChangePaymentTypeId = (e) => {
    this.setState({ payment_type_id: e.target.value });
  };

  setModalPayment = (visible) => {
    if (visible === true) {
      if (this.state.payer !== "") {
        this.setState({ modalPayment: visible, error: "", alert: false });
      } else {
        this.setState({
          alert: true,
          error: " Le champ `nom` est obligatoire",
        });
      }
    } else {
      this.setState({ modalPayment: visible });
    }
  };

  groupPayment = () => {
    // console.log(this.state.paymentDraftDetails);
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        activityFields: this.state.activityFields,
        payer: this.state.payer,
        payment_draft_details: this.state.paymentDraftDetails,
        payment_type_id: this.state.payment_type_id,
        amount: this.state.amount,
      }),
    };
    fetch(api("paymentDrafts/groupPayment"), option).then((res) => {
      if (res.ok) {
        this.clearFields();
      } else {
        // console.log("Error");
        this.clearFields();
      }
    });
  };

  onChangeYear = (e) => {
    this.setState({
      activity_year_id: e.target.value,
      year: this.state.activityYears[+e.target.value].end_year,
    });
  };

  onChangePayer = (e) => {
    this.setState({
      payer: e.target.value,
    });
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  getPaymentTypes = () => {
    fetch(api("paymentTypes")).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ paymentTypes: data, ready: true });
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
    for (let i = year - 1; i >= year - 3; i--) {
      years.push(i);
    }
    this.setState({ years: years });
  };

  clearFields = () => {
    this.setState({
      error: "",
      alert: false,
      payer: "",
      year: "",
      activityFields: [],
      file: undefined,
      paymentDraftDetails: [],
      status: true,
      modalPayment: false,
      amount: 0,
      payment_type_id: "",
      activity_year_id: -1,
    });
  };

  componentDidMount() {
    this.getActivityYears();
    this.getPaymentTypes();
  }

  setAmount = (amount) => {
    this.setState({ amount: amount });
  };

  getError(index) {
    const errors = {
      "this activity year does not exist":
        "L'annee de cotisation n'existe pas encore",
    };
    return errors[index];
  }

  getPaymentDraftDetails = (callback) => {
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("year", this.state.year);
    const option = {
      method: "POST",
      body: formData,
    };
    fetch(api("paymentDraftDetails/importExcel"), option).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // console.log(data);
          this.setState({
            paymentDraftDetails: data.payment_draft_details,
            amount: data.total,
            activityFields: data.activityFields,
            status: false,
            alert: false,
            error: "",
          }, callback);
        });
      } else {
        res.json().then((res) => {
          this.setState({
            error: this.getError(res.error),
            alert: true,
            year: "",
          });
        });
      }
    });
  };

  fetchFile = () => {
    if (
      this.state.file !== null &&
      this.state.activity_year_id !== 0 &&
      this.state.status
    ) {
      this.getPaymentDraftDetails(() => {
        this.setModalPayment(true);
      });
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
            <CCardHeader color="green">Paiement en groupe</CCardHeader>
            <CCardBody>
              <h4>
                Avant de procédez au paiement , veuillez remplir tous les champs
                du formulaire{" "}
              </h4>
              <p>
                Selon les informations saisies et importées, nous calculons le
                montant total à payer.{" "}
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <a href="/Vatom-panorenana.xlsx">
                  <CButton color={"success"}>
                    <CIcon icon={cilDataTransferDown} className="me-2" />
                    Télécharger le modèle excel
                  </CButton>
                </a>
              </div>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="inputEmail4">Votre nom</CFormLabel>
                  <CFormInput
                    type="text"
                    value={this.state.payer}
                    onChange={this.onChangePayer}
                  />
                </CCol>

                <CCol md={12}>
                  <CFormLabel htmlFor="inputPassword4">
                    {" "}
                    Annee de cotisation{" "}
                  </CFormLabel>
                  <CFormSelect
                    value={this.state.activity_year_id}
                    onChange={this.onChangeYear}
                    aria-label="Default select example"
                  >
                    <option>Selectionner une année</option>
                    {this.state.activityYears.map((year, index) => (
                      <option key={index} value={index}>
                        {`${year.start_year}-${year.end_year}`}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="formFile">Fichier excel</CFormLabel>
                  <CFormInput
                    type="file"
                    id="formFile"
                    // value={this.state.file}
                    onChange={this.onChangeFile}
                  />
                </CCol>
              </CForm>{" "}
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <br></br>
              <center>
                {" "}
                {/* <h5>
                  Selon les données importées, le montant total calculé est de{" "}
                  {this.state.amount} Ar{" "}
                </h5> */}
                <br></br>
                <CButton
                  color="dark"
                  // disabled={this.state.amount === 0}
                  size="lg"
                  onClick={this.fetchFile}
                >
                  {" "}
                  Payer{" "}
                </CButton>
              </center>
              <br></br>
            </CCardBody>
          </CCard>
        </CCol>
        {/* payment modal */}
        <CModal
          alignment="center"
          visible={this.state.modalPayment}
          size="xl"
          onClose={() => this.setModalPayment(false)}
        >
          <CModalHeader>
            <CModalTitle>Paiement en groupe</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <center>
              {" "}
              <CImage orientation="top" src={aim} width={100} />
            </center>
            <br></br>
            <center>
              <h5> Les details de ce paiement : </h5>
            </center>
            <br></br>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Nom et prenom</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Diosezy</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Faritra</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fivondronana</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Frais annuel</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.paymentDraftDetails.map(
                  (paymentDraftDetail, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        {paymentDraftDetail.last_name}{" "}
                        {paymentDraftDetail.first_name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {paymentDraftDetail.memberRole.name}{" "}
                        {paymentDraftDetail.hierarchy &&
                          paymentDraftDetail.hierarchy.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {this.state.activityFields[index][0]?.name}{" "}
                      </CTableDataCell>
                      <CTableDataCell>
                        {this.state.activityFields[index][1]?.name}{" "}
                      </CTableDataCell>
                      <CTableDataCell>
                        {this.state.activityFields[index][2]?.name}{" "}
                      </CTableDataCell>
                      <CTableDataCell>
                        {paymentDraftDetail.amount} AR{" "}
                      </CTableDataCell>
                    </CTableRow>
                  )
                )}
              </CTableBody>
            </CTable>
            <br></br>
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
              <br></br>
              <center>
                <CButton
                  color="secondary"
                  onClick={() => this.setModalPayment(false)}
                >
                  Retour
                </CButton>{" "}
                <span></span>
                <CButton
                  disabled={this.state.payment_type_id === ""}
                  onClick={() => this.groupPayment()}
                >
                  Procéder au paiement de {this.state.amount} Ar
                </CButton>
              </center>
            </CForm>
          </CModalBody>
        </CModal>
      </div>
    );
  }
}
