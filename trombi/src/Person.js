import './App.css';
import './tooltip.css';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import QRCode from "./QRCode";

const link="https://webservices.utc.fr/api/v1/trombi/gi?name=ab";

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            items:[],
        }
        //Renvoie par défaut l'ensemble du trombinoscope
        this.componentDidMount(link);
    }
    componentDidMount(link) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic d3N1c2VyOnYzS2Vub2JpIQ==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(link, requestOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded:true,
                    items:json,
                })
            });
    }

    show_tooltip(id) {
        console.log("show_tooltip : "+id);
        var elem=document.getElementById(id);
        elem.style.visibility="visible";
        return;

    }

    hide_tooltip(id) {
        console.log("show_tooltip : "+id);
        var elem=document.getElementById(id);
        elem.style.visibility="hidden";
        return;

    }

    render() {
        var { isLoaded, items } = this.state;
        console.log(isLoaded);

        if (!isLoaded) {
            return <div className="App">Chargement...<CircularProgress/></div>;
        }

        else {
            return(
                <div className="Person">
                    <div className="flex-container">
                        {items.map(item => (
                            <div>
                            <ul className="no-bullets">
                            <li key={item.id}>
                                {
                                    (
                                        item.photo &&
                                        <div className="tooltip"><img className="photo_trombi" src={`data:image/jpg;base64,${item.photo}`} alt="Fetched pic" onClick={()=>this.show_tooltip(item.mail)}/>
                                            <span className="tooltiptext" id={item.mail} onClick={()=>this.hide_tooltip(item.mail)}>{item.mail} <QRCode dataFromPerson = {item.mail} /></span>
                                        </div>
                                    ) ||
                                    <img className="photo_trombi" src={process.env.PUBLIC_URL + "/user_black_logo.png"} alt="No pic available"/>
                                }
                                <h3>{item.nomp}</h3>
                                <img className="icon_email" src={process.env.PUBLIC_URL + "/email.png"} alt="Email icon"/> {item.mail} <QRCode dataFromPerson = {item.mail} />
                                <br></br>
                                {
                                    (
                                        item.telPoste1 && <div><img className="icon_phone" src={process.env.PUBLIC_URL + "/phone.png"} alt="Phone icon"/>{item.telPoste1} <QRCode dataFromPerson = {item.telPoste1} /></div>
                                    ) || <div><img className="icon_phone" src={process.env.PUBLIC_URL + "/no_phone.png"} alt="No Phone"/> <div className="QRCode"><img width='150px' height='auto' src={process.env.PUBLIC_URL + "/shim.png"} alt="No Phone QRCode"/></div></div>
                                }
                                Fonction : {item.fonction}
                            </li>
                            </ul>
                            </div>
                        ))}
                    </div>

                </div>
            );
        }

    }
}

export default Person;
