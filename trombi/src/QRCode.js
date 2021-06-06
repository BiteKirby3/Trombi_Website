import React, {Component} from 'react'
import QrCode from 'react.qrcode.generator'

class QRCode extends Component {
  render() {
    if (this.props.dataFromPerson==null) {
      return <div className="QRCode"></div>;
    } 

    if(this.props.dataFromPerson.length===4){
      var tele = '034423'.concat(this.props.dataFromPerson)
      return <div className="QRCode" >
      <QrCode value={tele} size='150'/>
    </div>
    }

    return <div className="QRCode">
      <QrCode value={this.props.dataFromPerson} size='150'/>
    </div>
  }
}

export default QRCode;
