import React, { Component } from 'react';

import './index.css';

class Index extends Component {
    render() {
        return (
            <div id="index-container">
                <section>
                    <header className="row">
                        <div className="col s6 offset-s1">
                            <h1>
                                Welcome to Pets!
                                <br/>
                                You can add your dogs and cats in this catalogue.
                            </h1>
                        </div>
                    </header>
                    <footer className="row">
                        <div className="col s6 offset-s1 grey-text text-darken-3">
                            <div style={{ backgroundColor: "black", width: "fit-content", borderRadius: "10px", padding: "1%"}}>
                                <img width="110px" height="50px" src="https://devf-website-staging.s3.amazonaws.com/static/assets/img/logodevf.65819eb.png" />
                            </div>
                        </div>
                    </footer>
                </section>
            </div>
        );
    }
}

export default Index;