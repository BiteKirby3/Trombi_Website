import './App.css';
import React from 'react';
import QRCode from "./QRCode";


class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            items:[],
        }
        this.componentDidMount("https://webservices.utc.fr/api/v1/trombi/gi");
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
            return <div className="App">Chargement...</div>;
        }

        else {
            return(
                <div className="App">
                    <h1>Trombi GI</h1>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                Email QrCode: <QRCode dataFromPerson = {item.mail} /> Tele QrCode: <QRCode dataFromPerson = {item.telPoste1} /> | Name : {item.nomp} | Email : {item.mail} | Tel :  {item.telPoste1} |<img className="photo_trombi" src={`data:image/jpg;base64,${item.photo}`} alt={`Photo de ${item.nomp}`}/>
                            </li>
                        ))}
                    </ul>

                </div>
            );
        }

    }  
}

export default Person;
