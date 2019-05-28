import React, { Component } from 'react';

import Axios from 'axios';
import {Link} from 'react-router-dom';

import Dog from '../dog/dog';

import {API_URI} from '../../config';
const DOGS_ENDPOIT = API_URI + "/dogs";

class Dogs extends Component {

    state = {
        dogs: []
    }

    componentDidMount() {
        this.getDogs();
    }

    getDogs() {
        Axios.get(DOGS_ENDPOIT)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        dogs: response.data
                    });
                } else {
                    throw Error;
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({ dogs: null });
            });
    }
    
    render() {
        return (
            <div>
                <h4>Your Dogs</h4>
                <div className="fixed-action-btn">
                    <Link to="/manage_pet?type=dog" className="btn-floating btn-large teal">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
                <div className="row">
                    {this.state.dogs && this.state.dogs.map(dog => {
                        return <Dog getDogs={this.getDogs.bind(this)} dog={dog} key={dog._id}></Dog>
                    })}
                </div>
            </div>
        );
    }
}

export default Dogs;