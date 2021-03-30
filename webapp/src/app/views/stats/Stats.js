import React, { Component } from "react";
import {Breadcrumb} from "../../../matx";

class Stats extends Component {
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
                        { name: "Stats" }
                    ]}
                />
                <div className="m-sm-30">
                    <p>STATS COMPONENT WORKS</p>
                </div>
            </div>
        );
    }
}

export default Stats;
