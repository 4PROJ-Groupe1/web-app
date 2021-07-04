import React from "react";
import { AgGridReact } from "ag-grid-react";
import {SimpleCard} from "../../../matx";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CommandesService from "../../services/CommandesService";
import StockService from "../../services/StockService";
import UserService from "../../services/UserService";

// TODO : Afficher commandes en fonction du supermarket connecté

export default class OrdersSupermarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.dataItem || [],
      supermarketOrders: [],
      supermarketOrdersConsumer: [],
      supermarketOrdersProducer: [],
      lots: [],
      users: [],
      consumers: this.props.consumers,
      producers: this.props.producers,
      dialogOpen: false,
      orderToDisplay: null
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
                        let supermarketOrdersProducerTemp = [];
                        response.supermarketOrders.forEach(supermarketOrder => {
                          if (this.state.consumers.some(consumer => supermarketOrder.consumerId === consumer._id)) {
                            supermarketOrdersConsumerTemp.push(supermarketOrder);
                          } else if (this.state.producers.some(producer => supermarketOrder.consumerId === producer._id)) {
                            supermarketOrdersProducerTemp.push(supermarketOrder);
                          }
                        });
                        this.setState({
                          supermarketOrders: response.supermarketOrders,
                          supermarketOrdersConsumer: supermarketOrdersConsumerTemp,
                          supermarketOrdersProducer: supermarketOrdersProducerTemp,
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

  onGridReady(params) {
    console.log(params);
    this.api = params.api;
    this.columnApi = params.columnApi.columnController;
    params.api.resetRowHeights();
  }

  getConsumerFromId = (id) => {
    let consumersTemp = this.state.consumers;
    for (const consumer of consumersTemp) {
      if (id.value == consumer._id) {
        return consumer.name
      }
    }
  }

  getProducerFromId = (id) => {
    let producersTemp = this.state.producers;
    for (const producer of producersTemp) {
      if (id.value == producer._id) {
        return producer.name
      }
    }
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
    const colDefConsumer = [
        {
            "headerName": "Consumer",
            "field": "consumerId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
                return this.getConsumerFromId(params);
            }
        },
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

    const colDefProducer = [
        {
            "headerName": "Consumer",
            "field": "consumerId",
            "flex": "1",
            "minWidth": "100",
            "resizable": true,
            "suppressMovable": true,
            "autoHeight": true,
            valueFormatter: (params) => {
                return this.getProducerFromId(params);
            }
        },
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
    //lots

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
        <SimpleCard title="Consumers orders">
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
                columnDefs={colDefConsumer}
                gridOptions={gridOptions}
            >
            </AgGridReact>
          </div>
        </SimpleCard>
        <br/>
        <SimpleCard title="Producers orders">
          <div 
              className="ag-theme-material"
              style={{ height: 300, width: '100%' }}
          >
            <AgGridReact
                onGridReady={this.onGridReady}
                onColumnResized={onColumnResized}
                onRowClicked={this.onClicked}
                rowData={this.state.supermarketOrdersProducer}
                cellStyle={rowStyle}
                columnDefs={colDefProducer}
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