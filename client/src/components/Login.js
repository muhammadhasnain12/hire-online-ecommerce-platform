import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// Actions
import { signinUser, addUser } from '../actions/userActions';

// Components
import SignUpModal from './SignUpModal';
import App2 from '../App2';
import AppNavbar from './AppNavbar';
import SwitchRoute from './SwitchRoute'

// CSS
import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInModal: false,
            signUpModal: false,
            signInError: '',
            token: '',
            storageToken: JSON.parse(localStorage.getItem('react_login_app')),
            signUpError: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit() {
        const loginUser = {
            email: this.state.login_email,
            password: this.state.login_password
        }

        const res = await signinUser(loginUser);
        console.log("the response is", res);
        if (res.success) {
            this.setState({
                signInError: res.message,
                token: res.token
            });
            window.location.reload(false);
        }
        else {
            this.setState({
                signInError: res.message
            });
        }
    }

    async signUpSubmit() {

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        const res = await addUser(newUser);
        // console.log(res);
        if (res.success) {
            this.setState({
                signUpError: ''
            });
            // Close modal
            this.toggle();
        }
        else {
            this.setState({
                signUpError: res.message
            });
        }
    }

    toggle = () => {
        this.state.first_name = '';
        this.state.last_name = '';
        this.state.email = '';
        this.state.password = '';
        if (this.state.signInModal) {
            this.setState({
                signInModal: !this.state.signInModal,
                signInError: ''
            });
        }
        if (this.state.signUpModal) {
            this.setState({
                signUpModal: !this.state.signUpModal,
                signUpError: ''
            });
        }

    }

    openModel = () => {
        this.setState({
            signInModal: !this.state.signInModal
        })
    }
    toggleSignUp = () => {
        this.setState({
            signUpModal: !this.state.signUpModal,
            signInModal: !this.state.signInModal
        })
    }
    toggleSignIn = () => {
        this.setState({
            signUpModal: !this.state.signUpModal,
            signInModal: !this.state.signInModal
        })
    }

    removeItem = () => {
        localStorage.removeItem('react_login_app')
        window.location.reload(false);
    }


    render() {
        const {
            signInError,
            token,
            signUpError,
            storageToken
        } = this.state;
        return (
            <div>
                {
                    storageToken ? (
                       <button onClick={this.removeItem} className="border-0 bg-white"><h3 className="text-success mr-md-5 mr-0 mt-md-0 mt-4"><FontAwesomeIcon icon={faUser} /></h3></button> 
                    )
                    :
                    (
                        <Button className="mt-md-0 mt-4" onClick={this.openModel} size="sm" color="success">
                            LOGIN
                        </Button>
                    )
                }



                {/* #############################
                             Sign In Modal
                    ############################# */}

                <Modal isOpen={this.state.signInModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Login / Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="email"
                                    name="login_email"
                                    id="login_email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    name="login_password"
                                    id="login_password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Form>
                        <Row>
                            <Col>
                                {
                                    (signInError) ? (
                                        <p>{signInError}</p>
                                    ) : (null)
                                }
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.onSubmit} size="lg" block>Login</Button>
                        {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}

                    </ModalFooter>
                    <ModalFooter>
                        <button onClick={this.toggleSignUp} className="text-left border-0 bg-light">
                            Don't have an account? Create one here
                        </button>
                        {/* <Button onClick={this.toggleSignUp} className="text-left border-0 bg-light">Don't have an account? Create one here</Button>{' '} */}
                    </ModalFooter>
                </Modal>

                {/* #############################
                             Sign up Modal
                    ############################# */}
                <Modal isOpen={this.state.signUpModal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Login / Register</ModalHeader>
                    <div className="ErrMsg">
                        {
                            (signUpError) ? (
                                <p>{signUpError}</p>
                            ) : (null)
                        }
                    </div>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="user">First Name:</Label>
                                <Input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    placeholder="First Name"
                                    onChange={this.onChange}
                                />
                                <Label for="user">Last Name:</Label>
                                <Input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    placeholder="Last Name"
                                    onChange={this.onChange}
                                />
                                <Label for="user">Email:</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />
                                <Label for="user">Password:</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.signUpSubmit} size="lg" block>Sign Up</Button>
                    </ModalFooter>
                    <ModalFooter>
                        <button onClick={this.toggleSignIn} className="text-left border-0 bg-light">
                            Already have an account? Login here
                        </button>
                        {/* <Button onClick={this.toggleSignUp} className="text-left border-0 bg-light">Don't have an account? Create one here</Button>{' '} */}
                    </ModalFooter>

                    {/* <ModalFooter>
                        <Button color="primary" onClick={this.toggleSignIn}>Login</Button>
                        <Button color="primary" onClick={this.signUpSubmit}>Sign Up</Button>{' '}
                    </ModalFooter> */}
                </Modal>

            </div>
        );
    }
}