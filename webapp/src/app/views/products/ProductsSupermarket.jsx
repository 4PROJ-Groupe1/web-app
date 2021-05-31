import React from "react";
import { AgGridReact } from "ag-grid-react";

// TODO : Attendre Pol qu'il fasse une méthode back

export default class ProductsSupermarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || [],
      supermarketItems: []
    }
  }

  componentDidMount() {
    let dataTemp = this.state.dataItem;
    let supermarketItemsTemp = this.state.supermarketItems
    for (const supermarketItem of dataTemp.supermarketItem) {
      if (this.state.dataItem.item.some(item => supermarketItem.itemId === item.id)    ) {
        supermarketItemsTemp.push(supermarketItem);
      }
    }
    this.setState({
      supermarketItems: supermarketItemsTemp
    })
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

  getItemFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const item of dataTemp.item) {
      if (id.value == item.id) {
        return item.name
      }
    }
  }

  getShelFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const item of dataTemp.item) {
      if (id.value == item.id) {
        return item.name
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
    console.log(this.state.supermarketItems)
    const colDef = [
        {
            "headerName": "item",
            "field": "itemId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            valueFormatter: (params) => {
                return this.getItemFromId(params);
            }
        },
        {
            "headerName": "shelf",
            "field": "shelfId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            valueFormatter: (params) => {
                return this.getShelfFromId(params);
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
              rowData={this.state.supermarketItems}
              cellStyle={rowStyle}
              columnDefs={colDef}
              gridOptions={gridOptions}
          >
          </AgGridReact>
      </div>
    );
  }
}