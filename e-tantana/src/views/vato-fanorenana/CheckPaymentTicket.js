import { CCol, CCard, CCardBody, CCardHeader, CAlert } from "@coreui/react";
import React, { Component } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../const/api";
import BackButton from "../../components/BackButton";

export default class CheckPaymentTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ok: false,
      error: undefined,
      alert: false,
    };
    this.scannerRef = React.createRef();
  }

  componentDidMount() {
    // Create and render the QR scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 }, // Adjust as needed
      /* verbose= */ false
    );

    scanner.render(this.handleScan, this.handleError);
  }

  handleScan = (data) => {
    if (data) {
      const id = JSON.parse(data);
      fetch(api("payments/check?id=" + id)).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (data && data.payment && data.payment.length > 0) {
              this.props.history.push("paymentTickets/details/" + id);
            } else {
              this.setState({ alert: true, error: "Ce paiement est invalide." });
            }
          });
        }
      });
    }
  };

  handleError = (err) => {
    this.setState({ alert: true, error: err });
  };

  render() {
    return (
      <div className="m-5">
        <BackButton to={"/"} />
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader color="green">
              <strong>Verification de paiement</strong>
            </CCardHeader>
            <CCardBody className="scan-qr-body">
              <center>
                <h3>
                  <u> Scanner le qr code </u>
                </h3>
                <div id="qr-reader" style={{ width: "300px" }}></div>
              </center>
              <div>
                <br /> <br /> <br />
                <CAlert visible={this.state.alert} color="danger">
                  <center>{this.state.error}</center>
                </CAlert>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    );
  }
}
