import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import AddBookForm from "../MainPage/Book/addBookForm";
import { Box } from "@mui/system";
import BookIcon from '@mui/icons-material/Book';

// the add book window(dialog)
export default function AddBookDialog() {
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
            <Button variant="contained" color="secondary" sx={{ mr: 1 }} onClick = {handleClickOpen}>
                  Add Book
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add Book"
                maxWidth="16xs"
            >
                <DialogTitle><BookIcon fontSize="large"></BookIcon>{"Add Book Service"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="Add Book">
                        <AddBookForm values={open} setValue={setOpen}></AddBookForm>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Box>
    );
}