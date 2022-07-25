import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from 'react-redux'
import {uiActions} from '../../../Store/ui-slice'
import Styles from './dialog.module.css'
export default function ScrollDialog(props) {
  //const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const dispatch = useDispatch();
  const handleClickOpen = (scrollType) => () => {
    //setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    dispatch(uiActions.closeDialog())
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <div>
      
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >  
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
          <DialogTitle id="scroll-dialog-title" onClick={handleClose} className={Styles.closeBtn} style={{fontWeight: 'bold', cursor:'pointer'}}>{props.closeBtn}</DialogTitle>
      </div>
        
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
          {props.children}
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props.cancelBtn}</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
