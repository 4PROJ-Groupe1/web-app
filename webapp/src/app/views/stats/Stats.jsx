import React from "react";
import {Breadcrumb} from "../../../matx";

const Stats = () => {
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
};

export default Stats;
