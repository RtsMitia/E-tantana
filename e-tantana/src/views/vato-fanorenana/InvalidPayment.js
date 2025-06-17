import React from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import Moment from "moment";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CAlert,
  CModalFooter,
  CSpinner,
  CFormLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCreditCard, cilSearch } from "@coreui/icons";
import AdminLayout from "../../layout/AdminLayout";

export default class InvalidPayment extends AdminLayout {
  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: "",
      pending: false,
      page: 1,
      pageNumber: 50,
      pagination: [],
      date_sup: undefined,
      date_inf: undefined,
      refModalState: false,
      error: "",
      hasError: false,
      ref_payment_id: 0,
      paymentDraft: null,
      feeType: null,
      ref: "",
    };
  }

  setRef = (e) => {
    this.setState({
      ref: e.target.value,
    });
  }

  setPending = (e) => {
    this.setState({
      pending: e,
    });
  }

  clearFields = () => {
    this.setState({
      ref: ""
    })
  }

  cancelFormModal = () => {
    this.setRefModalState(false);
    this.clearFields();
    this.setError();
    this.setState({ref_payment_id: 0})
  };

  getPaymentDraftDetails = (page = 1, pageNumber = 20) => {
    fetch(
      api(
        "paymentDraftDetails/" +
          this.state.ref_payment_id +
          "?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          const paymentDraft = data.paymentDraftDetails[0].paymentDraft;
          paymentDraft.id = data.paymentDraftDetails[0].payment_draftt_id;
          this.setState({
            paymentDraft: paymentDraft,
            feeType: data.paymentDraftDetails[0].feeType,
          });
          this.pagination(data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  setError(message = null) {
    if (message)
      this.setState({
        error: message,
        hasError: true,
      });
    else
      this.setState({
        error: "",
        hasError: false,
      });
  }

  setRefModalState = (state) => {
    this.setState({ refModalState: state });
  };

  onChangeDateSup = (e) => {
    this.setState({ date_sup: e.target.value });
  };

  onChangeDateInf = (e) => {
    this.setState({ date_inf: e.target.value });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getInvalidPayments = (page, pageNumber) => {
    let url = api(
      `paymentDrafts/paymentNotValited?page=${Number(page)}&pageNumber=${Number(pageNumber)}`
    );
    if (this.state.date_sup) {
      url = url + "&date_sup=" + this.state.date_sup;
    }
    if (this.state.date_inf) {
      url = url + "&date_inf=" + this.state.date_inf;
    }
    fetch(url).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            list: data.paymentInvalid,
            totalPage: data.pagination.totalPages,
            page: page,
          });
          this.pagination(data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  componentDidMount() {
    this.getInvalidPayments(this.state.page, this.state.pageNumber);
    ///this.getPaymentDraftDetails(); // uses default page = 1, pageNumber = 20
  }

  pageValidation = (id) => {
    this.props.history.push("/paymentDraftDetail/" + id);
  };

  addRef = (id) => {
    console.log("Ref id: ",id);
    this.setState(
      {
        ref_payment_id: id,
        refModalState: true,
      },
      () => {
        this.getPaymentDraftDetails();
      }
    );
    // this.props.history.push(`/paymentDraftDetail/${id}/ref`);
  };

    async updatePaymentDraftAndDetails(id, note, detailData) {
      try {
        // 1. Update payment_draft note by id
        let res1 = await fetch(api(`paymentDrafts/${id}`), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note }),
        });
        if (!res1.ok) throw new Error("Failed to update payment_draft");

        // 2. After payment_draft update success, update payment_draft_detail by payment_draft_id
        let res2 = await fetch(api(`paymentDraftDetails/updatePaymentDraftDetailWhere/`), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            where: { payment_draft_id: id },
            data: detailData,
          }),
        });
        if (!res2.ok) throw new Error("Failed to update payment_draft_detail");

        let res3 = await fetch(api(`payments`), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            note: note,
            date: null,
            payment_draft_id: id,
          }),
        });
        if (!res3.ok) throw new Error("Failed to insert new payment");

        console.log("Draft, details updated and payment inserted successfully");
      } catch (error) {
        console.error(error);
      }
    }

  addReference() {
    console.log("Updating ref for paymentDraft id:", this.state.ref_payment_id);
    console.log("Reference note to add:", this.state.ref);

    this.setPending(true);

    this.updatePaymentDraftAndDetails(
      this.state.ref_payment_id,
      this.state.ref,
      { note: this.state.ref }
    ).then((data) => {
      this.setPending(false);
      this.cancelFormModal();
      this.getInvalidPayments(this.state.page, this.state.pageNumber);
      console.log("Both payment_draft and payment_draft_detail updated successfully");
    }).catch((error) => {
      this.setPending(false);
      // error might be an object with a message field or an array of messages
      if (error && typeof error.message === 'object' && Array.isArray(error.message)) {
        this.setError(error.message[0]);
      } else if (error && error.message) {
        this.setError(error.message);
      } else {
        this.setError("Unknown error occurred");
      }
      console.error(error);
    });
}

  render() {
    const { list, ready } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-danger">
              Les paiements non validés
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={1}></CCol>
                <CCol md={4}>
                  <CFormInput
                    type="date"
                    id="date_inf"
                    value={this.state.date_inf}
                    onChange={this.onChangeDateInf}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    type="date"
                    id="date_sup"
                    value={this.state.date_sup}
                    onChange={this.onChangeDateSup}
                  />
                </CCol>
                <CCol md={3}>
                  <CButton
                    color="secondary"
                    variant="outline"
                    active={true}
                    onClick={() =>
                      this.getInvalidPayments(
                        this.state.page,
                        this.state.pageNumber
                      )
                    }
                  >
                    <CIcon icon={cilSearch} /> Rechercher
                  </CButton>
                </CCol>
              </CRow>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      Nom du payeur
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Montant total
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Moyen de paiement
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Référence</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {list.map((invalidPayment, index) => (
                    <CTableRow key={invalidPayment.id}>
                      <CTableDataCell>{invalidPayment.payer}</CTableDataCell>
                      <CTableDataCell>
                        {Moment(invalidPayment.date).format("D/MM/y")}
                      </CTableDataCell>
                      <CTableDataCell>
                        {invalidPayment.amount} Ar
                      </CTableDataCell>
                      <CTableDataCell>
                        {invalidPayment.paymentType.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {invalidPayment.paymentDraftDetails[0].note ? (
                          invalidPayment.paymentDraftDetails[0].note
                        ) : (
                          <CButton
                            color="secondary"
                            variant="outline"
                            active={true}
                            onClick={() => this.addRef(invalidPayment.id)}
                          >
                            Ajouter une référence
                          </CButton>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="secondary"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageValidation(invalidPayment.id)}
                        >
                          <CIcon icon={cilCreditCard} /> Voir les paiements
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CPagination aria-label="Page navigation example">
                <CPaginationItem
                  aria-label="Previous"
                  disabled={this.state.page === 1}
                  onClick={() =>
                    this.getInvalidPayments(
                      this.state.page - 1,
                      this.state.pageNumber
                    )
                  }
                >
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                {this.state.pagination.map((page, index) => (
                  <CPaginationItem
                    key={index}
                    active={page === this.state.page}
                    onClick={() =>
                      this.getInvalidPayments(page, this.state.pageNumber)
                    }
                  >
                    {" "}
                    {page}{" "}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  aria-label="Next"
                  disabled={
                    this.state.totalPage - this.state.page === 0 ||
                    this.state.list.length === 0
                  }
                  onClick={() =>
                    this.getInvalidPayments(
                      this.state.page + 1,
                      this.state.pageNumber
                    )
                  }
                >
                  <span aria-hidden="true"> &raquo; </span>
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
        {this.state.paymentDraft &&
          (
            <CModal
              size="xl"
              alignment="center"
              visible={this.state.refModalState}
              onClose={this.cancelFormModal}
            >
              <CModalHeader>
                <CModalTitle>Ajouter une référence de paiement</CModalTitle>
                <p>
                  Pour le paiement de {this.state.feeType.name} pour Mr/Mme{" "}
                  {this.state.paymentDraft.payer} le{" "}
                  {Moment(this.state.paymentDraft.date).format("D/MM/y")}
                </p>
              </CModalHeader>
              <CModalBody>
                <CForm>
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
                  </CForm>
                  <br></br>
                  <CAlert visible={this.state.hasError} color="danger">
                    <center> {this.state.error}</center>
                  </CAlert>
                  <br></br>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={this.cancelFormModal}>
                  Annuler
                </CButton>
                <CButton
                  color="primary"
                  onClick={() => this.addReference()}
                  disabled={this.state.pending ? true : false}
                >
                  {this.state.pending ? (
                    <CSpinner className="me-2" color="light" size="sm" />
                  ) : (
                    <></>
                  )}
                  Ajouter
                </CButton>
              </CModalFooter>
            </CModal>
          )}
      </>
    );
  }
}
