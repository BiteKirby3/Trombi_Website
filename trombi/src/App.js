import './App.css';
import React, { PureComponent } from "react";
import Person from "./Person";
import Header from "./Header";
import SimpleTabs from "./SimpleTabs";
import filtrerPersonnes from "./FiltrerPersonnes";
import FormPerson from "./FormPerson";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname:'',
            job:'',
            struct: '',
            sortby: 'nomAz',
        };
    }

    handleSearchChange = (state) => {

        console.log ("app.js->handleSearchChange(), this.state=" + state.name + "/" + state.firstname + "/" + state.job);

        this.setState({
            name: state.name,
            firstname: state.firstname,
            job: state.job,
            struct: state.struct,
            sortby: state.sortby,
        });
    };

    render() {
        return (
            <div>
                <Header />
                <FormPerson formChange={this.handleSearchChange} />
                <Person name={this.state.name} firstname={this.state.firstname} job={this.state.job} struct={this.state.struct} sortby={this.state.sortby}/>
            </div>
        );
    }
}