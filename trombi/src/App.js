import './App.css';
import React from "react";
import PersonList from "./PersonList";
import Header from "./Header";
import Form from "./Form";
import myLog from "./MyLogger";

function createLink(endurl) {
    return "https://webservices.utc.fr/api/v1/trombi/" + endurl;
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname: '',
            jobs: new Set(['E', 'C', 'I', 'A']),
            struct: 'gi',
            sortby: 'nomAz',
            listOfPersons: [],
            isLoaded: false,
            err_msg: '',
        };
    }

    componentDidMount() {
        // initialisation de la liste avec les GI
        myLog("app.js - componentDidMount")
        this.getListOfPersons('gi');
    }

    /***
     * Lecture de l'API
     * @param structure
     */
    getListOfPersons(structure) {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic d3N1c2VyOnYzS2Vub2JpIQ==");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let url = createLink(structure);
        myLog("PersonList.componentDidUpdate url            = " + url);

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw(response);
                }
            })
            .then(json => {
                for (var i = 0; i < json.length; i++) {
                    json[i].id = i;
                }
                this.setState({
                    listOfPersons: json,
                    isLoaded: true
                })
            })
            .catch(error => {
                myLog("Impossible de récupérer les données du trombinoscope !")
                this.setState( {
                    listOfPersons: [],
                    isLoaded:true,
                    err_msg:'Impossible de récupérer les données du trombinoscope !',
                })
            });
    }

    /**
     * Gestionnaire de changement du formulaire
     *
     * @param Formstate
     */
    handleSearchChange = (Formstate) => {

        myLog("app.js handleSearchChange(), this.state=" + Formstate.name + "/" + Formstate.firstname + "/" + Formstate.jobs + "/" + Formstate.struct);

        // ici on relit la liste si on a changé de structure

        if (this.state.struct !== Formstate.struct) {
            myLog('app.js - On a changé de structure, on relit');
            this.setState({isLoaded: false}); // on positionne isLoaded à false car on recharge la liste
            this.getListOfPersons(Formstate.struct);
        }
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
                <Header/>
                <Form formChange={this.handleSearchChange}/>
                <PersonList isLoaded={this.state.isLoaded} listOfPersons={this.state.listOfPersons} err_msg={this.state.err_msg}
                            name={this.state.name} firstname={this.state.firstname} jobs={this.state.jobs}
                            struct={this.state.struct} sortby={this.state.sortby}/>
            </div>
        );
    }
}

