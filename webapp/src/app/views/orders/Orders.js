import React, { Component } from "react";
import {Breadcrumb} from "../../../matx";

class Orders extends Component {
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
                        { name: "Orders" }
                    ]}
                />
                <div className="m-sm-30">
                    <p>COMMANDES / LIVRAISONS COMPONENT WORKS</p>
                </div>
            </div>
        );
    }
}

export default Orders;
