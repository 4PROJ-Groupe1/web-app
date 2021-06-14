import React from "react";
import { AgGridReact } from "ag-grid-react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// TODO : Afficher commandes en fonction de l'user connecté

export default class OrdersConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || [],
      user: this.props.user || null,
      dialogOpen: false,
      orderToDisplay: null,
      orders: []
    }
  }

  componentDidMount() {
    console.log("userid : ",this.state.user);
    let dataTemp = this.state.dataItem;
    let ordersTemp = this.state.orders;
    for (const order of dataTemp.supermarketOrder) {
      if (order.userId == this.state.user?.id) {
        ordersTemp.push(order);
      }
    }

    console.log("ordersTemp : ",ordersTemp);
    this.setState({
      orders: ordersTemp
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

  getEntityFromIdInDialog = (id) => {
    let dataTemp = this.state.dataItem;
    for (const entity of dataTemp.entity) {
      if (id == entity.id) {
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

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      orderToDisplay: {}
    })
  }

  onClicked = (params) => {
    console.log(params.data)
    this.setState({
      orderToDisplay: params.data,
      dialogOpen: true
    })
  }

  render() {
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
              onRowClicked={this.onClicked}
              rowData={this.state.orders}
              cellStyle={rowStyle}
              columnDefs={colDef}
              gridOptions={gridOptions}
          >
          </AgGridReact>
          <Dialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}>
            <DialogTitle id="customized-dialog-title">
              N° de commande : {this.state.orderToDisplay?.id}
            </DialogTitle>
            <DialogContent dividers>
              <div style={{overflowY: "auto"}} >
                <b>{this.getEntityFromIdInDialog(this.state.orderToDisplay?.supermarketId)} :</b>
                {this.state.orderToDisplay?.items?.map((item, index) => 
                  <div key={index}> 
                    - {item.quantity} {item.name}
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}