import React, { Component } from "react";
import api from "../../const/api";
import {
  CPagination,
  CFormLabel,
  CFormTextarea,
  CPaginationItem,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilInfo } from "@coreui/icons";
import Loading from "../pages/Loading";
export default class MememberTransferValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loading: true,
      pendingDecline: false,
      pending: false,
      activityYears: null,
      memberRoles: null,
      sections: null,
      error: "",
      id: undefined,
      member: undefined,
      activityField: undefined,
      activityYear: undefined,
      memberRole: undefined,
      section: undefined,
      level: undefined,
      alert: false,
      confirmModal: false,
      memberTransferRequests: [],
      totalPage: 0,
      page: 1,
      pageNumber: 10,
      lastMemberActivity: null,
      memberTransferRequest: null,
      pagination: [],
      detailModal: false,
      note: undefined,
    };
  }

  pagination = (totalPages) => {
    let page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    this.setState({ pagination: page });
  };

  getLastMemberActivity = (id) => {
    fetch(api("memberActivities/last/" + id)).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          this.setState({ lastMemberActivity: data });
        });
      }
    });
  };

  setDetailModal = (visible) => {
    this.setState({ detailModal: visible });
  };

  getDetails = (index) => {
    this.getLastMemberActivity(this.state.memberTransferRequests[index].id);
    this.setState({
      memberTransferRequest: this.state.memberTransferRequests[index],
    });
    this.setDetailModal(true);
  };

  declineMemberTransferRequest = () => {
    const option = {
      method: "DELETE",
    };
    this.setState({ pendingDecline: true });
    fetch(
      api("memberTransferRequests/" + this.state.memberTransferRequest.id),
      option
    ).then((res) => {
      if (res.ok) {
        return res.text().then(() => {
          this.getMemberTransferRequets(this.state.page, this.state.pageNumber);
          this.setDetailModal(false);
          this.setState({ pendingDecline: false });
        });
      }
    });
  };

  memberTransferValidation = () => {
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        member_id: this.state.memberTransferRequest.member_id,
        member_role_id: this.state.memberTransferRequest.member_role_id,
        activity_year_id: this.state.memberTransferRequest.activity_year_id,
        activity_field_id: this.state.memberTransferRequest.activity_field_id,
        section_id: this.state.memberTransferRequest.section_id,
        level: this.state.memberTransferRequest.level,
        note: this.state.note,
      }),
    };
    this.setState({ pending: true });
    fetch(
      api(
        "memberTransferRequests/validation/" +
          this.state.memberTransferRequest.id
      ),
      option
    ).then((res) => {
      if (res.ok) {
        return res.json().then(() => {
          this.getMemberTransferRequets(this.state.page, this.state.pageNumber);
          this.setDetailModal(false);
          this.setState({ pending: true });
        });
      }
    });
  };

  getMemberTransferRequets = (page, pageNumber) => {
    const memberActivity = JSON.parse(sessionStorage.getItem("memberActivity"));
    // console.log(memberActivity.memberRole.level);
    fetch(
      api("memberTransferRequests/" + memberActivity.memberRole.level)
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          this.setState({
            memberTransferRequests: data.data,
            page: page,
            pageNumber: pageNumber,
            totalPage: data.pagination.totalPages,
          });
          this.pagination(data.pagination.totalPages);
          this.setState({ ready: true });
        });
      }
    });
  };

  onChangeNote = (e) => {
    this.setState({ note: e.target.value });
  };

  componentDidMount() {
    this.getMemberTransferRequets(1);
  }

  render() {
    const { ready, memberTransferRequests } = this.state;
    if (!ready) {
      return <Loading />;
    }
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Validation des demandes de transfert des membres</strong>
            </CCardHeader>
            <CCardBody>
              <>
                <CTable>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell scope="col">Membre</CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        Lieu d'activité
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        Année d'activité
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">Rôle</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Section</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Niveau</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {memberTransferRequests.map(
                      (memberTransferRequest, index) => (
                        <CTableRow key={memberTransferRequest.id}>
                          <CTableDataCell>{`${memberTransferRequest.member.last_name} ${memberTransferRequest.member.first_name}`}</CTableDataCell>
                          <CTableDataCell>
                            {memberTransferRequest.activityField.name}
                          </CTableDataCell>
                          <CTableDataCell>{`${memberTransferRequest.activityYear.start_year} - ${memberTransferRequest.activityYear.end_year}`}</CTableDataCell>
                          <CTableDataCell>
                            {memberTransferRequest.memberRole.name}
                          </CTableDataCell>
                          <CTableDataCell>
                            {memberTransferRequest.section &&
                              memberTransferRequest.section.name}
                          </CTableDataCell>
                          <CTableDataCell>
                            {memberTransferRequest.level}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color={"light"}
                              onClick={() => this.getDetails(index)}
                            >
                              <CIcon icon={cilInfo} /> A propos
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    )}
                  </CTableBody>
                </CTable>
                <CPagination aria-label="Page navigation example">
                  <CPaginationItem
                    aria-label="Previous"
                    disabled={this.state.page === 1}
                    onClick={() =>
                      this.getMemberTransferRequets(
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
                        this.getMemberTransferRequets(
                          page,
                          this.state.pageNumber
                        )
                      }
                    >
                      {` ${page} `}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    aria-label="Next"
                    disabled={
                      this.state.totalPage - this.state.page === 0 ||
                      memberTransferRequests.length === 0
                    }
                    onClick={() =>
                      this.getMemberTransferRequets(
                        this.state.page + 1,
                        this.state.pageNumber
                      )
                    }
                  >
                    <span aria-hidden="true"> &raquo; </span>
                  </CPaginationItem>
                </CPagination>
              </>
            </CCardBody>
          </CCard>
        </CCol>
        <>
          {" "}
          <CModal
            size="xl"
            alignment="center"
            visible={this.state.detailModal}
            onClose={() => this.setDetailModal(false)}
          >
            <CModalHeader>
              <CModalTitle>Validation d'une demande de transfert</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      Ancien activité du membre
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Son demande de transfert
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <ul>
                        <li>
                          <u>
                            {" "}
                            <strong> Le nom du membre : </strong>
                          </u>{" "}
                          {this.state.lastMemberActivity &&
                            this.state.lastMemberActivity.member.last_name +
                              " " +
                              this.state.lastMemberActivity.member.first_name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> Le lieu d'activité : </strong>
                          </u>{" "}
                          {this.state.lastMemberActivity &&
                            this.state.lastMemberActivity.activityField.name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> L'année d'activité : </strong>
                          </u>{" "}
                          {this.state.lastMemberActivity &&
                            this.state.lastMemberActivity.activityYear
                              .start_year +
                              "-" +
                              this.state.lastMemberActivity.activityYear
                                .end_year}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> Le rôle du membre : </strong>
                          </u>{" "}
                          {this.state.lastMemberActivity &&
                            this.state.lastMemberActivity.memberRole.name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> La catégorie du membre : </strong>
                          </u>{" "}
                          {this.state.lastMemberActivity &&
                            this.state.lastMemberActivity.section &&
                            this.state.lastMemberActivity.section.name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> Le niveau : </strong>
                          </u>{" "}
                          {this.state.lastMemberActivity &&
                            this.state.lastMemberActivity.level}
                        </li>
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        <li>
                          <u>
                            {" "}
                            <strong> Le nom du membre : </strong>
                          </u>{" "}
                          {this.state.memberTransferRequest &&
                            this.state.memberTransferRequest.member.last_name +
                              " " +
                              this.state.memberTransferRequest.member
                                .first_name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> Le lieu d'activité : </strong>
                          </u>{" "}
                          {this.state.memberTransferRequest &&
                            this.state.memberTransferRequest.activityField.name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> L'année d'activité : </strong>
                          </u>{" "}
                          {this.state.memberTransferRequest &&
                            this.state.memberTransferRequest.activityYear
                              .start_year +
                              "-" +
                              this.state.memberTransferRequest.activityYear
                                .end_year}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> Le rôle du membre : </strong>
                          </u>{" "}
                          {this.state.memberTransferRequest &&
                            this.state.memberTransferRequest.memberRole.name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> La catégorie du membre : </strong>
                          </u>{" "}
                          {this.state.memberTransferRequest &&
                            this.state.memberTransferRequest.section &&
                            this.state.memberTransferRequest.section.name}
                        </li>
                        <br></br>
                        <li>
                          <u>
                            {" "}
                            <strong> Le niveau : </strong>
                          </u>{" "}
                          {this.state.memberTransferRequest &&
                            this.state.memberTransferRequest.level}
                        </li>
                      </ul>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <br></br>
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword4">Note</CFormLabel>
                <CFormTextarea
                  aria-label="With textarea"
                  value={this.state.note}
                  onChange={this.onChangeNote}
                ></CFormTextarea>
              </CCol>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="danger"
                onClick={() => this.declineMemberTransferRequest()}
              >
                {this.state.pendingDecline ? (
                  <CSpinner className="me-2" color="light" size="sm" />
                ) : (
                  <></>
                )}
                Rejeter la demande
              </CButton>
              <CButton
                color="success"
                onClick={() => this.memberTransferValidation()}
              >
                {this.state.pending ? (
                  <CSpinner className="me-2" color="light" size="sm" />
                ) : (
                  <></>
                )}
                Valider la demande
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      </CRow>
    );
  }
}
