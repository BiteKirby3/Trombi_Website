import React, {Component} from 'react'
import QrCode from 'react.qrcode.generator'

class QRCode extends Component {
  render() {
    if (this.props.dataFromPerson==null) {
      return <div></div>;
    } 

    if(this.props.dataFromPerson.length==4){
      var tele = '034423'.concat(this.props.dataFromPerson)
      return <div>
      <QrCode value={tele}/>
    </div>
    }

    return <div>
      <QrCode value={this.props.dataFromPerson}/>
    </div>
  }
}

export default QRCode;
