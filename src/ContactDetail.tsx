import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { Contact } from "./Contacts";

const useStyles = makeStyles({
  sideBarText: {
    marginTop: 100,
  },
  gridLine: {
    marginBottom: 20,
  },
});

export default function ContactDetail({ contact }: { contact: Contact }) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{contact.name}</DialogTitle>
      <DialogContent>
        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <DialogContentText>Username: {contact.username}</DialogContentText>
          </Grid>
          <Grid item xs={6}>
            <DialogContentText>Email: {contact.email}</DialogContentText>
          </Grid>
        </Grid>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <DialogContentText>Phone: {contact.phone}</DialogContentText>
          </Grid>

          <Grid item xs={6}>
            <DialogContentText>Website: {contact.website}</DialogContentText>
          </Grid>
        </Grid>

        <Typography
          sx={{ fontWeight: "medium" }}
          variant="subtitle1"
          style={{ marginBottom: 10 }}
        >
          Address
        </Typography>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <DialogContentText>
              Street: {contact.address.street}
            </DialogContentText>
          </Grid>

          <Grid item xs={6}>
            <DialogContentText>{contact.address.suite}</DialogContentText>
          </Grid>
        </Grid>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <DialogContentText>City: {contact.address.city}</DialogContentText>
          </Grid>

          <Grid item xs={6}>
            <DialogContentText>
              Zip Code: {contact.address.zipcode}
            </DialogContentText>
          </Grid>
        </Grid>

        <Typography
          sx={{ fontWeight: "medium" }}
          variant="subtitle1"
          style={{ marginBottom: 10 }}
        >
          Company
        </Typography>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <DialogContentText>
              Company Name: {contact.company.name}
            </DialogContentText>
          </Grid>

          <Grid item xs={6}>
            <DialogContentText>
              Catch Phrase: {contact.company.catchPhrase}
            </DialogContentText>
          </Grid>
        </Grid>

        <DialogContentText>B.S: {contact.company.bs}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
