import React from "react";
import "./Form.css"
import filtrerPersonnes from "./FiltrerPersonnes";
import PropTypes from "prop-types";

export default class FormPerson extends React.Component{

    static propTypes = {
        formChange: PropTypes.func
    };

    /**
     * constructeur
     *
     * propriétés de l'objet
     * name
     * firstname
     * job
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstname: '',
            job: '',
            struct: '',
            sortby: 'nom',
        };
        //Remarque : Attention shallow Copy VS deep Copy ???
        this.stateDefault=this.state;
    }

    /**
     * Gestionnaire du changement sur les champs
     * Fonction flêchée : Nécessaire si l'on souhaite que le this dans handleChange corresponde à notre Component
     * Sinon dans le constructor this.handleChange = this.handleChange.bind(this);
     * @param event
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //Nécessaire de mettre setState sinon il ne se passe rien à l'affichage au niveau des modifications...
        this.setState({
            [name]: value
        });
    }

    /**
     * Gestionnaire du submit
     *
     * @param event
     *
     */
    handleSubmit = (event) => {

        console.log("FormPerson.handleSubmit()");

        //empêcher la submission du formulaire et d'avoir http://localhost:3000/?name=Jean&firstname=Dupont
        event.preventDefault();

        console.log("FormPerson.handleSubmit(), voici mon état lors de la validation");
        console.log(this.state);

        this.props.formChange(this.state);
    }

    /**
     *
     * Gestionnaire du cancel
     * on utilise un callback pour être sur que la mise à jour de l'état est réalisée avant
     * l'appel à la fonction de changement de formulaire
     *
     * @param event
     */
    handleCancel = (event) => {

        event.preventDefault();

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );

        // méthode pour que l'état soit mis à jour immédiatement
        this.setState( () => {
            return this.stateDefault;
        }, () => {
            //console.log("FormPerson.handleCancel(), Retour à l'état par défaut");
            //console.log("FormPerson.handleCancel(), this.state="+this.state);
            this.props.formChange(this.state)})
    }

    /**
     * render du formuaire
     *
     * @returns {JSX.Element}
     */
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
                        <label>Fonction :</label>
                    </div>
                    <div className="col-75">
                        <select
                            name="job"
                            value={this.state.job}
                            onChange={this.handleChange}>
                            <option value="empty"></option>
                            <option value="Enseignant">Enseignant</option>
                            <option value="Chercheur">Chercheur</option>
                            <option value="Doctorant">Doctorant</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Structure :</label>
                    </div>
                    <div className="col-75">
                        <select
                            name="struct"
                            value={this.state.struct}
                            onChange={this.handleChange}
                        >
                            <option value="empty"></option>
                            <option value="heuristique">Heudiasyc</option>
                            <option value="math">LMAC</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Trier par :</label>
                    </div>
                    <div className="col-75">
                        <select
                            name="sortby"
                            value={this.state.sortby}
                            onChange={this.handleChange}>
                            <option value="nomAz">Nom</option>
                            <option value="prenomAz">Prénom</option>
                            <option value="fonction">Fonction</option>
                            <option value="structLibelleFils">Structure</option>
                        </select>
                    </div>
                </div>

                <div className="input_buttons">
                <input
                    type="submit"
                    value="Valider"
                    onClick={this.handleSubmit}
                />

                <input
                    type="reset"
                    value="Annuler"
                    onClick={this.handleCancel}
                />
                </div>
            </form>
        );
    }
}

