import React from "react";
import {Breadcrumb} from "../../../matx";

const Supply = () => {
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
};

export default Supply;
