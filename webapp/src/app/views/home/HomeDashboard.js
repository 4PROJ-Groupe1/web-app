import React, { Component } from "react";
import {dimValueGetter} from "echarts/src/component/marker/markerHelper";
import {AgGridReact, AgGridColumn} from "ag-grid-react";

class HomeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    onGridReady(params) {
        console.log(params);
        this.api = params.api;
        this.columnApi = params.columnApi.columnController;
    }

    render() {
        console.log("render");
        const rowData = [
            {
                'name': 'name1',
                'price': '10',
                'seller': 'seller1'
            },
            {
                'name': 'name2',
                'price': '10',
                'seller': 'seller2'
            },
            {
                'name': 'name3',
                'price': '10',
                'seller': 'seller3'
            }
        ];

        const colDef = [
            {
                "headerName": "nameHeader",
                "field": "name",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
            },
            {
                "headerName": "priceHeader",
                "field": "price",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
            },
            {
                "headerName": "sellerHeader",
                "field": "seller",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
            },
            {
                "headerName": "nameHeader",
                "field": "name",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
            },
            {
                "headerName": "priceHeader",
                "field": "price",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
            },
            {
                "headerName": "sellerHeader",
                "field": "seller",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                valueFormatter: (params) => {
                    return params.value === 'seller1' ? params.value + "oui" : params.value;
                }
            }
        ];

        const gridOptions = {
            pagination: true,
            paginationPageSize: 50,
            localeText: {
                to: "à",
                of: "sur",
            }
        }

        return (
            <div className="m-sm-30">
                <p>ACCUEIL COMPONENT WORKS TEST</p>
                <br/>
                <br/>
                <p>test ag-grid : </p>
                <br/>
                <br/>
                <div
                    className="ag-theme-material"
                    style={{ height: 300, width: '100%' }}
                >
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        rowData={rowData}
                        columnDefs={colDef}
                        gridOptions={gridOptions}
                    >
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

export default HomeDashboard;
