import './App.css';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const link="https://webservices.utc.fr/api/v1/trombi/gi";

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
    //Email : <QRCode dataFromPerson = {item.mail} />
    //<QRCode dataFromPerson = {item.telPoste1} />
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
                                        <img className="photo_trombi" src={`data:image/jpg;base64,${item.photo}`} alt="mypic"/>
                                    ) ||
                                    <img className="photo_trombi" src={process.env.PUBLIC_URL + "/user_black_logo.png"} alt="mypic"/>
                                }
                                <h3>{item.nomp}</h3>
                                <img className="icon_email" src={process.env.PUBLIC_URL + "/email.png"} alt="mypic"/> {item.mail}
                                <br></br>
                                <img className="icon_phone" src={process.env.PUBLIC_URL + "/phone.png"} alt="mypic"/>
                                {
                                    (
                                        item.telPoste1 && <div>{item.telPoste1}</div>
                                    ) || <div>Pas de poste</div>
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
