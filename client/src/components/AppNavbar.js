import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Container, Row, Col
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faDesktop, faClinicMedical,  faHome, faProjectDiagram, faRunning, faSmileBeam, faCouch } from '@fortawesome/free-solid-svg-icons'
import {NotificationContainer, NotificationManager} from 'react-notifications';
// please uninstall 'react-select' from package.json file;
// CSS
import './AppNavbar.css'
// Components
import Login from './Login'

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            model: false,
            icon: [faCar, faDesktop, faClinicMedical, faRunning, faSmileBeam, faCouch],
            iconText: ['Automobile', 'Electronics', 'Medicine', 'Sports', 'Fashion', 'Furniture'],
            selectedOption: null,
            status: 'locked',
            category: '',
            product_data: [],
            isSearch: '',
            location: '',
            storageToken: JSON.parse(localStorage.getItem('react_login_app')),
            favListing: []

        };
    }

    // componentDidMount() {
    //     if (localStorage.getItem('token')) {
    //         console.log("status open")
    //         this.setState({ status: 'open' })
    //     }
    // }

    async componentDidMount() {
        let token = this.state.storageToken
        if (token) {
            let id = token.userId
            await axios
              .post('api/users/findfavlisting', { id })
              .then(res => {
                // console.log("Reviews Api result is", res);
                if(res.data.success)
                this.setState({
                    favListing: res.data.favCard,
                })
              })
        }
      }

    modelOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async searchProduct() {
        let searchData = {
            projectCategory: this.state.category,
            location : this.state.location
        }
        console.log("Search Data is = ", {searchData})
        await axios
            .post('api/Users/searchpostwithlocation', {searchData})
            .then(res => {
                console.log("search result", res);
                this.setState({
                    product_data: res.data.PostResult,
                    isSearch: res.data.success
                })
                // data_success = res.data.success;
                // data_error = res.data.message;
            })
    }
    //show favourite listing 
    favListing =() =>{
        let token = this.state.storageToken
        if(token){
            this.props.history.push({
                pathname: '/favouritelistings',
                state: { favlisting: this.state.favListing }
            })
        }
        else{
            NotificationManager.info('Please Login First');
        }
    }
    postAddForm = () => {
        if(this.state.storageToken){
            this.props.history.push('/postadd')
        }
        else{
            NotificationManager.info('Please Login First');
        }
    }

    render() {

        const styles = {
            header: {
                // https://imagescdn.dealercarsearch.com/dealerimages/10071/22089/fx2.jpg
                backgroundImage: `url(https://admin.acceleratingscience.com/materials/wp-content/uploads/sites/7/2017/03/istock-525969104_electronics-4.jpg)`,
                height: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            },

            content: {
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },

            cardIcon: {
                width: '120px',
                height: '100px',
                backgroundColor: '#000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Fira Sans, sans-serif'
            },
        }
        
        const { iconText } = this.state;

        let textList = iconText.length > 0
            && iconText.map((item, i) => {
                return (
                    <option key={i} value={item}>{item}</option>
                )
            }, this);

        return (
            <div>
                <div>
                    <Navbar dark expand="md" className="bg-color">
                        <Container>
                            <NavbarBrand tag={Link} to="/">
                                <img src={'/logo.svg'} style={{width: '100%'}}/>
                                {/* <h3 className="text-success" > <FontAwesomeIcon icon={faTruckMonster} size="1x" />&nbsp; RENTIFY BY AQIB</h3> */}
                            </NavbarBrand>
                            <NavbarToggler onClick={this.modelOpen} className="bg-dark ml-auto"/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-md-auto ml-right" navbar>
                                <NavItem>
                                        <Button className="mr-md-3 mr-2" size="sm" onClick={this.favListing} color="success">Favourite Listing</Button>{' '}
                                        {/* <NavLink tag={Link} disabled={localStorage.getItem('react_login_app')? false : true} to="/page">Page</NavLink> */}
                                    </NavItem>
                                    <NavItem>
                                        <Button className="mr-md-3 mr-2" size="sm" onClick={this.postAddForm} color="success">POST AD</Button>{' '}
                                        {/* <NavLink tag={Link} disabled={localStorage.getItem('react_login_app')? false : true} to="/page">Page</NavLink> */}
                                    </NavItem>
                                    <NavItem>
                                        <Login />
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className="m-0 p-0">
                    <div style={styles.header}>
                        <div style={styles.content}>
                            <Container>
                                <Row>
                                    <Col sm="8" md="8" className="mt-md-5 mb-md-3 mt-4 mb-1">
                                        <h4 className="text-white text-left" style={{ fontSize: '150%' }}> Check out ads submitted by our members and join us today
                                         </h4>
                                        <p className="text-secondary text-left">Browse from more than 15,000 adverts while new ones come on daily bassis</p>
                                        <h1 className="text-white text-left m-0 p-0 ">- - -</h1>
                                        <Row className="mt-5">
                                            <Col xs="12" md="8">
                                                <Row>
                                                    {this.state.icon.map((iconName, idx) => {
                                                        return (
                                                            <Col className="mt-md-4 mt-2 mb-md-2 mb-3" xs="6" sm="5" md="4">
                                                                <Link to={{ pathname: '/showcategory', category: this.state.iconText[idx]}}>
                                                                    <div style={styles.cardIcon}>
                                                                        <h3 className="text-success"><FontAwesomeIcon icon={iconName} /></h3>
                                                                        <p className="text-white">{this.state.iconText[idx]}</p>
                                                                    </div>
                                                                </Link>
                                                            </Col>
                                                        )
                                                    })}
                                                </Row>
                                            </Col>
                                            <Col md="6"></Col>

                                        </Row>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default withRouter(AppNavbar);