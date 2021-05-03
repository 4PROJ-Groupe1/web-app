import React from "react";
import { AgGridReact } from "ag-grid-react";

// TODO : Afficher commandes en fonction de l'user connecté

export default class OrdersConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || []
    }
  }

  getUserFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const user of dataTemp.user) {
      if (id.value == user.id) {
        return user.name + " " + user.surname;
      }
    }
  }

  getEntityFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const entity of dataTemp.entity) {
      if (id.value == entity.id) {
        return entity.name
      }
    }
  }

  itemsFormatter = (items) => {
    let quantity = 0;
    for (const item of items.value) {
      quantity+=item.quantity
      
    }
    return quantity;
  }

  render() {
    console.log(this.props.dataItem);

    const colDef = [
        {
            "headerName": "supermarket",
            "field": "supermarketId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            valueFormatter: (params) => {
                return this.getEntityFromId(params);
            }
        },
        {
            "headerName": "date",
            "field": "date",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
        },
        {
            "headerName": "item quantity",
            "field": "items",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            valueFormatter: (params) => {
                return this.itemsFormatter(params);
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
              rowData={this.state.dataItem.supermarketOrder}
              cellStyle={rowStyle}
              columnDefs={colDef}
              gridOptions={gridOptions}
          >
          </AgGridReact>
      </div>
    );
  }
}