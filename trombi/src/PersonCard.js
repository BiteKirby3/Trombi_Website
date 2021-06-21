import './PersonList.css';
import './QRTooltip.css';
import React from 'react';
import PropTypes from "prop-types";
import QRTooltip from "./QRTooltip";
import myLog from "./MyLogger";

export default class PersonCard extends React.Component {


    static propTypes = {
        item: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    show_tooltip(id) {
        myLog("show_tooltip : " + id);
        document.getElementById(id).style.visibility = "visible";
    }

    hide_tooltip(id) {
        myLog("show_tooltip : " + id);
        document.getElementById(id).style.visibility = "hidden";
    }
    render() {
        let diff_photo=false; //booléen pour savoir si on diffuse la photo de la personne
        if (this.props.item.photo && this.props.item.trombiDiffuserPhoto$f==='O') { //on vérifie l'existence de la photo + l'autorisation de diffusion
            diff_photo=true;
        }
        return (
            <li key={'li' + this.props.item.id}>
                {
                    (
                        diff_photo &&
                        <div key={'div_2_' + this.props.item.id}><img
                            className="photo_trombi"
                            src={`data:image/jpg;base64,${this.props.item.photo}`} alt="Fetched pic"/>
                        </div>
                    ) ||
                    <img className="photo_trombi"
                         src={process.env.PUBLIC_URL + "/user_black_logo.png"}
                         alt="No pic available"/>
                }
                <h3>{this.props.item.nomp}</h3>
                <img className="icon_email" src={process.env.PUBLIC_URL + "/email.png"} alt="Email icon"/>
                <QRTooltip value={this.props.item.mail} itemId={'QRmail' + this.props.item.id}></QRTooltip>
                {
                    (
                        this.props.item.telPoste1 &&
                        <div><img className="icon_phone" src={process.env.PUBLIC_URL + "/phone.png"} alt="Phone icon"/>
                            <QRTooltip value={'034423' + this.props.item.telPoste1} itemId={'QRphone' + this.props.item.id}></QRTooltip>
                        </div>
                    ) ||
                    <div><img className="icon_phone" src={process.env.PUBLIC_URL + "/no_phone.png"} alt="No Phone"/>
                    </div>
                }
                Fonction : {this.props.item.fonction}<br></br>
                Structure : {this.props.item.structLibelleFils}
            </li>
        )
    }

}