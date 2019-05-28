import React, { Component } from 'react';

import Axios from 'axios';
import {Link} from 'react-router-dom';

import Cat from '../cat/cat';

import {API_URI} from '../../config';
const CATS_ENDPOIT = API_URI + "/cats";

class Cats extends Component {

    state = {
        cats: []
    }

    componentDidMount() {
        this.getCats();
    }

    getCats() {
        Axios.get(CATS_ENDPOIT)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        cats: response.data
                    });
                } else {
                    throw Error;
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ cats: null });
            });
    }
    
    render() {
        return (
            <div>
                <h4>Your Cats</h4>
                <div className="fixed-action-btn">
                    <Link to="/manage_pet?type=cat" className="btn-floating btn-large teal">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
                <div className="row">
                    {this.state.cats && this.state.cats.map(cat => {
                        return <Cat getCats={this.getCats.bind(this)} cat={cat} key={cat._id}></Cat>
                    })}
                </div>
            </div>
        );
    }
}

export default Cats;