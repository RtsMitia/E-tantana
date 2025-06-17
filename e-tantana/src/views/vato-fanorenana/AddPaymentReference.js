import React from "react";
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
} from "@coreui/react";
import Moment from "moment";
import api from "../../const/api";
import Loading from "../pages/Loading";

export default class AddPaymentReference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params && this.props.match.params.id,
      formModalState: false,
      formText: "Ajouter",
      deleteModalState: false,
      loading: true,
      pending: false,
      users: [],
      error: "",
      hasError: false,
      ref: "",
      member: 0,
      totalPage: 0,
      page: 1,
      pageNumber: 20,
      pagination: [],
      ready: false,
    };
  }

  getPaymentDraftDetails = (page, pageNumber) => {
    fetch(
      api(
        "paymentDraftDetails/" +
          this.state.id +
          "?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          const paymentDraft = data.paymentDraftDetails[0].paymentDraft
          paymentDraft.id = data.paymentDraftDetails[0].payment_draftt_id
          // console.log(data.paymentDraftDetails);
          this.setState({
            paymentDraftDetails: data.paymentDraftDetails,
            totalPage: data.pagination.totalPages,
            page: page,
            paymentDraft: paymentDraft,
            feeType: data.paymentDraftDetails[0].feeType,
          });
          this.pagination(data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };
  
  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  componentDidMount() {
    this.getPaymentDraftDetails(this.state.page, this.state.pageNumber);
  }

  getError(index) {
    const errors = {
      "Username already used.": "Ce nom d'utilisateur est déjà utilisé.",
      "Email address already used.": "Cette adresse mail est déjà utilisée.",
      "Member already have a user account.":
        "Ce membre a déjà un compte utilisateur.",
        "username should not be empty":" Le champ nom d'utilisateur est obligatoire ",
        "email should not be empty":" Le champ email est obligatoire",
        "email must be an email":" Email incorrect",
    };
    return errors[index];
  }

  cancelFormModal = () => {
    this.setFormModalState(false);
    this.clearFields();
    this.setError();
  }

  addRef() {
    this.setPending(true);
    // console.log("id ", this.state.paymentDraftDetails[0].id);
    fetch(api(`paymentDraftDetails/${this.state.paymentDraftDetails[0].id}`), {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        note: this.state.ref,
      }),
    }).then((res) => {
      this.setPending(false);
      if (res.ok)
        res.json().then((data) => {
          this.props.history.push(`/invalidPayment`);
        });
      else {
        res.json().then((res) => {
          if (typeof res.message === typeof []) {
            this.setError(this.getError(res.message[0]));
          } else {
            this.setError(this.getError(res.message));
          }
        });
      }
    });
  }

  render() {
    const { paymentDraft, ready, feeType } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Ajouter une référence de paiement</strong>
                <p>Pour le paiement de {feeType.name} pour Mr/Mme {paymentDraft.payer} le{" "}
            {Moment(paymentDraft.date).format("D/MM/y")}</p>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                </span>
              </CCardHeader>
              <CCardBody>
              <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Référence</CFormLabel>
                <CFormInput
                  type="text"
                  id="ref"
                  value={this.state.ref}
                  onChange={this.setRef}
                />
              </div>
              <br></br>
              <CAlert visible={this.state.hasError} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
              <CButton
              color="primary"
              onClick={() => this.addRef()}
              disabled={this.state.pending}
            >
              {this.state.pending ? (
                <CSpinner className="me-2" color="light" size="sm" />
              ) : (
                <></>
              )}
              Ajouter
            </CButton>
            </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }

  setError(message = null) {
    if (message) {
      this.setState({
        error: message,
        hasError: true,
      });
    } else {
      this.setState({
        error: "",
        hasError: false,
      });
    }
  }

  clearFields() {
    this.setState({
      username: "",
      email: "",
      member: 0,
    });
  }

  setId(id) {
    this.setState({
      id,
    });
  }

  setRef = (e) => {
    this.setState({
      ref: e.target.value,
    });
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  setMember = (value) => {
    this.setState({
      member: value.value,
    });
  }

  setFormModalState(state, text = this.state.formText) {
    this.setState({
      formModalState: state,
      formText: text,
    });
  }

  setDeleteModalState(state) {
    this.setState({
      deleteModalState: state,
    });
  }

  setLoading(state) {
    this.setState({
      loading: state,
    });
  }

  setPending(state) {
    this.setState({
      pending: state,
    });
  }
}
