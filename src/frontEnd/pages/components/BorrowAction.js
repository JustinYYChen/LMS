import { Preview, Edit, Save } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useValue } from "../../context/Provider";
import { updateStatus } from "../Action/createBook";
import AddRecordDialog from "./AddRecordDialog";
import BookInfoDialog from "./BookInfoDialog";

// view history button, when click navigate ot /allRecord and find
// all related records
const BorrowAction = ({ params, rowId, setRowId }) => {
  const { dispatch } = useValue();
  const data = params.row;
  const navigate = useNavigate();
  console.log("id is: " + data._id + "status is:" + data.status);
  const handleSubmit = async () => {
    const { condition, description, status, _id, bookName } = params.row;
    const result = await updateStatus(
      { condition, description, status, bookName, type: status },
      _id,
      dispatch
    );
    if (result) {
      setRowId(null);
    }
  };
  return (
    <Box>
      <AddRecordDialog datas={data} />

      <Tooltip title="view history">
        <IconButton onClick={() => navigate("/allRecord", { state: data })}>
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="save status">
        <IconButton onClick={handleSubmit}>
          <Save />
        </IconButton>
      </Tooltip>
      <BookInfoDialog datas={data} />
    </Box>
  );
};

export default BorrowAction;
