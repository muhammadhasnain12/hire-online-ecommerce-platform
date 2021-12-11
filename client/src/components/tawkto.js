import React, { Component } from 'react';
import tawkTo from "tawkto-react";

const tawkToPropertyId = '608ab0bc62662a09efc3513d'

// Direct Chat Link
// https://tawk.to/chat/tawkToPropertyId/tawkToKey

const tawkToKey = '827b261eb33a566f71b5e54c5e1e58075edaa131'
export default class TawkTo extends Component {



    componentDidMount() {
        tawkTo(tawkToPropertyId, tawkToKey)
    }

    render() {

        return (
            <div></div>
        )
    }
}

