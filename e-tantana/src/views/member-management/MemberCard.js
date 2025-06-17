import React, { Component } from "react";
// import Moment from "moment";
import api from "../../const/api";
import AsyncSelect from "react-select/async";
import aim2 from "../../assets/images/aim-2.jpeg";
import aim1 from "../../assets/images/aim-1.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CFormInput,
  CFormLabel,
  CRow,
  CImage,
} from "@coreui/react";
import QRCode from "react-qr-code";
import { cilNotes, cilPencil, cilX } from "@coreui/icons";
// import qrcode from "qrcode";
import CIcon from "@coreui/icons-react";
import BackButton from "../../components/BackButton";
export default class MemberCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: undefined,
      fivondronana: undefined,
      faritra: undefined,
      diosezy: undefined,
      nationalPresident: undefined,
      member_id: this.props.match.params.id || undefined,
      isPending: false,
      cardState: false,
      contact: undefined,
      address: undefined,
      last_name: undefined,
      first_name: undefined,
      modalState: false,
      qr: undefined,
    };
    // console.log(`id: ${this.props.match.params.id}`);
  }

  componentDidMount() {
    // console.log(`id: ${this.props.match.params.id}`);
    this.getMemberCard();
  }

  qrCode = (id) => {
    // qrcode.toDataURL(id, (err, src) => {
    //   this.setState({qr: src})
    // })
  };

  savePdf = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const input = document.getElementById("memberCard");
      html2canvas(input, { useCORS: true, dpi: 144 }).then((canvas) => {
        const imgData = canvas.toDataURL();
        const imgWidth = 110;
        const pageHeight = 290;
        const imgHeight = 40;
        let heightLeft = imgHeight;
        const doc = new jsPDF("pt", "mm");
        let position = 0;
        doc.addImage(imgData, "PNG", 10, 0, imgWidth, imgHeight + 30);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight - 5;
          doc.addPage();
          doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight + 30);
          heightLeft -= pageHeight;
        }
        doc.save(
          this.state.member.last_name +
            "-" +
            this.state.member.first_name +
            ".pdf"
        );
      });
    }, 1000);
  };

  printPdf = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const input = document.getElementById("memberCard");
      html2canvas(input, { useCORS: true, dpi: 144 }).then((canvas) => {
        const imgData = canvas.toDataURL();
        const imgWidth = 110;
        const pageHeight = 290;
        const imgHeight = 40;
        let heightLeft = imgHeight;
        const doc = new jsPDF("pt", "mm");
        let position = 0;
        doc.addImage(imgData, "PNG", 10, 0, imgWidth, imgHeight + 30);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight - 5;
          doc.addPage();
          doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight + 30);
          heightLeft -= pageHeight;
        }
        doc.autoPrint({ variant: "non-conform" });
        doc.save(
          this.state.member.last_name +
            "-" +
            this.state.member.first_name +
            ".pdf"
        );
      });
    }, 1000);
  };

  updateMember = () => {
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        last_name: this.state.last_name,
        first_name: this.state.first_name,
        contact: this.state.contact,
        address: this.state.address,
      }),
    };
    fetch(api("members/" + this.state.member_id), option).then((res) => {
      if (res.ok) {
        const member = this.state.member;
        member.last_name = this.state.last_name;
        member.first_name = this.state.first_name;
        member.contact = this.state.contact;
        member.address = this.state.address;
        this.setState({ member: member, modalState: false });
        console.log("ato n");
      }
    });
  };

  updateCard = () => {
    this.setState({
      last_name: this.state.member.last_name,
      first_name: this.state.member.first_name,
      contact: this.state.member.contact,
      address: this.state.member.address,
      modalState: true,
    });
  };

  onChangeLastName = (e) => {
    this.setState({ last_name: e.target.value });
  };

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  onChangeContact = (e) => {
    this.setState({ contact: e.target.value });
  };

  onChangefirstName = (e) => {
    this.setState({ first_name: e.target.value });
  };

  clearState = () => {
    this.setState({
      member: undefined,
      fivondronana: undefined,
      faritra: undefined,
      diosezy: undefined,
      nationalPresident: undefined,
      member_id: undefined,
      isPending: false,
      cardState: false,
      contact: undefined,
      address: undefined,
      last_name: undefined,
      first_name: undefined,
      modalState: false,
    });
  };

  setModalState = (visible) => {
    this.setState({ modalState: visible });
    if (visible === false) {
    }
  };

  setCardState = (visible) => {
    this.setState({ cardState: visible });
  };

  onChangeMemberId = (value) => {
    this.setState({
      member_id: value.value,
      cardState: false,
    });
  };

  getMember = async (name, callback) => {
    let query = "";
    if (name && name.length > 0) {
      query = `?last_name=${name}`;
    }
    return fetch(api(`members` + query), {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        const res = [];
        json.data.forEach((d) => {
          res.push({
            value: `${d.id}`,
            label: `${d.last_name} ${d.first_name}`,
          });
        });
        callback(res);
      });
  };

  getMemberCard = () => {
    if (this.state.member_id) {
      this.setState({ isPending: true });
      fetch(api(`members/card/` + this.state.member_id)).then((res) => {
        this.setState({
          isPending: false,
        });
        if (res.ok) {
          return res.json().then((data) => {
            this.qrCode(this.state.member_id);
            this.setState({
              member: data.member,
              fivondronana: data.fivondronana,
              nationalPresident: data.president,
              faritra: data.faritra,
              diosezy: data.diosezy,
              isPending: false,
              cardState: true,
            });
          });
        }
      });
    }
  };

  render() {
    return (
      <>
        <BackButton to={"/member"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Carte des membres</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={4}></CCol>
                <CCol md={3}>
                  {" "}
                  <AsyncSelect
                    name="membre"
                    placeholder="Selectionner un membre"
                    loadOptions={this.getMember}
                    onChange={this.onChangeMemberId}
                  />{" "}
                </CCol>
                <CCol md={2}>
                  <CButton
                    color="success"
                    onClick={() => this.getMemberCard()}
                    disabled={this.state.isPending ? true : false}
                  >
                    {" "}
                    {this.state.isPending ? (
                      <CSpinner className="me-2" color="light" size="sm" />
                    ) : (
                      <></>
                    )}
                    Voir la carte
                  </CButton>
                </CCol>
              </CRow>
              {this.state.cardState && (
                <div>
                  <br></br>
                  <br></br> <br></br> <br></br>{" "}
                  <center>
                    <div className="member-card">
                      <div className="member-card-button-x">
                        <CButton
                          color="light"
                          onClick={() => this.clearState()}
                        >
                          {" "}
                          <CIcon icon={cilX}></CIcon>
                        </CButton>
                      </div>
                      <div className="member-card-background" id="memberCard">
                        <div className="member-card-top-rectangular"></div>
                        <div className="member-card-top-polygon"></div>
                        <div className="member-card-top-title">
                          ANTILIN'I MADAGASIKARA
                        </div>
                        <div className="member-card-address">
                          Tonelina RALAIMONGO 101, Antananarivo
                        </div>
                        <div className="member-card-aim-1">
                          <CImage
                            src={aim1}
                            width="40px"
                            height="46.18px"
                          ></CImage>
                        </div>
                        <div className="member-card-aim-2">
                          <CImage
                            src={aim2}
                            width="42px"
                            height="42px"
                          ></CImage>
                        </div>
                        <div className="member-card-title">
                          KARATRA MPIKAMBANA
                        </div>
                        <div className="member-card-contain">
                          <p>
                            <strong>
                              {" "}
                              <u> ANARANA :</u>
                            </strong>{" "}
                            {this.state.member &&
                              this.state.member.last_name +
                                " " +
                                this.state.member.first_name}
                          </p>
                          <p>
                            <strong>
                              {" "}
                              <u> FIVONDRONANA : </u>
                            </strong>{" "}
                            {this.state.fivondronana && this.state.fivondronana}
                          </p>
                          <p>
                            <strong>
                              {" "}
                              <u> FARITRA :</u>
                            </strong>{" "}
                            {this.state.faritra && this.state.faritra}
                          </p>
                          <p>
                            <strong>
                              {" "}
                              <u> DIOSEZY:</u>
                            </strong>{" "}
                            {this.state.diosezy && this.state.diosezy}
                          </p>
                          <p>
                            <strong>
                              {" "}
                              <u> ADIRESY:</u>
                            </strong>{" "}
                            {this.state.member && this.state.member.address}
                          </p>
                          <p>
                            <strong>
                              {" "}
                              <u> LAHARANA FINDAY :</u>
                            </strong>{" "}
                            {this.state.member && this.state.member.contact}
                          </p>
                        </div>
                        <div className="member-card-president">
                          Ny filoha iombonana
                        </div>
                        <div className="member-card-president-name">
                          {this.state.nationalPresident &&
                            this.state.nationalPresident.member &&
                            this.state.nationalPresident.member.last_name +
                              " " +
                              this.state.nationalPresident.member.first_name}
                        </div>
                        <div className="member-card-qr">
                          {/* <CImage src={qr} width="90px" height="90px"></CImage> */}
                          <QRCode
                            size={256}
                            style={{
                              height: "90px",
                              // maxWidth: "90px",
                              width: "90px",
                            }}
                            value={this.state.member_id}
                            viewBox={`0 0 256 256`}
                          />
                        </div>
                        <div className="member-card-bottom-rectangular"></div>
                      </div>
                    </div>
                  </center>
                  <br></br>{" "}
                  <center>
                    {" "}
                    <CButton color="light" onClick={() => this.updateCard()}>
                      {" "}
                      <CIcon icon={cilPencil}></CIcon> Modifier
                    </CButton>
                    <CButton
                      color="success"
                      onClick={() => this.savePdf()}
                      style={{ marginLeft: "2%" }}
                    >
                      {" "}
                      <CIcon icon={cilNotes}></CIcon> Telecharger en pdf
                    </CButton>
                    <CButton
                      color="success"
                      onClick={() => this.printPdf()}
                      style={{ marginLeft: "2%" }}
                    >
                      {" "}
                      <CIcon icon={cilNotes}></CIcon> Imprimer
                    </CButton>
                  </center>
                </div>
              )}
              <br></br>
            </CCardBody>
          </CCard>
          {/* delete modal */}
          <>
            <CModal
              alignment="center"
              visible={this.state.modalState}
              onClose={() => this.setModalState(false)}
              size="lg"
            >
              <CModalHeader>
                <CModalTitle>Modification des informations</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel>Nom</CFormLabel>
                    <CFormInput
                      type="text"
                      id="lastname"
                      value={this.state.last_name}
                      onChange={this.onChangeLastName}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Prénom</CFormLabel>
                    <CFormInput
                      type="text"
                      id="name"
                      value={this.state.first_name}
                      onChange={this.onChangeFirstName}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Contact</CFormLabel>
                    <CFormInput
                      type="text"
                      id="contact"
                      value={this.state.contact}
                      onChange={this.onChangeContact}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Adresse</CFormLabel>
                    <CFormInput
                      type="text"
                      id="address"
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                    />
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  onClick={() => this.updateMember()}
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
