import React from "react";

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname: '',
            function: 'Enseignant',
            laboratory: 'Heudiasyc'
        };
        //Remarque : Attention shallow Copy VS deep Copy ???
        this.stateDefault=this.state;

        //Nécessaire si l'on souhaite que le this dans handleChange corresponde à notre Component
        //Ou alors définir les fonctions en flêché
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event){
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

    handleSubmit(event){
        //empêcher la submission du formulaire et d'avoir http://localhost:3000/?name=Jean&firstname=Dupont
        event.preventDefault();
        console.log("voici mon état lors de la validation");
        console.log(this.state);
    }

    handleCancel(event){
        event.preventDefault();
        this.setState(this.stateDefault);
        console.log("Retour à l'état par défaut");
        //Pq on ne voit pas la modif tout de suite ?
        console.log(this.state);
    }

    render(){
        return (
            <form>
                <fieldset>
                    <legend>Filtre par individu</legend>
                    <label>Nom :
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <label>Prénom :
                        <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                        />
                    </label>
                </fieldset>

                <fieldset>
                    <legend>Filtre par catégorie</legend>

                    <label>
                        Fonction:
                        <select
                            name="function"
                            value={this.state.function}
                            onChange={this.handleChange}>
                            <option value="Enseignant">Enseignant</option>
                            <option value="Chercheur">Chercheur</option>
                            <option value="Doctorant">Doctorant</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Laboratoire:
                        <select
                            name="laboratory"
                            value={this.state.laboratory}
                            onChange={this.handleChange}>
                            <option value="Heudiasyc">Heudiasyc</option>
                            <option value="LMAC">LMAC</option>
                        </select>
                    </label>

                </fieldset>

                <input
                    type="submit"
                    value="Submit"
                    onClick={this.handleSubmit}
                />
                <input
                    type="submit"
                    value="Cancel"
                    onClick={this.handleCancel}/>
            </form>
        );
    }
}

export default Form;