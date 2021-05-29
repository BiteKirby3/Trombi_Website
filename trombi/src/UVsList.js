import './App.css';
import React from 'react';

class  UVsList extends React.Component {
    render() {
        return (
            <div className="uvs-list">
                <h1>Liste des uvs pour {this.props.name}</h1>
                <ul>
                    <li>SR03</li>
                    <li>AI16</li>
                    <li>SR02</li>
                </ul>

            </div>
        );


    function getGI() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic d3N1c2VyOnYzS2Vub2Jp");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://webservices.utc.fr/api/v1/trombi/gi", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    }
}

export default UVsList