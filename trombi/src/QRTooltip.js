import './PersonList.css';
import './QRTooltip.css';
import React from 'react';
import PropTypes from "prop-types";

export default class QRTooltip extends React.Component {

    static propTypes = {
        value: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    show_tooltip(id) {
        console.log ("show_tooltip(" + id + ")");
        document.getElementById(id).style.visibility = "visible";
    }

    hide_tooltip(id) {
        console.log ("hide_tooltip(" + id + ")");
        document.getElementById(id).style.visibility = "hidden";
    }

    render() {
        return (
            <div className="QRtooltip" key={this.props.id}>
                <div key={this.props.id + "-1"} onClick={()=>this.show_tooltip(this.props.itemId)}>
                    {this.props.value}
                </div>
            <span className="tooltiptext" id={this.props.itemId}>
                {this.props.value}
                <br></br>
                <img src={'https://api.qrserver.com/v1/create-qr-code/?data='+this.props.value} alt={'QRCode for '+this.props.value}></img>
                <br></br>
                <span onClick={() => this.hide_tooltip(this.props.itemId)}>[fermer]</span>
            </span>
            </div>
        )
    }

}