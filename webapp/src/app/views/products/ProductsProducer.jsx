import React from "react";
import { AgGridReact } from "ag-grid-react";

// TODO : Afficher commandes en fonction de l'user connecté

export default class ProductsProducer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || []
    }
  }

  getEntityFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const entity of dataTemp.entity) {
      if (id.value == entity.id) {
        return entity.name;
      }
    }
  }

  getCategoryFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const category of dataTemp.itemCategory) {
      if (id.value == category.id) {
        return category.name
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
            "headerName": "name",
            "field": "name",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true
        },
        {
            "headerName": "category",
            "field": "categoryId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            valueFormatter: (params) => {
                return this.getCategoryFromId(params);
            }
        },
        {
            "headerName": "seller",
            "field": "sellerId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
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
              rowData={this.state.dataItem.item}
              cellStyle={rowStyle}
              columnDefs={colDef}
              gridOptions={gridOptions}
          >
          </AgGridReact>
      </div>
    );
  }
}