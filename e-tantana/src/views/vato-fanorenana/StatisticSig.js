import React, { Component } from "react";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import api from "../../const/api";
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
            diosezy: [],
            polygons: [], // fetched faritra
        };
    }

    getAllDiosezy = () => {
        fetch(api("activityFieldLocations/diosezy"))
        .then((res) => res.json())
        .then((result) => {
            const geojson = result.data.map((item) => ({
                type: "Feature",
                geometry: item.geometry,
                properties: {
                    name: item.name,
                    id: item.id,
                    districtCount: item.districtCount,
                },
            }));

            this.setState({ diosezy: geojson });
        })
        .catch((err) => console.error("Failed to fetch diosezy:", err));
    }

    getAllFaritra = () => {
        fetch(api("activityFieldLocations/"))
        .then((res) => res.json())
        .then((result) => {
            console.log("API response:", result); // 🔍 LOG THIS

            if (!result || !Array.isArray(result.data)) {
                console.error("Invalid API response format:", result);
                return;
            }

            const geojson = result.data.map((item) => ({
                type: "Feature",
                geometry: item.geometry,
                properties: {
                    name: item.name,
                    id: item.id,
                },
            }));

            this.setState({ polygons: geojson });
        })
        .catch((error) => console.error("Failed to fetch faritra:", error));
    }

    componentDidMount() {
        this.getAllDiosezy();
        this.getAllFaritra();
    }

    onEachFaritra = (feature, layer) => {
        layer.on({
        click: () => {
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`).openPopup();
        },
        });
    };

    render() {
        const madagascarCenter = [-18.7669, 46.8691];

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
                                        maxZoom={12}
                                        scrollWheelZoom={true}
                                        style={{ height: "100%", width: "100%" }}
                                    >
                                        <TileLayer url="/tiles/{z}/{x}/{y}.png" />

                                        {/* District polygons */}
                                        {this.state.polygons.length > 0 && (
                                            <GeoJSON
                                                data={this.state.polygons}
                                                onEachFeature={this.onEachFaritra}
                                                style={() => ({
                                                    color: "#3388ff",
                                                    weight: 2,
                                                    fillOpacity: 0.3,
                                                })}
                                            />
                                        )}

                                        {/* Diosezy polygons (regions) */}
                                        {this.state.diosezy.length > 0 && (
                                            <GeoJSON
                                                data={this.state.diosezy}
                                                onEachFeature={this.onEachFaritra} // or reuse onEachFaritra if you want
                                                style={() => ({
                                                    color: "#ff0000",  // red
                                                    weight: 3,
                                                    fillOpacity: 0.25,
                                                })}
                                            />
                                        )}
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
