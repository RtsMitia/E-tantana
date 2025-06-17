import { CCol, CCard, CCardBody, CCardHeader, CAlert } from "@coreui/react";
import React, { Component } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../const/api";

export default class QRCodeScann extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      ok: false,
      error: undefined,
      alert: false,
    };
  }

  handleScan = (data) => {
    if (data) {
      const member_id = JSON.parse(data);
      fetch(api("members/" + member_id)).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (!data.member) {
              this.setState({ alert: true, error: " QR CODE INVALIDE !!!" });
            } else {
              this.props.history.push("memberInfo/" + member_id);
            }
          });
        }
      });
    }
  };

  handleError = (err) => {
    console.error(err);
    this.setState({ alert: true, error: err });
  };

  render() {
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader color="green">
            <strong>Scanne</strong>
          </CCardHeader>
          <CCardBody className="scan-qr-body">
            <center>
              <h3 className="text-danger">
                {" "}
                <u> Scanner le qr code </u>
              </h3>
              <div className="scan-qr">
                <Html5QrcodeScanner
                  delay={this.state.delay}
                  onError={this.handleError}
                  onResult={this.handleScan}
                  constraints={{ facingMode: "user" }}
                />
              </div>
            </center>
            <div>
              <br></br> <br></br> <br></br>
              <br></br>
              <CAlert visible={this.state.alert} color="danger">
                <center> {this.state.error}</center>
              </CAlert>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}
