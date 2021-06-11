import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import QR from 'qrcode-base64'

//npm install qrcode-base64


const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}))(Tooltip);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


class CustomizedDialogs extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open:false,
    }
}

  render() {
    //const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      this.setState({open:true});
      //setOpen(true);
    };
    const handleClose = () => {
      this.setState({open:false});
      //setOpen(false);
    };

    var imgData;

    if (this.props.dataFromPerson==null) {
      var imgData = QR.drawImg(this.props.dataFromPerson, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 300
      })
    } else if(this.props.dataFromPerson.length===4){
      var imgData = QR.drawImg('034423'.concat(this.props.dataFromPerson), {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 300
      })
    } else{
      var imgData = QR.drawImg(this.props.dataFromPerson, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 300
      })      
    }

    return (
      <div>
      <LightTooltip title="Générer un QR Code">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          {this.props.dataFromPerson}
        </Button>
      </LightTooltip>
      <Dialog aria-labelledby="customized-dialog-title" open={this.state.open}>
        <DialogTitle id="customized-dialog-title" >
          <i><b>{this.props.dataFromPerson}</b></i>
        </DialogTitle>
        <DialogContent dividers>
          <img src={`${imgData}`} alt="None" width="300" height="300" align="center"/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
          Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}

export default CustomizedDialogs;