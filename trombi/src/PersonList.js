import './PersonList.css';
import './tooltip.css';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from "prop-types";
import filtrerPersonnes from "./FiltrerPersonnes";
import PersonCard from "./PersonCard";


function createLink(endurl) {
    return "https://webservices.utc.fr/api/v1/trombi/" + endurl;
}

export default class PersonList extends React.Component {


    static propTypes = {
        name: PropTypes.string,
        firstname: PropTypes.string,
        job: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            link: '',
        }
    }

    show_tooltip(id) {
        console.log("show_tooltip : " + id);
        var elem = document.getElementById(id);
        elem.style.visibility = "visible";
    }

    componentDidMount() {
        this.setState({link: createLink(this.props.struct)})
    }

    componentDidUpdate() {

        // on va chercher toutes les personnes, on les stocke dans la propriété items

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic d3N1c2VyOnYzS2Vub2JpIQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let url = createLink(this.props.struct);
        console.log("isLoaded = " + this.state.isLoaded);
        console.log("URL : " + url);
        fetch(createLink(this.props.struct), requestOptions)
            .then(response => response.json())
            .then(json => {
                for (var i = 0; i < json.length; i++) {
                    json[i].id = i;
                }
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }

    render() {

        let {isLoaded, items} = this.state;

        if (!isLoaded) {
            // on retourne chargement en cours
            return <div className="App">Chargement...<CircularProgress/></div>;
        } else {
            // on filtre la liste en fonction des propriétés reçues
            let searchName = this.props.name.toLocaleLowerCase();
            let searchFirstname = this.props.firstname.toLowerCase();
            let searchJob = this.props.job.toLowerCase();
            let searchSortby = this.props.sortby;

            console.log("PersonList.render() : " + searchName + "," + searchFirstname + "," + searchJob + ")");

            let listeFiltree = filtrerPersonnes(items, searchName, searchFirstname, searchJob, searchSortby);

            if (listeFiltree.length === 0) {
                console.log("PersonList.render() : " + "Listefiltree est vide");
                // on retourne pas de résultat
                return (
                    <div className="no-result">
                        Aucun résultat
                    </div>);
            } else {
                // on retourne la liste
                return (

                    <div className="Person">
                        <ul className="no-bullets">
                            <div className="flex-container">
                                {listeFiltree.map((item) => (
                                    <div key={'div_1_' + item.id}>
                                        <PersonCard item={item}></PersonCard>
                                    </div>

                                ))}
                            </div>
                        </ul>

                    </div>
                );
            }
        }
    }
}


