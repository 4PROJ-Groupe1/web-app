import React, { Component } from "react";
import {Breadcrumb} from "../../../matx";

class Supply extends Component {
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
                        { name: "Supply" }
                    ]}
                />
                <div className="m-sm-30">
                    <p>STOCKAGE COMPONENT WORKS</p>
                </div>
            </div>
        );
    }
}

export default Supply;
