import React from "react";
import { AgGridReact } from "ag-grid-react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CommandesService from "../../services/CommandesService";
import StockService from "../../services/StockService";
import {SimpleCard} from "../../../matx";

export default class OrdersConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || [],
      user: this.props.user || null,
      supermarketOrders: [],
      supermarketOrdersConsumer: [],
      lots: [],
      dialogOpen: false,
      orderToDisplay: null,
      orders: []
    }
  }

  componentDidMount() {
    CommandesService.getSupermarketOrders().then(
        res => {
            res.json().then(
                response => {
                    if (res.ok) {
                        console.log('getSupermarketOrders response : ', response);
                        let supermarketOrdersConsumerTemp = [];
                        response.supermarketOrders.forEach(supermarketOrder => {
                          if (supermarketOrder.consumerId === this.state.user.id) {
                            supermarketOrdersConsumerTemp.push(supermarketOrder);
                          }
                        });
                        this.setState({
                          supermarketOrders: response.supermarketOrders,
                          supermarketOrdersConsumer: supermarketOrdersConsumerTemp,
                        })
                    } else {
                        console.log("getSupermarketOrders failed : ", response.error);
                        // this.setState({displayError: true});
                        // this.setState({errorMessage: response.error});
                    }
                },
                error => {
                    console.log('getSupermarketOrders parse error : ', error);
                }
            );
        },
        err => {
            console.log('getSupermarketOrders error : ', err);
        }
    )
    StockService.getLots().then(
        res => {
            res.json().then(
                response => {
                    if (res.ok) {
                        console.log('getLot response : ', response);
                        this.setState({lots: response.lots})
                    } else {
                        console.log("getLot failed : ", response.error);
                        // this.setState({displayError: true});
                        // this.setState({errorMessage: response.error});
                    }
                },
                error => {
                    console.log('getLot parse error : ', error);
                }
            );
        },
        err => {
            console.log('getLot error : ', err);
        }
    )

  }

  getLotFromIdInDialog = (id) => {
    let lotsTemp = this.state.lots;
    for (const lots of lotsTemp) {
      if (id == lots._id) {
        return lots.numLot
      }
    }

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
    //#region grid def
    const colDef = [
        {
            "headerName": "Order date",
            "field": "orderDate",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
                return params.value.substring(0,10)
            }
        },
        {
            "headerName": "price",
            "field": "price",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
                return params.value + " €"
            }
        },
    ];

    const gridOptions = {
        pagination: true,
        paginationPageSize: 50
    }
    
    const onColumnResized = (params) => {
      params.api.resetRowHeights();
    };

    const rowStyle = { whitespace: 'pre-line' };
    //#endregion
    
    return (
      <div className="m-sm-30">
        <SimpleCard title="your orders">
          <div
              className="ag-theme-material"
              style={{ height: 300, width: '100%' }}
          >
            <AgGridReact
                onGridReady={this.onGridReady}
                onColumnResized={onColumnResized}
                onRowClicked={this.onClicked}
                rowData={this.state.supermarketOrdersConsumer}
                cellStyle={rowStyle}
                columnDefs={colDef}
                gridOptions={gridOptions}
            >
            </AgGridReact>
          </div>
          </SimpleCard>
          <Dialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}>
            <DialogContent dividers>
              <div style={{overflowY: "auto"}} >
                {this.state.orderToDisplay?.lots?.map((item, index) => 
                  <div key={index}> 
                    - <b>lot number : {this.getLotFromIdInDialog(item.idLot)}</b>, quantity : {item.quantity}
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