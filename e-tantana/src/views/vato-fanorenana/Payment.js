import React, { Component } from "react";
import api from "../../const/api";
import Loading from "../pages/Loading";
import Moment from "moment";
import {
  CCard,
  CFormInput,
  CRow,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCreditCard, cilQrCode, cilSearch } from "@coreui/icons";
export default class Payment extends Component {
  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: "",
      page: 1,
      pageNumber: 50,
      pagination: [],
      date_sup: undefined,
      date_inf: undefined,
    };
  }

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

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  getPayments = (page, pageNumber) => {
    let url = api(
      `payments?page=${Number(page)}&pageNumber=${Number(pageNumber)}&activityField=${this.user.activity_field_id}`
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
            list: data.payment.payments,
            totalPage: data.payment.pagination.totalPages,
            page: page,
          });
          this.pagination(data.payment.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  componentDidMount() {
    this.getPayments(this.state.page, this.state.pageNumber);
  }

  paymentDetail = (id) => {
    this.props.history.push("/paymentDetail/" + id);
  };

  paymentTickets = (id) => {
    // console.log(id);
    fetch(api(`paymentDetails?pageNumber=1000&payment_id=${id}`)).then(
      (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            let pts = data.data.map((d) => {
              return `${d.payment_draft_detail_id}`;
            });
            // console.log(pts, "".concat(pts));
            pts = "".concat(pts);
            this.props.history.push("/paymentTickets/" + pts.substring(0,pts.length));
          });
        }
      }
    );
  };

  render() {
    const { list, ready } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-danger">
            Les paiements validés
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
                    this.getPayments(this.state.page, this.state.pageNumber)
                  }
                >
                  <CIcon icon={cilSearch} /> Rechercher
                </CButton>
              </CCol>
            </CRow>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Nom du payeur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Date du paiement
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Date du validation de paiement
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Moyen de paiement
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Montant total</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((payment, index) => (
                  <CTableRow key={payment.id}>
                    <CTableDataCell>
                      {payment.paymentDraft.payer}
                    </CTableDataCell>
                    <CTableDataCell>
                      {Moment(payment.paymentDraft.date).format("D/MM/y")}
                    </CTableDataCell>
                    <CTableDataCell>
                      {Moment(payment.date).format("D/MM/y")}
                    </CTableDataCell>

                    <CTableDataCell>
                      {payment.paymentDraft.paymentType.name}
                    </CTableDataCell>
                    <CTableDataCell className="text-success">
                      {this.numberWithSpaces(payment.paymentDraft.amount)} Ar
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() => this.paymentDetail(payment.id)}
                      >
                        <CIcon icon={cilCreditCard} /> Voir les paiements
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="secondary"
                        variant="outline"
                        active={true}
                        onClick={() => this.paymentTickets(payment.id)}
                      >
                        <CIcon icon={cilQrCode} /> Etiquettes de paiements
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
                  this.getPayments(this.state.page - 1, this.state.pageNumber)
                }
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {this.state.pagination.map((page, index) => (
                <CPaginationItem
                  key={index}
                  active={page === this.state.page}
                  onClick={() => this.getPayments(page, this.state.pageNumber)}
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
                  this.getPayments(this.state.page + 1, this.state.pageNumber)
                }
              >
                <span aria-hidden="true"> &raquo; </span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}
