import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Preview } from "@mui/icons-material";
import StatusModifier from "../MainPage/Record/StatusModifier";
import { Box } from "@mui/system";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// the add record window(dialog)
export default function AddRecordDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { datas } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handel add change state button, when click open sideMenu
  return (
    <Box sx={{ width: 15 }} display="inline">
      <Tooltip title="Change Status">
        <IconButton onClick={handleClickOpen}>
          <Preview />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="16xs"
      >
        <DialogTitle>
          <ReceiptLongIcon fontSize="large"></ReceiptLongIcon>
          {"Modify Book Status Services"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <StatusModifier
              values={open}
              setValue={setOpen}
              bookName={datas.bookName}
              bookId={datas._id}
            ></StatusModifier>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
