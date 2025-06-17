import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from "@coreui/react";

export default class StatisticSig extends Component {

    constructor(props) {
    super(props);
    this.state = {
      selectedActivityField: undefined,
      ready: false,
      labels: [],
      data: [],
    };
  }
  render() {
    const madagascarCenter = [-18.7669, 46.8691]; // Center of Madagascar

    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Carte de Madagascar (Offline)</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12}>
                <div style={{ height: "600px", width: "100%" }}>
                  <MapContainer
                    center={madagascarCenter}
                    zoom={6}
                    minZoom={5}
                    maxZoom={12} // adapt based on what levels you exported
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="/Mapnik/{z}/{x}/{y}.png"
                      // No attribution required for local files
                    />
                  </MapContainer>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}
