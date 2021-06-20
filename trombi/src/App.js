import './App.css';
import React from "react";
import PersonList from "./PersonList";
import Header from "./Header";
import Form from "./Form";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname:'',
            jobs: new Set(['E','C','I','A']),
            struct: 'gi',
            sortby: 'nomAz',
            listOfPersons: [],
        };
    }

    handleSearchChange = (Formstate) => {

        console.log ("app.js handleSearchChange(), this.state=" + Formstate.name + "/" + Formstate.firstname + "/" + Formstate.jobs + "/" + Formstate.struct);

        this.setState({
            name: Formstate.name,
            firstname: Formstate.firstname,
            jobs: Formstate.jobs,
            struct: Formstate.struct,
            sortby: Formstate.sortby,
        });
    };

    render() {
        return (
            <div>
                <Header />
                <Form formChange={this.handleSearchChange} />
                <PersonList name={this.state.name} firstname={this.state.firstname} jobs={this.state.jobs} struct={this.state.struct} sortby={this.state.sortby}/>
            </div>
        );
    }
}

