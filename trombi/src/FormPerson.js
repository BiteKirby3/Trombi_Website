import React from "react";
import ReactDOM from "react-dom";
import "./Form.css"

class FormPerson extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname: '',
            function: '',
        };
        //Remarque : Attention shallow Copy VS deep Copy ???
        this.stateDefault=this.state;
    }

    //Fonction flêchée : Nécessaire si l'on souhaite que le this dans handleChange corresponde à notre Component
    //Sinon dans le constructor this.handleChange = this.handleChange.bind(this);
    handleChange = (event) => {
        //console.log(this.state)
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //Nécessaire de mettre setState sinon il ne se passe rien à l'affichage au niveau des modifications...
        this.setState({
            [name]: value
        });
        //console.log(this.state)
    }

    handleSubmit = (event) => {
        //empêcher la submission du formulaire et d'avoir http://localhost:3000/?name=Jean&firstname=Dupont
        event.preventDefault();
        console.log("voici mon état lors de la validation");
        console.log(this.state);
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.setState(this.stateDefault);
        console.log("Retour à l'état par défaut");
        //Pq on ne voit pas la modif tout de suite ?
        console.log(this.state);
    }

    render(){
        return (
            <form>
                <div className="row">
                    <div className="col-25">
                        <label>Nom :</label>
                    </div>
                    <div className="col-75">
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Prénom :</label>
                    </div>
                    <div className="col-75">
                        <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Fonction:</label>
                    </div>
                    <div className="col-75">
                        <select
                            name="function"
                            value={this.state.function}
                            onChange={this.handleChange}
                        >
                            <option value="empty"></option>
                            <option value="Enseignant">Enseignant</option>
                            <option value="Chercheur">Chercheur</option>
                            <option value="Doctorant">Doctorant</option>
                        </select>
                    </div>
                </div>


                <input
                    type="submit"
                    value="Submit"
                    onClick={this.handleSubmit}
                />

                <input
                    type="reset"
                    value="Cancel"
                    onClick={this.handleCancel}
                />

            </form>
        );
    }
}

export default FormPerson;