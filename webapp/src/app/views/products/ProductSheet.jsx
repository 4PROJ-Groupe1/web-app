import React from "react";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";

export default class ProductSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supermarket: this.props.supermarket || [],
            supermarketItems : this.props.supermarketItems || [],
            items : this.props.items || [],
            allSupermarketItems: [],
            allItems: []
        }

        this.formattxt = this.formattxt.bind(this);
    }

    getItemFromId = (id) => {
        for (const item of this.state.items) {
          if (id == item.id) {
            return item.name
          }
        }
    }

    componentDidMount() {
        let allSupermarketItemsTemp = [];
        this.state.supermarketItems.forEach(supermarketItem => {
            if (supermarketItem.supermarketId === this.state.supermarket.id) {
                allSupermarketItemsTemp.push(supermarketItem);
            }
        });

        let allItemsTemp = [];
        for (const supermarketItem of allSupermarketItemsTemp) {
            for (const item of this.state.items) {
              if (supermarketItem.itemId == item.id) {
                allItemsTemp.push(item);
              }
            }
            
        }

        this.setState({
            allItems: allItemsTemp,
            allSupermarketItems: allSupermarketItemsTemp
        });
    }

    formattxt(txt) {
        return txt + "hjbinjidnb7489798";
    }

    render() {
        return (
            <div>
                {this.state.allSupermarketItems.map((supermarketItem, index) =>
                    <Grid item xs key={index}>
                        <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>
                            <div className="card-title">{this.getItemFromId(supermarketItem.itemId)}</div>
                            <br/>
                            <div className="card-subtitle mb-24">{this.formattxt(this.getItemFromId(supermarketItem.itemId).name)}</div>
                            <a href="">Voir le détail</a>
                        </Card>
                    </Grid>
                )}
            </div>
        );
    }
}