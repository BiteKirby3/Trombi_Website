import React, {Component, PureComponent} from 'react'
import QrCode from 'react.qrcode.generator'

class QRCode extends PureComponent {

  constructor(props) {
    super(props);
    console.log ("QRCode.constructor(), this.props.id=" + this.props.id);
      this.state = {
        id: this.props.id,
        }
  }

  render() {

    if (this.props.dataFromPerson==null) {
      return (<div key={'QR'+this.props.id} className="QRCode">&nbsp;</div>);
    }

    else

    if(this.props.dataFromPerson.length===4){
      var tele = '034423'.concat(this.props.dataFromPerson)
      return (<div key={'QR'+this.props.id} className="QRCode" >
      <QrCode value={tele} size='150' renderAs='svg'/>
    </div>);
    }

    else {
    return (<div key={'QR'+this.props.id} className="QRCode">
      <QrCode value={this.props.dataFromPerson} size='150' renderAs='svg'/>
    </div>);}

  }
}

export default QRCode;
