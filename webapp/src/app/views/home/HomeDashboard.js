import React, { Component } from "react";
import {AgGridReact} from "ag-grid-react";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";

class HomeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="m-sm-30">
                {/*<p>ACCUEIL COMPONENT WORKS TEST</p>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<div>*/}
                {/*    /!*PRODUCER*!/*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Produits</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Vous proposez 50 produits différents à la vente</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Livraisons</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Vous avez 10 commandes à expédier, et 15 en cours d'acheminement. </div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*                <br/>*/}
                {/*                <a href="">Voir l'historique</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <br/>*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100" style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Stock</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Vous possédez 800 produits en stock, ce qui représente 4000€</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Péremption</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">ATTENTION : Vous avez 5 produits périmés non vendus.</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</div>*/}

                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}

                {/*<div>*/}
                {/*    /!*SUPERMARKET*!/*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Commandes</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Vous avez 12 commandes en cours.</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*                <br/>*/}
                {/*                <a href="">Voir l'historique</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Produits</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Vous avez 5000 produits en rayon, sur 6000 maximum. </div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <br/>*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100" style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Chiffre d'affaire</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Aujourd'hui, vous avez pour le moment réalisé 6000€ de chiffre d'affaire, pour 600 clients.</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100" style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Stock</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">Vous possédez 800 produits en stock, ce qui représente 4000€</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <Grid item xs={6}>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Péremption</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">ATTENTION : Vous avez 5 produits périmés non vendus.</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</div>*/}

                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}

                {/*<div>*/}
                {/*    /!*CONSUMER*!/*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Recommendation</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24"> ? </div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs>*/}
                {/*            <Card elevation={6} className="px-24 py-20 h-100"  style={{minWidth: 250}}>*/}
                {/*                <div className="card-title">Péremption</div>*/}
                {/*                <br/>*/}
                {/*                <div className="card-subtitle mb-24">ATTENTION : Vous avez 5 produits périmés dans votre frigo.</div>*/}
                {/*                <a href="">Voir le détail</a>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default HomeDashboard;
