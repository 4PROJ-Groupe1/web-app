import React from "react";
import { AgGridReact } from "ag-grid-react";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import ProductSheet from './ProductSheet.jsx';
import { SimpleCard } from "../../../matx";

// TODO : Afficher commandes en fonction de l'user connecté

export default class ProductsConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || [],
      items: [],
      allSupermarket: []
    }
  }

  componentDidMount() {
    let allSupermarketTemp = [];
    this.state.dataItem.entity.forEach(entity => {
      if (entity.typeId === 2) {
        allSupermarketTemp.push(entity)
      }
    });
    this.setState({
      allSupermarket: allSupermarketTemp
    });
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

  getShelfFromId = (id) => {
    let dataTemp = this.state.dataItem;
    for (const shelf of dataTemp.shelf) {
      if (id.value == shelf.id) {
        return shelf.name
      }
    }
  }

  getAllItemsFromSupermarket = (id) => {
    let dataTemp = this.state.dataItem;
    let itemsTemp = this.state.items;
    for (const items of dataTemp.supermarketItem) {
      if (id.value == items.id) {
        itemsTemp.push(items)
      }
    }
  }

  render() {

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
            "headerName": "shelf",
            "field": "shelfId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            valueFormatter: (params) => {
                return this.getShelfFromId(params);
            }
        },
        {
            "headerName": "quantity",
            "field": "quantity",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true
        },
        {
            "headerName": "max quantity",
            "field": "maxQuantity",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true
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
         {this.state.allSupermarket.map((supermarket, index) =>
         <div key={index}>
          <SimpleCard title={supermarket.name}>
              <Grid container spacing={3}>
                <ProductSheet supermarket={supermarket} supermarketItems={this.state.dataItem.supermarketItem} items={this.state.dataItem.item}/>
              </Grid>
            </SimpleCard>
            <br/>
          </div>

         )}
      </div>
    );
  }
}