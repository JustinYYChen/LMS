import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import BookInfoPages from "../bookInfo/bookinfo";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// handel view book detail button, when click open bookInfoPage
export default function BookInfoDialog(props) {
  const [open, setOpen] = React.useState(false);
  //get book infomation
  const { datas } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: 15 }} display="inline">
      <Tooltip title="view book details">
        <IconButton on onClick={handleClickOpen}>
          <Edit />
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
          <AutoStoriesIcon fontSize="large"></AutoStoriesIcon>
          {"Book Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <BookInfoPages
              Link={datas.picture}
              Name={datas.bookName}
              ID={datas._id}
              Status={datas.status}
              Description={datas.description}
            ></BookInfoPages>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
