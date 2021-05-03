import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import ProductTable from "./ProductTable"; 

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
                    <SimpleCard title="Simple Table">
                        <ProductTable dataItem="test dataItem"/>
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Products;
