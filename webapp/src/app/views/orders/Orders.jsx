import React from "react";
import {Breadcrumb} from "../../../matx";

const Orders = () => {
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
};

export default Orders;
