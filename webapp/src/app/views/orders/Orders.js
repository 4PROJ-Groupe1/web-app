import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import OrdersTable from "./OrdersTable"; 

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "test"
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
                    <SimpleCard title="Simple Table" dataItem={this.state.test}>
                        <OrdersTable />
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Orders;
