import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect ,Link} from 'react-router-dom';

import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { updateObject, checkValidity } from '../../shared/utility.jsx';
import * as actions from '../../store/actions/index.jsx';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
class Address extends Component {

    state = {
        controls: {
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'city'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'state'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'pincode'
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
        isSignup: false,
        show_address : false
    };

    componentDidMount() {
       // alert(this.props.isAuthenticated);
         
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
        
        else{
            this.props.getaddress();
        }
    }

    getaddressHandler(){
        this.props.getaddress()
    }
    show_addressHandler = () =>{
        this.props.show_addressHandler();
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
        this.props.onsave(this.state.controls.city.value, this.state.controls.state.value,this.state.controls.pincode.value, this.state.isSignup);
  
    }

    render() {
        console.log("ad" );

        console.log(this.props.isAuthenticated );
        if(localStorage.getItem('userId') === null){
            return <Redirect
                to="/login"
                />;
       }
        const { classes } = this.props;
        console.log(this.state.show_address);
        
        let authRedirect = null;
        console.log('=====> 1.1  ===> ' + this.props.isAuthenticated);
        if (this.props.isAuthenticated) {
            console.log('=====> 1.1  authRedirectPath ===> ' + this.props.authRedirectPath);
            // authRedirect = <Redirect to={this.props.authRedirectPath} />
            return (
                <Redirect to={"/dashboard"} />
            )
        }
      
      let t =[];
      
    if (this.props.address){
       let tf = this.props.address.map(id=>{
        let tt =[];
        tt.push(id.id.toString());
        tt.push(id.city);
        tt.push(id.state);
        tt.push(id.pincode.toString());
        console.log(tt);
        t.push(tt);
       });
       
    }
     
    
  return (
      
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <Grid> {this.props.error}</Grid>
        <Card>
         {this.props.show_address ? 
          <div className={classes.margin}>
                    <form onSubmit={this.submitHandler}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    //error={isvalid_username}
                                    value={this.state.controls.city.value}
                                    onChange={(event) => this.inputChangedHandler(event, 'city')} id="city" label="city" type="text" fullWidth autoFocus required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    //error={isvalid_password}
                                    value={this.state.controls.state.value}
                                    id="state"
                                    onChange={(event) => this.inputChangedHandler(event, 'state')} label="state" type="text" fullWidth required />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={8} alignItems="flex-end">
                            
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    //error={isvalid_password}
                                    value={this.state.controls.pincode.value}
                                    id="pincode"
                                    onChange={(event) => this.inputChangedHandler(event, 'pincode')} label="pincode" type="text" fullWidth required />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button type="submit" id="save" variant="outlined" color="primary" style={{ textTransform: "none" }}>Save</Button>
                        </Grid>
                        
                    </form>
                </div> : null}

                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button onClick={this.show_addressHandler} id="add_address" disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary"  >Add Adress</Button>
                    <Link to="/logout"><Button id="logout" variant="outlined" color="primary" style={{ textTransform: "none" }}>Logout</Button></Link>
                </Grid>
                
          <CardBody>
             
            { t.length > 0 ? <Table
              tableHeaderColor="primary"
              tableHead={["User_id", "City", "State", "Pincode"]}
              tableData={t}
            /> : this.props.message }
          </CardBody>
        </Card>
      </GridItem>
   
    </GridContainer>
  );

    
    }
}

const mapStateToProps = state => {
    console.log("sss" + state.auth.token);
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        address : state.auth.address,
        message : state.auth.message,
        show_address : state.auth.show_address
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getaddress: () => dispatch(actions.getaddress()),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onsave : (city,state,pinocde)  => dispatch(actions.save_address(city,state,pinocde)),
        show_addressHandler : () => dispatch(actions.show_addressHandler())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Address));