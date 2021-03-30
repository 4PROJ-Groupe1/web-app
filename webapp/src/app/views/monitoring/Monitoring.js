import React, { Component } from "react";
import {Breadcrumb} from "../../../matx";

class Monitoring extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="m-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Monitoring" }
                    ]}
                />
                <div className="m-sm-30">
                    <p>VISUALISATION GLOBALE COMPONENT WORKS</p>
                </div>
            </div>
        );
    }
}

export default Monitoring;
