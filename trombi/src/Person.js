import './App.css';
import React from 'react';

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
            return <div className="App">Loading...</div>;
        }

        else {
            return(
                <div className="App">
                    <h1>Data has been loaded</h1>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                 Name : {item.nomp} | Email : {item.mail}
                            </li>
                        ))};
                    </ul>

                </div>
            );
        }

    }
}

export default Person;
