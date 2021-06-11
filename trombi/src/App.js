import './App.css';
import React from "react";
import PersonList from "./PersonList";
import Header from "./Header";
import SimpleTabs from "./SimpleTabs";
import FormPerson from "./FormPerson";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname:'',
            job:'',
            struct: 'gi',
            sortby: 'nomAz',
        };
    }

    handleSearchChange = (Formstate) => {

        console.log ("app.js->handleSearchChange(), this.state=" + Formstate.name + "/" + Formstate.firstname + "/" + Formstate.job);

        this.setState({
            name: Formstate.name,
            firstname: Formstate.firstname,
            job: Formstate.job,
            struct: Formstate.struct,
            sortby: Formstate.sortby,
        });
    };

    render() {
        return (
            <div>
                <Header />
                <FormPerson formChange={this.handleSearchChange} />
                <PersonList name={this.state.name} firstname={this.state.firstname} job={this.state.job} struct={this.state.struct} sortby={this.state.sortby}/>
            </div>
        );
    }
}