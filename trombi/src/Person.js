import './App.css';
import React from 'react';
import QRCode from "./QRCode";
import CircularProgress from '@material-ui/core/CircularProgress';

const link="https://webservices.utc.fr/api/v1/trombi/gi";

function rendered_header() {
    return "Hello World";
}
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
                                        <img className="photo_trombi" src={`data:image/jpg;base64,${item.photo}`}/>
                                    ) ||
                                    <img className="photo_trombi" src={process.env.PUBLIC_URL + "/user_black_logo.png"} alt="mypic"/>
                                }
                                <h3>{item.nomp}</h3>
                                Email : <QRCode dataFromPerson = {item.mail} /> {item.mail}
                                <br></br>Telephone : <QRCode dataFromPerson = {item.telPoste1} /> Poste : (034423){item.telPoste1}
                                <br></br>Fonction : {item.fonction}
                                <br></br>Laboratoire : {item.structLibelleFils}
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
