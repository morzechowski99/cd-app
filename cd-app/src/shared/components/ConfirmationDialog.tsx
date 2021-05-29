import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { Button, Typography } from "@material-ui/core";

export interface ConfirmationDialogProps {
   keepMounted: boolean;
   open: boolean;
   onClose: (result: boolean, value: any) => void;
   title: string;
   content: string;
   value: any;
}

const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = (
   props
) => {
   const { onClose, content, open, title, value, ...other } = props;

   const handleCancel = () => {
      onClose(false, value);
   };

   const handleOk = () => {
      onClose(true, value);
   };

   return (
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         maxWidth="md"
         aria-labelledby="confirmation-dialog-title"
         open={open}
         {...other}
      >
         <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
         <DialogContent dividers>
            <Typography variant="h6">{content}</Typography>
         </DialogContent>
         <DialogActions>
            <Button variant="outlined" onClick={handleCancel} color="primary">
               Anuluj
            </Button>
            <Button
               variant="contained"
               autoFocus
               onClick={handleOk}
               color="primary"
            >
               Potwierdź
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default ConfirmationDialog;
