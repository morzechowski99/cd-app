import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { Button, Grid } from "@material-ui/core";

export interface InfoDialogProps {
   keepMounted: boolean;
   open: boolean;
   onClose: () => void;
   title: string;
   content: string;
}

const InfoDialog: React.FunctionComponent<InfoDialogProps> = (props) => {
   const { onClose, content, open, title, ...other } = props;

   const handleOk = () => {
      onClose();
   };

   return (
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         maxWidth="md"
         aria-labelledby="info-dialog-title"
         open={open}
         {...other}
      >
         <DialogTitle id="info-dialog-title">{title}</DialogTitle>
         <DialogContent dividers>{content}</DialogContent>
         <DialogActions>
            <Grid container justify="center">
               <Grid item xs={12} md={4}>
                  <Button
                     variant="contained"
                     autoFocus
                     onClick={handleOk}
                     color="primary"
                  >
                     OK
                  </Button>
               </Grid>
            </Grid>
         </DialogActions>
      </Dialog>
   );
};

export default InfoDialog;
