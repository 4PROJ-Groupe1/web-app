import React, { Component } from "react";
import {Breadcrumb} from "../../../matx";

class Products extends Component {
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
                        { name: "Products" }
                    ]}
                />
                <div className="m-sm-30">
                    <p>PRODUITS COMPONENT WORKS</p>
                </div>
            </div>
        );
    }
}

export default Products;
