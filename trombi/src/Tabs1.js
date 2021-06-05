import React, { useState } from "react";
import FormPerson from "./FormPerson";
import FormStructure from "./FormStructure";
import "./Tabs.css"

class Tabs1 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            toggleState: 0,
        };
    }

    toggleTab = (index) => {
        this.setState({
            toggleState: index
        });
    };

    render(){
        return(
            <div className="containerTabs">
                <div className="bloc-tabs">
                    <button
                        className={this.state.toggleState === 0 ? "tabs active-tabs" : "tabs"}
                        onClick={() => this.toggleTab(0)}
                    >
                        <h3>Recherche par Individu</h3>
                    </button>
                    <button
                        className={this.state.toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => this.toggleTab(1)}
                    >
                        <h3>Recherche par Structure</h3>
                    </button>
                </div>

                <div className="content-tabs">
                    <div
                        className={this.state.toggleState === 0 ? "content  active-content" : "content"}
                    >
                        <FormPerson/>
                    </div>

                    <div
                        className={this.state.toggleState === 1 ? "content  active-content" : "content"}
                    >
                        <FormStructure/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Tabs1;