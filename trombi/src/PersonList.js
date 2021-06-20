import './PersonList.css';
import './QRTooltip.css';
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
        jobs: PropTypes.object,
        struct: PropTypes.string,
        sortby: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            link: '',
        }
    }

    /**
     * Exécuté 1 fois après le montage du composant
     */
    componentDidMount() {
        this.setState({
            link: createLink(this.props.struct),
            isLoaded: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // on va chercher toutes les personnes, on les stocke dans la propriété items

        console.log("PersonList.componentDidUpdate state.isLoaded  = " + this.state.isLoaded);
        console.log("PersonList.componentDidUpdate props.name      = " + this.props.name);
        console.log("PersonList.componentDidUpdate props.firstName = " + this.props.firstname);
        console.log("PersonList.componentDidUpdate props.jobs      = " + this.props.jobs);
        console.log("PersonList.componentDidUpdate props.struct    = " + this.props.struct);
        console.log("PersonList.componentDidUpdate props.sortby    = " + this.props.sortby);

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic d3N1c2VyOnYzS2Vub2JpIQ==");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let url = createLink(this.props.struct);
        console.log("PersonList.componentDidUpdate url            = " + url);

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

        if ( (!isLoaded) ) {
            // on retourne chargement en cours
            return <div className="App">Chargement...<CircularProgress/></div>;
        } else {
            // on filtre la liste en fonction des propriétés reçues
            console.log("PersonList.render() : "
                + this.props.name.toLocaleLowerCase() + ","
                + this.props.firstname.toLowerCase() + ","
                + this.props.jobs + ","
                + this.props.struct + ","
                + this.props.sortby + ")");

            let listeFiltree = filtrerPersonnes(items,
                this.props.name.toLocaleLowerCase(),
                this.props.firstname.toLowerCase(),
                this.props.jobs,
                this.props.sortby);

            if (listeFiltree.length === 0) {
                // console.log("PersonList.render() : Listefiltree est vide");
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


