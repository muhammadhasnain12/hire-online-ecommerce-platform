import React, { Component } from 'react';
import {Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons"
import { faTruckMonster } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'

class BikeListings extends Component {
  render() {
    const styles = {
      text: {
        fontSize: '30px',
        fontWeight: '700',
        fontFamily: 'Fira Sans, sans-serif'
      },
      bgColor: {
        backgroundColor: '#000000',
    },
    }
    return (
      <div>

        <Row className="mt-5" style={styles.bgColor}>
          <Col sm="1" md="1" className="mt-5">
          </Col>
          <Col sm="4" md="4">
            <h3 className="text-white ml-md-0 ml-5 mt-5 text-left" style={styles.text}> HireOnline</h3>
            <p className="text-white text-justify mt-5 ml-md-0 ml-5 m-md-0 m-2 text-left">Just another classified website, where customers can turn their liabilities into paying assets by renting out their liable stuff with ability to secure their rental transactions with easy rental agreements.</p>
          </Col>
          <Col sm="6" md="6">
            <h3 className="text-white mt-md-5 mt-3 p-md-0 p-3" style={styles.text}>Follow Us:</h3>
            <FontAwesomeIcon className="m-2" color="white" icon={faFacebookSquare} size="2x" />
            <FontAwesomeIcon className="m-2" color="white" icon={faTwitterSquare} size="2x" />
            <FontAwesomeIcon className="m-2" color="white" icon={faInstagramSquare} size="2x" />
            <FontAwesomeIcon className="m-2" color="white" icon={faYoutubeSquare} size="2x" />
          </Col>
          <Col sm="1" md="1" className="mt-5">

          </Col>
          <Col sm="4" md="4" className="mt-md-5 mt-3 mb-3">
            <a href="#" className="text-success p-2 pl-md-5 ml-md-5">Term of use</a>
            <a href="#" className="text-success p-2">privacy Policy</a>
            <a href="#" className="text-success p-2">Disclaimer Policy</a>
            <a href="#" className="text-success p-2">Blog</a>
          </Col>
          <Col sm="6" md="6" className="mt-5">
          </Col>
        </Row>

      </div >

    );
  }
}
export default withRouter(BikeListings);