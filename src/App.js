import React from 'react';
import './App.css';

// Utilities
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Navbar from './components/navbar/navbar';
import Index from './components/index/index';
import Dogs from './components/dogs/dogs';
import Cats from './components/cats/cats';
import ManagePet from './components/manage_pet/manage_pet';

function App() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Router>
            <Navbar></Navbar>
            <div id="routes-container" style={{ padding: "2% 2%", width: "100%", flexGrow: "1" }}>
                <Route path="/" exact component={Index}></Route>
                <Route path="/dogs" exact component={Dogs}></Route>
                <Route path="/cats" exact component={Cats}></Route>
                <Route path="/manage_pet/:id" exact component={ManagePet}></Route>
                <Route path="/manage_pet/" exact component={ManagePet}></Route>
            </div>
        </Router>
    </div>
  );
}

export default App;
