import {
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CSpinner,
  CImage,
  CButton,
  CModal,
  CModalBody,
  CFormInput,
  CModalHeader,
  CModalTitle,
  CCardSubtitle,
  CPagination,
  CPaginationItem,
  CCardText,
  CCardTitle
} from "@coreui/react";
import Moment from "moment";
import React, { Component } from "react";
import api from "../../const/api";
import avatar from "../../assets/images/avatars/2.jpg";

export default class MemberInfo extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = {
      member_id: match && match.params && match.params.id,
      member: undefined,
      memberActivity: undefined,
      paymentList: [],
      ready: false,
      totalPage: 0,
      page: 1,
      pageNumber: 24,
      pagination: [],
      fivondronana: undefined,
      faritra: undefined,
      diosezy: undefined,
      modalState: false,
      year: undefined,
    };
  }

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  onChangeYear = (e) => {
    this.getPaymentList(1, this.state.pageNumber, e.target.value);
  };

  getPaymentList = (page, pageNumber, year) => {
    this.setState({ year: year });
    let url = api(
      "paymentDetails/member/" +
        this.state.member_id +
        "?page=" +
        page +
        "&pageNumber=" +
        pageNumber
    );
    if (year) {
      url = url + "&end_year=" + year;
    }
    fetch(url).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({ paymentList: data.paymentList });
          this.setState({ totalPage: data.pagination.totalPages, page: page });
          this.pagination(data.pagination.totalPages);
        });
      }
    });
  };

  showPayment = () => {
    this.getPaymentList(1, this.state.pageNumber);
    this.setModalState(true);
  };

  setModalState = (visible) => {
    this.setState({ modalState: visible });
  };

  pagination = (totalPage) => {
    let page = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getMemberActivity = () => {
    fetch(api("memberActivities/last/" + this.props.match.params.id)).then(
      (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            this.setState({ memberActivity: data });
          });
        }
      }
    );
  };

  getMemberCard = () => {
    fetch(api(`members/card/` + this.props.match.params.id)).then((res) => {
      this.setState({
        isPending: false,
      });
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            member: data.member,
            fivondronana: data.fivondronana,
            faritra: data.faritra,
            diosezy: data.diosezy,
            ready: true,
          });
        });
      }
    });
  };

  componentDidMount() {
    this.getMemberActivity();
    this.getMemberCard();
  }

  render() {
    if (!this.state.ready) {
      return <CSpinner></CSpinner>;
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Information</strong>
          </CCardHeader>
          <CCardBody>
            {" "}
            <CRow className="mb-3">
              <center>
                <CImage rounded src={avatar} width={150} />{" "}
              </center>
              <br></br> <br></br> <br></br> <br></br>
              <h1 style={{ textAlign: "center" }}>
                {this.state.member.last_name} {this.state.member.first_name}
              </h1>
              <small className="" style={{ textAlign: "center" }}>
                {this.state.memberActivity.memberRole.name} à {this.state.memberActivity.activityField.name}
              </small>
              <br></br>
              <br></br>
              <center>
                {" "}
                <CRow>
                  {" "}
                  <CCol>
                    <p>
                      {" "}
                      <strong> Date de naissance :</strong>{" "}
                      {this.state.member.birthdate &&
                        Moment(this.state.member.birthdate).format("D/MM/y")}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    {" "}
                    <p>
                      {" "}
                      <strong> Lieu de naissance :</strong>{" "}
                      {this.state.member.birth_place}{" "}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  {" "}
                  <CCol>
                    {" "}
                    <p>
                      {" "}
                      <strong> Contact :</strong> {this.state.member.contact}{" "}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  {" "}
                  <CCol>
                    {" "}
                    <p>
                      {" "}
                      <strong> Adresse :</strong> {this.state.member.address}{" "}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  {" "}
                  <CCol>
                    {" "}
                    <p>
                      {" "}
                      <strong>
                        {" "}
                        Date d'entrée à Antilin'i Madagasikara :
                      </strong>{" "}
                      {this.state.member.entry_date &&
                        Moment(this.state.member.entry_date).format("D/MM/y")}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  {" "}
                  <CCol>
                    {" "}
                    <p>
                      {" "}
                      <strong> Date de promesse :</strong>{" "}
                      {this.state.member.promise_date &&
                        Moment(this.state.member.promise_date).format("D/MM/y")}
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  {" "}
                  <CCol>
                    {" "}
                    <p>
                      {" "}
                      <strong> Religion :</strong> {this.state.member.religion}{" "}
                    </p>
                  </CCol>
                </CRow>
                {this.state.fivondronana && (
                  <CRow>
                    {" "}
                    <CCol>
                      {" "}
                      <p>
                        {" "}
                        <strong> Fivondronana :</strong>{" "}
                        {this.state.fivondronana}{" "}
                      </p>
                    </CCol>
                  </CRow>
                )}
                {this.state.faritra && (
                  <CRow>
                    {" "}
                    <CCol>
                      {" "}
                      <p>
                        {" "}
                        <strong> Faritra :</strong> {this.state.faritra}{" "}
                      </p>
                    </CCol>
                  </CRow>
                )}
                {this.state.diosezy && (
                  <CRow>
                    {" "}
                    <CCol>
                      {" "}
                      <p>
                        {" "}
                        <strong> Diosezy :</strong> {this.state.diosezy}{" "}
                      </p>
                    </CCol>
                  </CRow>
                )}
                {this.state.memberActivity.section && (
                  <CRow>
                    {" "}
                    <CCol>
                      {" "}
                      <p>
                        {" "}
                        <strong> Section :</strong>{" "}
                        {this.state.memberActivity.section.name}{" "}
                      </p>
                    </CCol>
                  </CRow>
                )}
                <CRow>
                  {" "}
                  <CCol>
                    {" "}
                    <CButton color="success" onClick={() => this.showPayment()}>
                      {" "}
                      Voir les paiements
                    </CButton>
                  </CCol>
                </CRow>
              </center>
            </CRow>
          </CCardBody>
        </CCard>
        <>
          <CModal
            alignment="center"
            size="xl"
            visible={this.state.modalState}
            onClose={() => this.setModalState(false)}
          >
            <CModalHeader>
              <CModalTitle>
                Liste des paiements de {this.state.member.last_name}{" "}
                {this.state.member.first_name}{" "}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <center>
                <CCol md={3}>
                  {" "}
                  <CFormInput
                    placeholder="rechercher un paiement (année)"
                    type="number"
                    onChange={this.onChangeYear}
                    value={this.state.year}
                  />
                </CCol>
              </center>
              <br></br>
              <CRow>
              { this.state.paymentList.map((payment) => (
                 <CCol md={2}>
               <CCard
                 className="mb-4"
                 style={{ borderRadius: "9px",  }}
               >
                 <CCardBody>
                   <CCardTitle >{payment.paymentDraftDetail.activityYear.end_year}</CCardTitle>
                   <CCardSubtitle className="mb-4 text-medium-emphasis">
                   {payment.paymentDraftDetail.feeType.name}
                   
                   </CCardSubtitle>
                   <CCardText
                     className="mb-4"
                     style={{
                       textOverflow: "ellipsis",
                       overflow: "hidden",
                     }}
                   >
             <strong> Montant: </strong>  {this.numberWithSpaces(payment.paymentDraftDetail.amount)} AR
                   </CCardText>
                 </CCardBody>
               </CCard></CCol>
              ))}
              </CRow>
              <br></br>
              <center> <CPagination aria-label="Page navigation example">
              <CPaginationItem
                aria-label="Previous"
                disabled={this.state.page === 1}
                onClick={() =>
                  this.getPaymentList(
                    this.state.page - 1,
                    this.state.pageNumber,
                    this.state.year
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
                    this.getPaymentList(
                      page,
                      this.state.pageNumber,
                      this.state.year
                    )
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
                  this.state.paymentList.length === 0
                }
                onClick={() =>
                  this.getPaymentList(
                    this.state.page + 1,
                    this.state.pageNumber,
                    this.state.year
                  )
                }
              >
                <span aria-hidden="true"> &raquo; </span>
              </CPaginationItem>
            </CPagination></center>
            </CModalBody>
          </CModal>
        </>
      </CCol>
    );
  }
}
