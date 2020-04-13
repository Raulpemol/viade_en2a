import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { MapWrapper } from "./createRoute.style";

import Map from "./Map";
import LateralForm from "./LateralForm";
import {Route} from '../../domain/domainClasses.js'

import {saveRouteToPOD} from '../../services/DomainJSONTranslator.js'

export class CreateRoute extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            name: "The name of the route",
            description: "The description of the route",
            waypoints: [],
            polyline:null
        };

        this.handleSetName = this.handleSetName.bind(this);
        this.handleSetDescription = this.handleSetDescription.bind(this);
        this.handleSetWaypoints = this.handleSetWaypoints.bind(this);
        this.handleSetPolyline = this.handleSetPolyline.bind(this);
        this.handleGetPolyline = this.handleGetPolyline.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSetName(newName) {
        console.log(newName)
        this.setState({ name: newName });
    }

    handleSetDescription(newDesc) {
        this.setState({ description: newDesc});
    }

    handleSetWaypoints(list) {
        this.setState({ waypoints: list });
    }

    handleSetPolyline(poly) {
        this.setState({ polyline: poly });
    }

    handleGetPolyline() {
        return this.state.polyline;
    }

    handleSubmit(event) {
        var route = new Route({"name": this.state.name, "description":this.state.description,"itinerary": this.state.waypoints, "resources" : [], "comments" : []});

        let poly = this.state.polyline;
        poly.setMap(null);
        this.setState({ polyline: poly });
        console.log(route.name);
        saveRouteToPOD(route, function(success){
            if(success){
                alert("La ruta se ha guardado en el pod: OK!");
            }
            else{
                alert("Mierda, hubo un problema y no se pudo guardar");
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <MapWrapper>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={7} sm={8} xs={12}>
                            <Map 
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0&libraries=drawing"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `800px`, border: `2px solid #fff`, margin: '20px auto', "max-height": "calc(100vh - 180px)", }} />}
                                mapElement={<div style={{ height: `100%` }} />}

                                setWaypoints={this.handleSetWaypoints} 
                                waypoints={this.state.waypoints}
                                setPolyline={this.handleSetPolyline}
                                getPolyline={this.handleGetPolyline}
                            />
                        </Col>

                        <Col xs={6} md={5} sm={4} xs={12}>
                            <LateralForm setDescription={this.handleSetDescription} 
                                setName={this.handleSetName} 
                                handleSubmit={this.handleSubmit}
                                name={this.state.name}
                                description={this.state.description}
                            />
                        </Col>
                    </Row>
                </Container>
            </MapWrapper>
        );
    }
}