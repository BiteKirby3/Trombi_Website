import './PersonList.css';
import './QRTooltip.css';
import React from 'react';
import PropTypes from "prop-types";
import filtrerPersonnes from "./FiltrerPersonnes";
import PersonCard from "./PersonCard";
import myLog from "./MyLogger";

export default class PersonList extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        firstname: PropTypes.string,
        jobs: PropTypes.object,
        struct: PropTypes.string,
        sortby: PropTypes.string,
        items: PropTypes.array,
        isLoaded: PropTypes.bool,
        err_msg: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {

        myLog("PersonList.js this.props.isLoaded=" + this.props.isLoaded);

        let items = this.props.listOfPersons;


        if (!this.props.isLoaded) {
            return <div className="App"><img src={process.env.PUBLIC_URL + "loading.gif"} alt="Chargement..."></img>
            </div>;
        } else {
            // on filtre la liste en fonction des propriétés reçues
            myLog("PersonList.render() : "
                + this.props.name.toLocaleLowerCase() + ","
                + this.props.firstname.toLowerCase() + ","
                + this.props.jobs + ","
                + this.props.struct + ","
                + this.props.sortby + ")");

            let listeFiltree = filtrerPersonnes(items,
                this.props.name.toLocaleLowerCase(),
                this.props.firstname.toLowerCase(),
                this.props.jobs,
                this.props.sortby);

            if (listeFiltree.length === 0) {
                // myLog("PersonList.render() : Listefiltree est vide");
                // on retourne pas de résultat
                return (
                    <div className="no-result">
                        {
                            (
                                this.props.err_msg &&
                                <div>
                                    {this.props.err_msg}
                                </div>
                            ) ||
                            <div>
                                Aucun résultat
                            </div>

                        }

                    </div>);
            }
        else
            {
                // on retourne la liste
                return (
                    <div className="Person">
                        <ul className="no-bullets">
                            <div className="flex-container">
                                {listeFiltree.map((item) => (
                                    <div key={'div_1_' + item.id}>
                                        <PersonCard item={item}></PersonCard>
                                    </div>
                                ))}
                            </div>
                        </ul>
                    </div>
                );
            }
        }
        }

        }



