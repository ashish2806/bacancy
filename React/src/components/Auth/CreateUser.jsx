import React, { Component } from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Redirect,Link } from 'react-router-dom';
import avatar from "assets/img/faces/marc.jpg";

import { updateObject, checkValidity } from '../../shared/utility.jsx';
import * as actions from '../../store/actions/index.jsx';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class CreateUser extends Component{
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
        	},
        	c_password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
        	},
	        firstname: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'text',
	                placeholder: 'First Name'
	            },
	            value: '',
	            validation: {
	                required: true
	            },
	            valid: false,
	            touched: false
	        },
	        lastname: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'text',
	                placeholder: 'Last Name'
	            },
	            value: '',
	            validation: {
	                required: true
	            },
	            valid: false,
	            touched: false
	        }
        },
        isSignup: false
    };

    submitHandler = (event) => {
        event.preventDefault();
        console.log('submit called');
        let acc = {
        	email: this.state.controls.username.value, 
        	password: this.state.controls.password.value, 
        	name: this.state.controls.firstname.value+' '+this.state.controls.lastname.value,
        	c_password: this.state.controls.c_password.value
        };

        this.props.createAcc(acc);
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
        //console.log(controlName, '=>', event.target.value, !this.state.controls[controlName].valid, this.state.controls[controlName].touched);
    }

	render() {
		if(localStorage.getItem('userId') !== null){
			return <Redirect
					to="/address"
					/>;
 		}
		console.log('=====> 1.1  ===> ' + this.props.isAuthenticated);
        if (this.props.isAuthenticated) {
            console.log('=====> 1.1  authRedirectPath ===> ' + this.props.authRedirectPath);
            // authRedirect = <Redirect to={this.props.authRedirectPath} />
            return (
                <Redirect to={"/dashboard"} />
            )
        }
		const { classes } = this.props;
		console.log('valid =>',!this.state.controls.username.valid);
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<GridContainer>
					<GridItem xs={12} sm={12} md={2}></GridItem>
					<GridItem xs={12} sm={12} md={8}>
					  <Card>
					    <CardHeader color="primary">
							<h4> {this.props.error}</h4>
					      <h4 className={classes.cardTitleWhite}>Create New Account</h4>
					      <p className={classes.cardCategoryWhite}>Create your profile</p>
					    </CardHeader>
							<GridContainer>
					        <GridItem xs={12} sm={12} md={6}>
					          <CustomInput
					            labelText="First Name"
					            id="first-name"
					            formControlProps={{
					              fullWidth: true,
					              error: !this.state.controls.firstname.valid && this.state.controls.firstname.touched
					            }}
					            value={this.state.controls.firstname.value}
					            inputProps = {{
					            	onChange:(event) => this.inputChangedHandler(event, 'firstname'),
					            	type: 'text'	
					            }}
                                
					          />
					        </GridItem>
					        <GridItem xs={12} sm={12} md={6}>
					          <CustomInput
					            labelText="Last Name"
					            id="last-name"
					            formControlProps={{
					              fullWidth: true,
					              error: !this.state.controls.lastname.valid && this.state.controls.lastname.touched
					            }}
					            value={this.state.controls.lastname.value}
                                inputProps = {{
                                	onChange: (event) => this.inputChangedHandler(event, 'lastname'),
                                	type: 'text'
                                }}
					          />
					        </GridItem>
					      </GridContainer>
					    <CardBody>
					      <GridContainer>
					        
					        <GridItem xs={12} sm={12} md={12}>
					        <CustomInput
					            labelText="email"
					            id="username"
					            formControlProps={{
					              fullWidth: true,
					              error: !this.state.controls.username.valid && this.state.controls.username.touched
					            }}
					            value={this.state.controls.username.value}
					            inputProps = {{
					            	onChange: (event) => this.inputChangedHandler(event, 'username'),
					            	type: 'email'	
					            }}
					          />
					        </GridItem>
					        <GridItem xs={12} sm={12} md={6}>
					          <CustomInput
					          	labelProps={{
					          		type: 'password'
					          	}}
					            labelText="Password"
					            id="password"
					            formControlProps={{
					              fullWidth: true,
					              error: !this.state.controls.password.valid && this.state.controls.password.touched
					            }}
					            value={this.state.controls.password.value}
					            inputProps = {{
                                	onChange: (event) => this.inputChangedHandler(event, 'password'),
                                	type: 'password'
                                }}
					          />
					        </GridItem>
					        <GridItem xs={12} sm={12} md={6}>
					          <CustomInput
					          	labelProps={{
					          		type: 'c_password'
					          	}}
					            labelText="Confirm Password"
					            id="c_password"
					            formControlProps={{
					              fullWidth: true,
					              error: !this.state.controls.c_password.valid && this.state.controls.c_password.touched
					            }}
					            value={this.state.controls.c_password.value}
					            inputProps = {{
                                	onChange: (event) => this.inputChangedHandler(event, 'c_password'),
                                	type: 'password'
                                }}
					          />
					        </GridItem>
					      </GridContainer>
					      
					      {/*<GridContainer>
					        <GridItem xs={12} sm={12} md={4}>
					          <CustomInput
					            labelText="City"
					            id="city"
					            formControlProps={{
					              fullWidth: true
					            }}
					          />
					        </GridItem>
					        <GridItem xs={12} sm={12} md={4}>
					          <CustomInput
					            labelText="Country"
					            id="country"
					            formControlProps={{
					              fullWidth: true
					            }}
					          />
					        </GridItem>
					        <GridItem xs={12} sm={12} md={4}>
					          <CustomInput
					            labelText="Postal Code"
					            id="postal-code"
					            formControlProps={{
					              fullWidth: true
					            }}
					          />
					        </GridItem>
					      </GridContainer>*/}
					      {/*<GridContainer>
					        <GridItem xs={12} sm={12} md={12}>
					          <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
					          <CustomInput
					            labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
					            id="about-me"
					            formControlProps={{
					              fullWidth: true
					            }}
					            inputProps={{
					              multiline: true,
					              rows: 5
					            }}
					          />
					        </GridItem>
					      </GridContainer>*/}
					    </CardBody>
					    <CardFooter>
					      <Button color="primary" type="submit" id="register">Create Account</Button>
								<Link to="/login"><Button id="login" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button></Link>
                    
					    </CardFooter> 
					  </Card>
						
               
					</GridItem>
					<GridItem xs={12} sm={12} md={2}></GridItem>
					{/*<GridItem xs={12} sm={12} md={4}>
					  <Card profile>
					    <CardAvatar profile>
					      <a href="#pablo" onClick={e => e.preventDefault()}>
					        <img src={avatar} alt="..." />
					      </a>
					    </CardAvatar>
					    <CardBody profile>
					      <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
					      <h4 className={classes.cardTitle}>Alec Thompson</h4>
					      <p className={classes.description}>
					        Don't be scared of the truth because we need to restart the
					        human foundation in truth And I love you like Kanye loves Kanye
					        I love Rick Owens’ bed design but the back is...
					      </p>
					      <Button color="primary" round>
					        Follow
					      </Button>
					    </CardBody>
					  </Card>
					</GridItem>*/}
					</GridContainer>
				</form>
			</div>
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
        createAcc: (accArr) => dispatch(actions.register(accArr)),
        //onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateUser));