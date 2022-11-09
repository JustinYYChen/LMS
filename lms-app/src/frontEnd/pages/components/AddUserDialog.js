import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import BookIcon from "@mui/icons-material/Book";
import AddSignUpForm from "../MainPage/SignIn/SignUpForm";

// the add book window(dialog)
export default function AddUserDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handel add book button, when click open AddBookForm
  return (
    <Box sx={{ width: 15 }} display="inline">
      <Button
        //variant="contained"
        color="secondary"
        sx={{background: "#24292F", fontSize: 18, width: 120, color: "#fff", textTransform: 'capitalize', fontWeight: 'bold'}}
        onClick={handleClickOpen}
      >
        Sign Up
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="Add User"
        maxWidth="16xs"
      >
        <DialogTitle>
          <BookIcon fontSize="large"></BookIcon>
          {"Add User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Add User">
            <AddSignUpForm values={open} setValue={setOpen}></AddSignUpForm>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
