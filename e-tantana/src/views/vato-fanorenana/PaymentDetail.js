import React, { Component } from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CPagination,
  CPaginationItem,
  CTable,
  CListGroupItem,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";
import Moment from "moment";
import CIcon from "@coreui/icons-react";
import { cilInfo, cilQrCode } from "@coreui/icons";
import BackButton from "../../components/BackButton";
export default class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params && this.props.match.params.id,
      paymentDetails: [],
      ready: false,
      page: 1,
      pending: false,
      pageNumber: 20,
      alertValidation: false,
      pagination: [],
      payment: undefined,
      index: 0,
      infoVisible: false,
      activityFields: [],
    };
  }

  setIndex = (index) => {
    this.setState({ index: index });
  };

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getActivityFields = (index) => {
    fetch(
      api(
        "paymentDraftDetailActivityFields?payment_draft_detail_id=" +
          this.state.paymentDetails[index].payment_draft_detail_id
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            activityFields: data.data,
          });
        });
      }
    });
  };

  pageInfo = (index) => {
    this.getActivityFields(index);
    this.setIndex(index);
    this.setInfoVisible(true);
  };

  paymentTicket = (id) => {
    this.props.history.push(`/paymentTickets/${id}`)
  };

  setInfoVisible = (visible) => {
    this.setState({ infoVisible: visible });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getPaymentDetails = (page, pageNumber) => {
    fetch(
      api(
        "paymentDetails/" +
          this.state.id +
          "?page=" +
          Number(page) +
          "&pageNumber=" +
          Number(pageNumber)
      )
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          const payment = data.paymentType.data.data[0].payment;
          this.setState({
            paymentDetails: data.paymentType.data.data,
            totalPage: data.paymentType.data.pagination.totalPages,
            page: page,
            payment: payment,
          });
          this.pagination(data.paymentType.data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  componentDidMount() {
    this.getPaymentDetails(this.state.page, this.state.pageNumber);
  }

  render() {
    const { payment, ready, paymentDetails, activityFields } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <>
        <BackButton to={"/payment"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-danger">
              Les details du paiement validé le{" "}
              {Moment(payment.date).format("D/MM/y")}
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      Nom et Prenom
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Année</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Montant</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paymentDetails.map((paymentDetail, index) => (
                    <CTableRow key={paymentDetail.id}>
                      <CTableDataCell>
                        {paymentDetail.paymentDraftDetail.last_name}{" "}
                        {paymentDetail.paymentDraftDetail.first_name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {paymentDetail.paymentDraftDetail.memberRole.name}{" "}
                        {paymentDetail.paymentDraftDetail.hierarchy &&
                          paymentDetail.paymentDraftDetail.hierarchy.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {" "}
                        {paymentDetail.paymentDraftDetail.activityYear.end_year}
                      </CTableDataCell>
                      <CTableDataCell className="text-success">
                        {this.numberWithSpaces(
                          paymentDetail.paymentDraftDetail.amount
                        )}{" "}
                        Ar
                      </CTableDataCell>

                      <CTableHeaderCell scope="col">
                        <CButton
                          color="secondary"
                          variant="outline"
                          active={true}
                          onClick={() => this.pageInfo(index)}
                        >
                          <CIcon icon={cilInfo} /> Information
                        </CButton>
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <CButton
                          color="secondary"
                          variant="outline"
                          active={true}
                          onClick={() => this.paymentTicket(paymentDetail.id)}
                        >
                          <CIcon icon={cilQrCode} /> Etiquette de paiement
                        </CButton>
                      </CTableHeaderCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CPagination aria-label="Page navigation example">
                <CPaginationItem
                  aria-label="Previous"
                  disabled={this.state.page === 1}
                  onClick={() =>
                    this.getPaymentDetails(
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
                      this.getPaymentDetails(page, this.state.pageNumber)
                    }
                  >
                    {" "}
                    {page}{" "}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  aria-label="Next"
                  disabled={this.state.totalPage - this.state.page === 0}
                  onClick={() =>
                    this.getPaymentDetails(
                      this.state.page + 1,
                      this.state.pageNumber
                    )
                  }
                >
                  <span aria-hidden="true"> &raquo; </span>
                </CPaginationItem>
              </CPagination>
              <br></br>
              <br></br>
            </CCardBody>
          </CCard>

          {/* Info modal */}
          <>
            <CModal
              alignment="center"
              visible={this.state.infoVisible}
              onClose={() => this.setInfoVisible(false)}
            >
              <CModalHeader>
                <CModalTitle> Paiement </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CListGroup flush>
                  <h3>
                    <center>
                      {paymentDetails[
                        this.state.index
                      ].paymentDraftDetail.feeType.name.toUpperCase()}{" "}
                      ANNEE{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .activityYear.end_year
                      }
                    </center>
                  </h3>
                  <br></br>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      {" "}
                      <strong> Nom : </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .last_name
                      }
                    </span>{" "}
                  </CListGroupItem>
                  <CListGroupItem>
                    <span>
                      {" "}
                      <strong> Prenom : </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .first_name
                      }
                    </span>
                  </CListGroupItem>
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <span>
                      {" "}
                      <strong> Role : </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .memberRole.name
                      }{" "}
                      {paymentDetails[this.state.index].paymentDraftDetail
                        .hierarchy &&
                        paymentDetails[this.state.index].paymentDraftDetail
                          .hierarchy.name}{" "}
                    </span>
                  </CListGroupItem>
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .section && (
                    <CListGroupItem>
                      <span>
                        {" "}
                        <strong>Section : </strong>{" "}
                        <span>
                          {" "}
                          {
                            paymentDetails[this.state.index].paymentDraftDetail
                              .section.name
                          }
                        </span>{" "}
                      </span>
                    </CListGroupItem>
                  )}
                  <CListGroupItem>
                    <span>
                      {" "}
                      <strong> Domaine: </strong>{" "}
                    </span>
                    <ul>
                      {activityFields.map((activityField) => (
                        <li>
                          {" "}
                          <strong>
                            {" "}
                            {activityField.activityField.hierarchy.name} :
                          </strong>{" "}
                          {activityField.activityField.name}{" "}
                        </li>
                      ))}
                    </ul>
                  </CListGroupItem>
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .phone_number && (
                    <CListGroupItem>
                      <strong>Telephone : </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .phone_number
                      }
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .email && (
                    <CListGroupItem>
                      <strong>Email : </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .email
                      }
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .birthdate && (
                    <CListGroupItem>
                      <strong> Date de naissance : </strong>{" "}
                      {Moment(
                        paymentDetails[this.state.index].paymentDraftDetail
                          .birthdate
                      ).format("D/MM/y")}
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .promise_date && (
                    <CListGroupItem>
                      <strong> Voeux : </strong>{" "}
                      {Moment(
                        paymentDetails[this.state.index].paymentDraftDetail
                          .promise_date
                      ).format("D/MM/y")}
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .number_card && (
                    <CListGroupItem>
                      <strong> Numero de carte: </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .number_card
                      }
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail.step && (
                    <CListGroupItem>
                      <strong> Phase : </strong>{" "}
                      {paymentDetails[this.state.index].paymentDraftDetail.step}
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .sacrement && (
                    <CListGroupItem>
                      <strong> Sacrement: </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .sacrement
                      }
                    </CListGroupItem>
                  )}
                  {paymentDetails[this.state.index].paymentDraftDetail
                    .training && (
                    <CListGroupItem>
                      <strong> Formation: </strong>{" "}
                      {
                        paymentDetails[this.state.index].paymentDraftDetail
                          .training
                      }
                    </CListGroupItem>
                  )}
                  <CListGroupItem>
                    <span>
                      {" "}
                      Cette personne correspond au membre{" "}
                      <strong>
                        {" "}
                        {paymentDetails[this.state.index].member.last_name}{" "}
                        {paymentDetails[this.state.index].member.first_name}
                      </strong>{" "}
                    </span>
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong> Montant :</strong>{" "}
                    <span className="text-success">
                      {this.numberWithSpaces(
                        paymentDetails[this.state.index].paymentDraftDetail
                          .amount
                      )}{" "}
                      AR
                    </span>
                  </CListGroupItem>
                </CListGroup>
              </CModalBody>
            </CModal>
          </>
        </CCol>
      </>
    );
  }
}
