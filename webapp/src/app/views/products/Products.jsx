import React from "react";
import {Breadcrumb} from "../../../matx";

const Products = () => {
    return (
        <div className="m-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: "Home", path: "/Home" },
                    { name: "Products" }
                ]}
            />
            <div className="m-sm-30">
                <p>PRODUCTS COMPONENT WORKS</p>
            </div>
        </div>
    );
};

export default Products;
