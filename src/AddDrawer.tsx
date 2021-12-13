import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";

const useStyles = makeStyles({
  sideBarText: {
    marginTop: 100,
  },
  gridLine: {
    marginBottom: 20,
  },
});

export default function AddDrawer() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const sideBar = () => (
    <Container>
      <form>
        <Typography
          style={{ marginTop: 10 }}
          variant="h5"
          color="textSecondary"
          component="h1"
          gutterBottom
        >
          New Contact
        </Typography>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              color="secondary"
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="secondary"
              type="email"
            />
          </Grid>
        </Grid>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              color="secondary"
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Website"
              variant="outlined"
              color="secondary"
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1">Address</Typography>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Street"
              variant="outlined"
              color="secondary"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Suite"
              variant="outlined"
              color="secondary"
            />
          </Grid>
        </Grid>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              color="secondary"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Zip Code"
              variant="outlined"
              color="secondary"
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1">Company</Typography>

        <Grid className={classes.gridLine} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              color="secondary"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Catch Phrase"
              variant="outlined"
              color="secondary"
            />
          </Grid>
        </Grid>

        <TextField
          style={{ marginBottom: 20 }}
          fullWidth
          id="outlined-basic"
          label="B.S"
          variant="outlined"
          color="secondary"
          multiline
          rows={2}
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          style={{ borderRadius: 30 }}
        >
          Done
        </Button>
      </form>
    </Container>
  );

  return (
    <React.Fragment>
      <Tooltip title="Add contact">
        <IconButton
          size="large"
          color="secondary"
          aria-label="Add"
          onClick={toggleDrawer(true)}
        >
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {sideBar()}
      </Drawer>
    </React.Fragment>
  );
}
