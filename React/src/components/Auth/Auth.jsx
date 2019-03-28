import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect ,Link} from 'react-router-dom';

import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { updateObject, checkValidity } from '../../shared/utility.jsx';
import * as actions from '../../store/actions/index.jsx';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginTab extends Component {

    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    };

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            //this.props.onSetAuthRedirectPath();
        }
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.username.value, this.state.controls.password.value, this.state.isSignup);
    }

    render() {
        if(localStorage.getItem('userId') !== null){
            return <Redirect
                to="/address"
                />;
       }
        const { classes } = this.props;

        let isvalid_username = false;
        let isvalid_password = false;

        if (this.state.controls.username.valid && this.state.controls.username.touched) {
            isvalid_username = true;
        }
        if (this.state.controls.password.valid && this.state.controls.password.touched) {
            isvalid_password = true;
        }

        let authRedirect = null;
        console.log('=====> 1.1  ===> ' + this.props.isAuthenticated);
        if (this.props.isAuthenticated) {
            console.log('=====> 1.1  authRedirectPath ===> ' + this.props.authRedirectPath);
            // authRedirect = <Redirect to={this.props.authRedirectPath} />
            return (
                <Redirect to={"/address"} />
            )
        }
        return (
            <Paper className={classes.padding}>
                {authRedirect}
                <Grid style={{ backgroundColor:'red'}}> <h1>{this.props.error}</h1></Grid>
                <div className={classes.margin}>
                    <form onSubmit={this.submitHandler}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Face />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    //error={isvalid_username}
                                    value={this.state.controls.username.value}
                                    onChange={(event) => this.inputChangedHandler(event, 'username')} id="username" label="Username" type="email" fullWidth autoFocus required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Fingerprint />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    //error={isvalid_password}
                                    value={this.state.controls.password.value}
                                    id="password"
                                    onChange={(event) => this.inputChangedHandler(event, 'password')} label="Password" type="password" fullWidth required />
                            </Grid>
                        </Grid>
                        
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button type="submit" id="login" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Link to="/createuser"><Button id="createuser" variant="outlined" color="primary" style={{ textTransform: "none" }}>Register</Button></Link>
                        </Grid>
                    </form>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginTab));