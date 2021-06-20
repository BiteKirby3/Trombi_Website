import React from "react";
import "./Form.css";
import PropTypes from "prop-types";

//npm install react-bootstrap bootstrap@5.0.1
import 'bootstrap/dist/css/bootstrap.min.css';

/* Remarque : Autre solution pour gérer les checkBoxes : //https://codesandbox.io/embed/6z8754nq1n*/

class Form extends React.Component{
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
            struct: 'gi',
            //contient les professions selectionnées par l'utilisateur. Par défaut, elles y sont toutes.
            jobs: new Set(['E','C','I','A']),
            name: '',
            firstname: '',
            sortby: 'Nom',
        };
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
        console.log("Form.js - handleChange:" + this.state);
        // méthode pour que l'état soit mis à jour immédiatement
        this.setState( (state) => {
            this.setState(state)
        }, () => {
            this.props.formChange(this.state)})
    }
    /**
     * Changement d'état des checkboxes (métiers)
     * @param event
     */
    doCheckBoxes = (event) => {
        const target = event.target;
        const value = target.value;
        if (this.state.jobs.has(value)) {
            this.state.jobs.delete(value);
        } else {
            this.state.jobs.add(value)
        }
    }
    /**
     * Gestionnaire du changement sur les checkboxes (métiers)
     * Fonction flêchée
     * @param event
     */
    handleChangeCheckBoxes = (event) => {
        // méthode pour que le changement d'état soit traité immédiatement
        this.setState( (state) => {
            return this.doCheckBoxes(event)
        }, () => {
            this.props.formChange(this.state)})
    }

    /**
     * Traitement du bouton reset, remettre l'état par défaut
     */
    doReset = () => {
        this.setState({
            struct: 'gi',
            jobs: new Set(['E','C','I','A']),
            name: '',
            firstname: '',
            sortby: 'Nom',
        });
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
        //empêcher la submission du formulaire
        event.preventDefault();
        // méthode pour que l'état soit mis à jour immédiatement
        this.setState( () => {
            return this.doReset();
        }, () => {
            this.props.formChange(this.state)})
    }

    /**
     * render du formulaire
     *
     * @returns {JSX.Element}
     */
    render(){
        return (
            <div className="col-lg-6 offset-lg-3 p-3 formCustom">
            <form>
                <div className="form-group row">
                    <div className="col-sm-2 divLabelCustom">Structure</div>
                    <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="struct" id="structGI"
                                   value="gi"
                                   checked={this.state.struct === "gi"}
                                   onChange={this.handleChange}
                            />
                            <label className="form-check-label">Toutes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="struct" id="structHDS"
                                   value="hds"
                                   checked={this.state.struct === "hds"}
                                   onChange={this.handleChange}/>
                            <label className="form-check-label">Heudiasyc</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="struct" id="structLMAC"
                                   value="lmac"
                                   checked={this.state.struct === "lmac"}
                                   onChange={this.handleChange}
                            />
                            <label className="form-check-label">LMAC</label>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-2 divLabelCustom">Profession</div>
                    <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value="E" onChange={this.handleChangeCheckBoxes}
                                   checked={this.state.jobs.has("E")}
                            />
                            <label className="form-check-label">Enseignant</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value="C" onChange={this.handleChangeCheckBoxes}
                                   checked={this.state.jobs.has("C")}
                            />
                            <label className="form-check-label">Chercheur</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value="I" onChange={this.handleChangeCheckBoxes}
                                   checked={this.state.jobs.has("I")}
                            />
                            <label className="form-check-label">Ingénieur</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value="A" onChange={this.handleChangeCheckBoxes}
                                   checked={this.state.jobs.has("A")}
                            />
                            <label className="form-check-label">Autres</label>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-2 divLabelCustom">Nom</div>
                    <div className="col-sm-6">
                        <input type="text"
                               className="form-control"
                               name="name"
                               placeholder="Nom"
                               value={this.state.name}
                               onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-2 divLabelCustom">Prénom</div>
                    <div className="col-sm-6">
                        <input type="text"
                               className="form-control"
                               name="firstname"
                               placeholder="Prénom"
                               value={this.state.firstname}
                               onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-2 divLabelCustom">Trier par</div>
                    <div className="col-sm-6">
                        <select
                            className="form-control"
                            name="sortby"
                            value={this.state.sortby}
                            onChange={this.handleChange}
                        >
                            <option value="nomAz">Nom</option>
                            <option value="prenomAz">Prénom</option>
                            <option value="fonction">Profession</option>
                            <option value="structLibelleFils">Structure</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-12 text-center pt-3">
                    <button type="reset" className="btn btn-danger" onClick={this.handleCancel}>Réinitialiser</button>
                </div>

            </form>
            </div>
        );
    }
}

export default Form;
/*
était dans le DIV des boutons
                    <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Valider</button>
 */