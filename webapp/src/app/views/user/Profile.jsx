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
import UserService from "../../services/UserService";
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


// const variantIcon = {
//     success: CheckCircleIcon,
//     warning: WarningIcon,
//     error: ErrorIcon,
//     info: InfoIcon
// };
//
// const useStyles1 = makeStyles(theme => ({
//     success: {
//         backgroundColor: green[600]
//     },
//     error: {
//         backgroundColor: theme.palette.error.dark
//     },
//     info: {
//         backgroundColor: theme.palette.primary.main
//     },
//     warning: {
//         backgroundColor: amber[700]
//     },
//     icon: {
//         fontSize: 20
//     },
//     iconVariant: {
//         opacity: 0.9,
//         marginRight: theme.spacing(1)
//     },
//     message: {
//         display: "flex",
//         alignItems: "center"
//     }
// }));
//
// function MySnackbarContentWrapper(props) {
//     const classes = useStyles1();
//     const { className, message, onClose, variant, ...other } = props;
//     const Icon = variantIcon[variant];
//
//     return (
//         <SnackbarContent
//             className={clsx(classes[variant], className)}
//             aria-describedby="client-snackbar"
//             message={
//                 <span style={{color: "white"}} id="client-snackbar" className={classes.message}>
//           <Icon className={clsx(classes.icon, classes.iconVariant)} />
//                     {message}
//         </span>
//             }
//             action={[
//                 <IconButton
//                     key="close"
//                     aria-label="Close"
//                     color="inherit"
//                     onClick={onClose}
//                 >
//                     <CloseIcon className={classes.icon} />
//                 </IconButton>
//             ]}
//             {...other}
//         />
//     );
// }
//
// MySnackbarContentWrapper.propTypes = {
//     className: PropTypes.string,
//     message: PropTypes.node,
//     onClose: PropTypes.func,
//     variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
// };
//
// const useStyles2 = makeStyles(theme => ({
//     margin: {
//         margin: theme.spacing(1)
//     }
// }));


class Profile extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('auth_user'));
        this.state = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: "",
            displayError: false,
            errorMessage: ""
        }
    }

    componentDidMount() {

    }

    // handleChange = event => {
    //     event.persist();
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // };
    //
    // handleFormSubmit = event => {
    //     UserService.addProducer(this.state.name, this.state.surname, this.state.email,this.state.password).then(
    //         res => {
    //             res.json().then(
    //                 response => {
    //                     if (res.ok) {
    //                         console.log('register response : ', response);
    //                         //this.props.history.push("/session/signin");
    //                     } else {
    //                         console.log("register failed : ", response.error);
    //                         this.setState({displayError: true});
    //                         this.setState({errorMessage: response.error});
    //                     }
    //                 },
    //                 error => {
    //                     console.log('register parse error : ', error);
    //                 }
    //             );
    //         },
    //         err => {
    //             console.log('Registor error : ', err);
    //         }
    //     );
    // };
    //
    // handleClose = (event, reason) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     this.setState({displayError: false});
    // }

    render() {
        let { name, surname, email, password } = this.state;
        console.log(this.props);
        // let { classes } = this.props;
        return (
            <div className="m-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Profile" }
                    ]}
                />
                <div className="m-sm-30">
                    {/*<Snackbar*/}
                    {/*    anchorOrigin={{*/}
                    {/*        vertical: "bottom",*/}
                    {/*        horizontal: "left"*/}
                    {/*    }}*/}
                    {/*    open={this.state.displayError}*/}
                    {/*    autoHideDuration={6000}*/}
                    {/*    onClose={this.handleClose}*/}
                    {/*>*/}
                    {/*    <MySnackbarContentWrapper*/}
                    {/*        variant="error"*/}
                    {/*        //className={classes.margin}*/}
                    {/*        message={this.state.errorMessage}*/}
                    {/*    />*/}
                    {/*</Snackbar>*/}
                    <SimpleCard title={"Profile informations"}>
                        {/*<ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>*/}
                        <ValidatorForm ref="form">
                            <TextValidator
                                className="mb-24 w-100"
                                variant="outlined"
                                label="Name"
                                // onChange={this.handleChange}
                                type="text"
                                name="name"
                                value={name}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                                disabled
                            />
                            <TextValidator
                                className="mb-24 w-100"
                                variant="outlined"
                                label="Surname"
                                // onChange={this.handleChange}
                                type="text"
                                name="surname"
                                value={surname}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                                disabled
                            />
                            <TextValidator
                                className="mb-24 w-100"
                                variant="outlined"
                                label="Email"
                                // onChange={this.handleChange}
                                type="email"
                                name="email"
                                value={email}
                                validators={["required", "isEmail"]}
                                errorMessages={[
                                    "this field is required",
                                    "email is not valid"
                                ]}
                                disabled
                            />
                            {/*<TextValidator*/}
                            {/*    className="mb-16 w-100"*/}
                            {/*    label="Password"*/}
                            {/*    variant="outlined"*/}
                            {/*    onChange={this.handleChange}*/}
                            {/*    name="password"*/}
                            {/*    type="password"*/}
                            {/*    value={password}*/}
                            {/*    validators={["required"]}*/}
                            {/*    errorMessages={["this field is required"]}*/}
                            {/*    disabled*/}
                            {/*/>*/}
                            {/*<div className="flex flex-middle">*/}
                            {/*    <Button*/}
                            {/*        className="capitalize"*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        type="submit"*/}
                            {/*    >*/}
                            {/*        Add producer account*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </ValidatorForm>
                    </SimpleCard>
                </div>
            </div>
        );
    }
}

export default Profile;
