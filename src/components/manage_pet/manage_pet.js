import React, { Component } from 'react';

import queryString from 'query-string'
import axios from 'axios';

import { API_URI } from '../../config';
const DOGS_ENDPOINT = API_URI + "/dogs";
const CATS_ENDPOINT = API_URI + "/cats";

class ManagePet extends Component {

    state = {
        name: '',
        age: '',
        breed: '',
        id: '',
        type: ''
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        this.setState({ type: qs.type });
        const id = this.props.match.params.id;
        if (id) {
            this.setState({ id: id });
                axios.get((qs.type === "dog" ? DOGS_ENDPOINT : CATS_ENDPOINT) + '/' + id)
                    .then(response => {
                        this.setState({
                            name: response.data.name,
                            breed: response.data.breed,
                            age: response.data.age
                        });
                        if (response.status !== 200) {
                            console.log(response);
                            alert("Error while trying to get you Pet.");
                        }
                    })
                    .catch(err => {
                        this.setState({
                            name: '',
                            breed: '',
                            age: '',
                        });
                        console.log(err);
                        alert("Error while trying to get you Pet.");
                    });
        }
    }

    onInputChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        switch (id) {
            case "name_input":
                this.setState({ name: value });
                break;
            case "breed_input":
                this.setState({ breed: value });
                break;
            case "age_input":
                this.setState({ age: value });
                break;
            default:
                break;
        }
        if (id === "name_input") {
        } else if (id === "ageInput") {
            this.setState({ age: value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.breed === '' || this.props.age === '') {
            alert("All fields are requiered");
        } else {
            let pet = {
                name: this.state.name,
                breed: this.state.breed,
                age: this.state.age
            }
            const api_endpoint = this.state.type === "dog" ? DOGS_ENDPOINT : CATS_ENDPOINT;
            const location = this.state.type === "dog" ? "/dogs" : "/cats";
            if (!this.state.id) {
                axios.post(api_endpoint, pet)
                    .then((response) => {
                        if (response.status !== 200) {
                            console.log("Error while trying to add the Pet: ", response);
                        } else {
                            this.setState({ name: '', breed: '', age: '' });
                        }
                        this.props.history.push(location);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                axios.put(api_endpoint + '/' + this.props.match.params.id, pet)
                    .then(response => {
                        if (response.status !== 200) {
                            console.log("Error while trying to edit the Dog: ", response);
                        } else {
                            this.setState({ name: '', breed: '', age: '' });
                        }
                        this.props.history.push(location)
                    })
                    .catch(err => {
                        alert("Error while trying to edit the Dog. Please try again or later.");
                    });
            }
        }
    }

    render() {

        let column;
        const isEdit = this.props.match.params.id;
        if (isEdit) {
            column = <div style={{ paddingTop: "6%" }} className="col s6 m6 l4 xl4 offset-m3 offset-s3">
                        <img style={{ borderRadius: "50%", width: "100%" }} src="https://lorempixel.com/200/200/animals" alt="" />
                    </div>;
        }

        return (
            <div className="row">
                <div className="col s12 m8 l6 xl6 offset-m2 offset-l3 offset-xl3">
                    <form className="col s12" onSubmit={this.onSubmit}>
                        <div className="row">
                            {column}
                            <div className={isEdit ? "col s12 m12 l8 xl8" : "col s12 m12 l12 xl12"}>
                                <div className="row">
                                    <div className="row">
                                        <div className="input-field col s12 m12 l12 xl12">
                                            <i className={this.state.type === "dog" ? "material-icons prefix fas fa-dog" : "material-icons prefix fas fa-cat"}></i>
                                            <input onChange={this.onInputChange} placeholder="" value={this.state.name} id="name_input" type="text" className="validate" />
                                            <label htmlFor="name_input">Name</label>
                                        </div>
                                        <div className="input-field col col s12 m12 l12 xl12">
                                            <input onChange={this.onInputChange} placeholder="" value={this.state.breed} id="breed_input" type="text" className="validate" />
                                            <label htmlFor="breed_input">Breed</label>
                                        </div>
                                        <div className="input-field col col s12 m12 l12 xl12">
                                            <input onChange={this.onInputChange} placeholder="" value={this.state.age} id="age_input" type="number" className="validate" />
                                            <label htmlFor="age_input">Age</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {isEdit &&
                                <div className="col s6 m6 l4 xl4 offset-s3 offset-m3">
                                </div>
                            }
                            <div className={isEdit ? "col s12 m12 l8 xl12 center-align" : "col s12 m12 l12 xl12 center-align"}>
                                <button className="btn waves-effect waves-light teal accent-3" type="submit">
                                    Save
                                    <i className="material-icons right">save</i>
                                </button>
                                <button onClick={() => { this.props.history.push(this.state.type === "dog" ? "/dogs" : "/cats"); }} style={{ marginLeft: "4%" }} className="btn waves-effect waves-light red">
                                    Cancel
                                    <i className="material-icons right">cancel</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ManagePet;