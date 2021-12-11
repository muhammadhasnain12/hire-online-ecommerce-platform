import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import {
    Container, Row, Col, Form, FormGroup, Label, Input, Button,
    NavbarBrand, Navbar, Table
} from 'reactstrap';
import { postAdd } from '../actions/userActions';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconText: ['Automobile', 'Electronics', 'Medicine', 'Sports', 'Fashion', 'Furniture'],
            category: '',
            product_title: '',
            product_description: '',
            product_condition: '',
            startDate: '',
            endDate: '',
            expectedPrice: '',
            rentValue: '',
            priceNegotiable: '',
            rentPer: '',
            addLocation: '',
            renter_name: '',
            renter_email: '',
            renter_number: '',
            project_image: '',
            signUpError: '',
            postStatus: ''

        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit() {
        console.log("image path is ", this.state.project_image)
        const addDetails = {
            category: this.state.category,
            product_title: this.state.product_title,
            product_description: this.state.product_description,
            product_condition: this.state.product_condition,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            expectedPrice: this.state.expectedPrice,
            rentValue: this.state.rentValue,
            priceNegotiable: this.state.priceNegotiable,
            rentPer: this.state.rentPer,
            addLocation: this.state.addLocation,
            renter_name: this.state.renter_name,
            renter_email: this.state.renter_email,
            renter_number: this.state.renter_number,
            project_image: this.state.project_image.replace("C:\\fakepath\\", ""),

        }
        // let image = this.state.project_image
        // var filename = image.replace("C:\\fakepath\\", "");

        console.log("Data is = ", addDetails)
        const res = await postAdd(addDetails);
        if (res.success) {
            NotificationManager.success('Your post details successfully added !');
        }
        window.location.reload(false);
    }

    setFormStatus = (status) => {
        this.setState({
            postStatus: status
        })
    }

    render() {
        const styles = {
            text: {
                fontSize: '30px',
                fontWeight: '700',
                fontFamily: 'Fira Sans, sans-serif'
            },
        }
        const { iconText, postStatus } = this.state;

        let textList = iconText.length > 0
            && iconText.map((item, i) => {
                return (
                    <option key={i} value={item}>{item}</option>
                )
            }, this);

        console.log("post Status", postStatus)

        let PostAddForm
        if (postStatus === 'sale') {
            PostAddForm = (
                <Container>
                    <Row>
                        <Col sm="3"></Col>
                        <Col sm="6" md="6">
                            <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Include some details</h4>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup className="text-left ">
                                    <Label for="exampleSelect" className="mt-3 mb-3">Category</Label>
                                    <Input type="select" name="category" id="category" onChange={this.onChange}>
                                        {textList}
                                    </Input>
                                    <Label for="user" className="mt-3 mb-3">Add Title:</Label>
                                    <Input
                                        type="text"
                                        name="product_title"
                                        id="product_title"
                                        placeholder="enter ad title..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Description:</Label>
                                    <Input
                                        type="text"
                                        outline
                                        color="success"
                                        name="product_description"
                                        id="product_description"
                                        placeholder="enter short description about Ad..."
                                        onChange={this.onChange}


                                    />

                                    {/* <Label for="exampleSelect" className="mt-3 mb-3">Condition</Label>
                                    <Input type="select" name="product_condition" id="product_condition" onChange={this.onChange} id="exampleSelect">
                                        <option>New</option>
                                        <option>Used</option>
                                    </Input> */}
                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Set Price</h4>
                                    <Label for="user" className="mt-3 mb-3">Price:</Label>
                                    <Input
                                        type="number"
                                        name="expectedPrice"
                                        id="expectedPrice"
                                        placeholder="expected price..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="exampleSelect" className="mt-3 mb-3">Price negotiable</Label>
                                    <Input type="select" name="priceNegotiable" id="priceNegotiable" onChange={this.onChange} id="exampleSelect">
                                        <option>Fixed</option>
                                        <option>Negotiable</option>
                                    </Input>

                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Select Location</h4>
                                    <Label for="user" className="mt-3 mb-3">Add Location:</Label>
                                    <Input
                                        type="text"
                                        name="addLocation"
                                        id="addLocation"
                                        placeholder="add location..."
                                        onChange={this.onChange}
                                    />
                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Seller Details</h4>
                                    <Label for="user" className="mt-3 mb-3">Name:</Label>
                                    <Input
                                        type="text"
                                        name="renter_name"
                                        id="renter_name"
                                        placeholder="name.."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Email:</Label>
                                    <Input
                                        type="email"
                                        name="renter_email"
                                        id="renter_email"
                                        placeholder="email..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Phone Number:</Label>
                                    <Input
                                        type="number"
                                        name="renter_number"
                                        id="renter_number"
                                        placeholder="number..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Upload Image:</Label>
                                    <Input
                                        type="file"
                                        name="project_image"
                                        id="project_image"
                                        placeholder="upload image..."
                                        onChange={this.onChange}
                                    />
                                    <Button color="success" className="mt-5" onClick={this.onSubmit} size="lg" block>Submit</Button>

                                </FormGroup>
                            </Form>

                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                </Container>
            )
        }
        else if (postStatus === 'rent') {
            PostAddForm = (
                <Container>
                    <Row>
                        <Col sm="3"></Col>
                        <Col sm="6" md="6">
                            <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Include some details</h4>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup className="text-left ">
                                    <Label for="exampleSelect" className="mt-3 mb-3">Category</Label>
                                    <Input type="select" name="category" id="category" onChange={this.onChange}>
                                        {textList}
                                    </Input>
                                    <Label for="user" className="mt-3 mb-3">Add Title:</Label>
                                    <Input
                                        type="text"
                                        name="product_title"
                                        id="product_title"
                                        placeholder="enter ad title..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Description:</Label>
                                    <Input
                                        type="text"
                                        outline
                                        color="success"
                                        name="product_description"
                                        id="product_description"
                                        placeholder="enter short description about Ad..."
                                        onChange={this.onChange}

                                    />

                                    <Label for="exampleSelect" className="mt-3 mb-3">Condition</Label>
                                    <Input type="select" name="product_condition" id="product_condition" onChange={this.onChange} id="exampleSelect">
                                        <option>New</option>
                                        <option>Used</option>
                                    </Input>
                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Selected Availability Dates</h4>
                                    <Row>
                                        <Col sm="6">
                                            <Label for="exampleDate">Start Date</Label>
                                            <Input
                                                type="date"
                                                name="startDate"
                                                id="startDate"
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <Label for="exampleDate">End Date</Label>
                                            <Input
                                                type="date"
                                                name="endDate"
                                                id="endDate"
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </Row>
                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Set Rental Price</h4>
                                    <Label for="user" className="mt-3 mb-3">Rental Price:</Label>
                                    <Input
                                        type="number"
                                        name="expectedPrice"
                                        id="expectedPrice"
                                        placeholder="expected price..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="exampleSelect" className="mt-3 mb-3">Price negotiable</Label>
                                    <Input type="select" name="priceNegotiable" id="priceNegotiable" onChange={this.onChange} id="exampleSelect">
                                        <option>Fixed</option>
                                        <option>Negotiable</option>
                                    </Input>
                                    <Label for="exampleSelect" className="mt-3 mb-3">Rent Per</Label>
                                    <Input type="select" name="rentPer" id="rentPer" onChange={this.onChange} id="exampleSelect">
                                        <option>Day</option>
                                        <option>Month</option>
                                    </Input>

                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Select Location</h4>
                                    <Label for="user" className="mt-3 mb-3">Add Location:</Label>
                                    <Input
                                        type="text"
                                        name="addLocation"
                                        id="addLocation"
                                        placeholder="add location..."
                                        onChange={this.onChange}
                                    />
                                    <h4 style={styles.text} className="mt-4 font-weight-bold text-left text-success">Seller Details</h4>
                                    <Label for="user" className="mt-3 mb-3">Name:</Label>
                                    <Input
                                        type="text"
                                        name="renter_name"
                                        id="renter_name"
                                        placeholder="name.."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Email:</Label>
                                    <Input
                                        type="email"
                                        name="renter_email"
                                        id="renter_email"
                                        placeholder="email..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Phone Number:</Label>
                                    <Input
                                        type="number"
                                        name="renter_number"
                                        id="renter_number"
                                        placeholder="number..."
                                        onChange={this.onChange}
                                    />
                                    <Label for="user" className="mt-3 mb-3">Upload Image:</Label>
                                    <Input
                                        type="file"
                                        name="project_image"
                                        id="project_image"
                                        placeholder="upload image..."
                                        onChange={this.onChange}
                                    />
                                    <Button color="success" className="mt-5" onClick={this.onSubmit} size="lg" block>Submit</Button>
                                </FormGroup>
                            </Form>

                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                </Container>
            )
        }
        else {
            PostAddForm = (
                <Container>
                    <Row className="mt-5">
                        <Col md="12">
                        </Col>
                        <Col md="2">
                        </Col>
                        <Col md="8" className="shadow-lg mt-5center">
                            <h2 className="text-center text-success mb-3 mt-3">Select post Status</h2>
                            <Table bordered className="mt-5 mb-5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Status</th>
                                        <th>Status Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td onClick={() => this.setFormStatus('rent')}>Rent</td>
                                        <td>You can only post rented products!</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td onClick={() => this.setFormStatus('sale')}>Sale</td>
                                        <td>You can't post rented product here!</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col md="2"></Col>
                    </Row>
                </Container>
            )
        }
        return (
            <div>
                <Navbar dark expand="md" className="bg-color shadow-lg">
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            <h3 className="text-success" >
                                <img src={'/logo.svg'} style={{ width: '100%' }} />
                            </h3>
                        </NavbarBrand>
                    </Container>
                </Navbar>

                {PostAddForm}

                <NotificationContainer />
            </div>
        );
    }
}