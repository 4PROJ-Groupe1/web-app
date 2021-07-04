import React, { Component } from "react";
import {Breadcrumb, SimpleCard} from "../../../matx";
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles} from "@material-ui/core/styles";
import {amber, green} from "@material-ui/core/colors";
import {PropTypes} from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import {AgGridReact} from "ag-grid-react";
import StockService from "../../services/StockService";


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span style={{color: "white"}} id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1)
    }
}));


class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            displayError: false,
            errorMessage: "",
            rowData: []
        }
    }

    componentDidMount() {
        StockService.getCategories().then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('getCategories response : ', response);
                            this.setState({rowData: response.categories})
                        } else {
                            console.log("getCategories failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('getCategories parse error : ', error);
                    }
                );
            },
            err => {
                console.log('getCategories error : ', err);
            }
        )
    }

    handleChange = event => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = event => {
        StockService.addCategory(this.state.category).then(
            res => {
                res.json().then(
                    response => {
                        if (res.ok) {
                            console.log('addCategory response : ', response);
                            this.setState({rowData: response.categories, category: ""})
                        } else {
                            console.log("addCategory failed : ", response.error);
                            this.setState({displayError: true});
                            this.setState({errorMessage: response.error});
                        }
                    },
                    error => {
                        console.log('addCategory parse error : ', error);
                    }
                );
            },
            err => {
                console.log('addCategory error : ', err);
            }
        )
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({displayError: false});
    }

    render() {
        let { category } = this.state;
        let { classes } = this.props;




        const colDef = [
            {
                "headerName": "Category name",
                "field": "name",
                "flex": "1",
                "minWidth": "100",
                "resizable": true,
                "suppressMovable": true,
                "sortable": true
            }
        ];

        const gridOptions = {
            pagination: true,
            paginationPageSize: 10
        }

        const onColumnResized = (params) => {
            params.api.resetRowHeights();
        };

        const rowStyle = { whitespace: 'pre-line' };




        return (
            <div className="m-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Product categories" }
                    ]}
                />
                <div className="m-sm-30">
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={this.state.displayError}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            variant="error"
                            //className={classes.margin}
                            message={this.state.errorMessage}
                        />
                    </Snackbar>
                    <div
                        className="ag-theme-material"
                        style={{ height: 600, width: '100%' }}
                    >
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            onColumnResized={onColumnResized}
                            onRowClicked={this.onClicked}
                            rowData={this.state.rowData}
                            cellStyle={rowStyle}
                            columnDefs={colDef}
                            gridOptions={gridOptions}
                        >
                        </AgGridReact>
                    </div>
                    <SimpleCard title={"Add a product category"}>
                        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                            <TextValidator
                                className="mb-24 w-100"
                                variant="outlined"
                                label="Category name"
                                onChange={this.handleChange}
                                type="text"
                                name="category"
                                value={category}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <div className="flex flex-middle">
                                <Button
                                    className="capitalize"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Add category
                                </Button>
                            </div>
                        </ValidatorForm>
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default ProductCategory;
