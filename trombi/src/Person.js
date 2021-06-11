import './Person.css';
import './tooltip.css';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import QRCode from "./QRCode";
import PropTypes from "prop-types";
import filtrerPersonnes from "./FiltrerPersonnes";
import CustomizedDialogs from "./CustomizedDialogs";

let endurl="gi";
//                                                                                                           height='auto'
//                                                                                                           src={process.env.PUBLIC_URL + "/shim.png"}
//                                                                                                           alt="No Phone QRCode"/>
//                                                     </div>

export default class Person extends React.Component {


    static propTypes = {
        name: PropTypes.string,
        firstname: PropTypes.string,
        job: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            items: [],
            link:"https://webservices.utc.fr/api/v1/trombi/"+endurl,
        }
    }

    show_tooltip(id) {
        console.log("show_tooltip : "+id);
        var elem=document.getElementById(id);
        elem.style.visibility="visible";
    }

    hide_tooltip(id) {
        console.log("show_tooltip : "+id);
        var elem=document.getElementById(id);
        elem.style.visibility="hidden";
    }

    componentDidMount() {

        // on va chercher toutes les personnes, on les stocke dans la propriété items

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic d3N1c2VyOnYzS2Vub2JpIQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(this.state.link, requestOptions)
            .then(response => response.json())
            .then(json => {
                for (var i=0 ; i<json.length ; i++)
                {
                    json[i].id=i;
                }
                this.setState({
                    isLoaded:true,
                    items:json,
                })
            });
    }

    render() {

        let { isLoaded, items} = this.state;

        if (!isLoaded) {
            // on retourne chargement en cours
            return <div className="App">Chargement...<CircularProgress/></div>;
        }
        else {
            // on filtre la liste en fonction des propriétés reçues
            let searchName = this.props.name.toLocaleLowerCase();
            let searchFirstname = this.props.firstname.toLowerCase();
            let searchJob = this.props.job.toLowerCase();
            let searchStruct=this.props.struct;
            let searchSortby = this.props.sortby;

            console.log("Person.render() : " + searchName + "," + searchFirstname + "," + searchJob + ")");

            let listeFiltree = filtrerPersonnes(items, searchName, searchFirstname, searchJob, searchStruct, searchSortby);

            if (listeFiltree.length === 0) {
                console.log("Person.render() : " + "Listefiltree est vide");
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
                                        <li key={'li' + item.id}>
                                            {
                                                (
                                                    item.photo &&
                                                    <div key={'div_2_' + item.id} className="tooltip"><img
                                                        className="photo_trombi"
                                                        src={`data:image/jpg;base64,${item.photo}`} alt="Fetched pic"
                                                        onClick={() => this.show_tooltip(item.mail)}/>
                                                        <span className="tooltiptext" id={item.mail}
                                                              onClick={() => this.hide_tooltip(item.mail)}>{item.mail}</span>
                                                    </div>
                                                ) ||
                                                <img className="photo_trombi"
                                                     src={process.env.PUBLIC_URL + "/user_black_logo.png"}
                                                     alt="No pic available"/>
                                            }
                                            <h3>{item.nomp}</h3>
                                            <img className="icon_email" src={process.env.PUBLIC_URL + "/email.png"} alt="Email icon"/>
                                            <CustomizedDialogs dataFromPerson = {item.mail}></CustomizedDialogs>
                                            {
                                                (
                                                    item.telPoste1 && <div><img className="icon_phone" src={process.env.PUBLIC_URL + "/phone.png"} alt="Phone icon"/><CustomizedDialogs dataFromPerson = {item.telPoste1}></CustomizedDialogs></div>
                                                ) || <div><img className="icon_phone" src={process.env.PUBLIC_URL + "/no_phone.png"} alt="No Phone"/></div>
                                            }
                                            Fonction : {item.fonction}<br></br>
                                            Structure : {item.structLibelleFils}
                                        </li>
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


