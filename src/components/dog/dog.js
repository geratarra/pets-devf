import React, { Component } from 'react';

import axios from 'axios';

import { API_URI } from '../../config';
const DOGS_ENDPOIT = API_URI + "/dogs";

class Dog extends Component {

    removeDog(id) {
        axios.delete(DOGS_ENDPOIT + '/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.props.getDogs();
                } else {
                    alert("Error while trying to remove the Dog.");
                    console.log(response);
                }
            })
            .catch(err => {
                alert("Error while trying to remove the Dog.");
                console.log(err);
            });
    }
    
    render() {
        return (
            <div className="col s12 m6 l4 xl4">
                <div className="card horizontal">
                    <div className="card-image">
                        <img style={{ height: "100%" }} alt="dog" src={"https://lorempixel.com/200/200/animals/" + Math.floor(Math.random() * 10)} />
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <p><span style={{ fontWeight: "bold" }}>Name:&nbsp; </span>{this.props.dog.name}</p>
                            <p><span style={{ fontWeight: "bold" }}>Breed:&nbsp; </span>{this.props.dog.breed}</p>
                            <p><span style={{ fontWeight: "bold" }}>Age:&nbsp; </span>{this.props.dog.age}</p>
                        </div>
                        <div className="card-action">
                            <a className="teal-text accent-2" href={"/manage_pet/" + this.props.dog._id + "?type=dog"}>EDIT</a>
                            <i onClick={() => {this.removeDog(this.props.dog._id)}} style={{ verticalAlign: "middle", cursor: "pointer" }} className="material-icons red-text text-accent-3">delete</i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
        
export default Dog;