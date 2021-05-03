import React from "react";
import { AgGridReact } from "ag-grid-react";

// TODO : Afficher commandes en fonction du supermarket connecté

export default class OrdersSupermarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || []
    }
  }

  onGridReady(params) {
    console.log(params);
    this.api = params.api;
    this.columnApi = params.columnApi.columnController;
    params.api.resetRowHeights();
  }

  getUserFromId = (id) => {
    let dataTemp = this.state.dataItem;
    dataTemp.user.forEach(user => {
      if (id.value == user.id) {
        console.log(user.name);
        return user.name
      }
    });
  }

  getEntityFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const entity of dataTemp.entity) {
      if (id.value == entity.id) {
        return entity.name
      }
    }
  }

  addressFormatter = (address) => {
    return address.value.street+", "+address.value.zip+", "+address.value.city;
  }

  itemsFormatter = (items) => {
    let quantity = 0;
    for (const item of items.value) {
      quantity+=item.quantity
      
    }
    return quantity;
  }

  render() {
    const colDef = [
        {
            "headerName": "order date",
            "field": "orderDate",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true
        },
        {
            "headerName": "delivery date",
            "field": "deliveryDate",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true
        },
        {
            "headerName": "address",
            "field": "address",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
              return this.addressFormatter(params);
            }
        },
        {
            "headerName": "price",
            "field": "price",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true
        },
        {
            "headerName": "item quantity",
            "field": "items",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
              return this.itemsFormatter(params);
            }
        },
        {
            "headerName": "producer",
            "field": "producerId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
              return this.getEntityFromId(params);
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
    
    const onColumnResized = (params) => {
      params.api.resetRowHeights();
    };

    const rowStyle = { whitespace: 'pre-line' };

    return (
      <div
          className="ag-theme-material"
          style={{ height: 300, width: '100%' }}
      >
          <AgGridReact
              onGridReady={this.onGridReady}
              onColumnResized={onColumnResized}
              rowData={this.state.dataItem.producerOrder}
              cellStyle={rowStyle}
              columnDefs={colDef}
              gridOptions={gridOptions}
          >
          </AgGridReact>
      </div>
    );
  }
}