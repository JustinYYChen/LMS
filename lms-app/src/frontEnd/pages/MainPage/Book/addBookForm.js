import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { addBooks } from "../../Action/createBooks";
import { useValue } from "../../../context/Provider";
import { useNavigate } from "react-router-dom";

const mystyles = styled((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },
}));

/**the initial values of the form for adding new type of book */
const initialValues = {
  staffName: "",
  staffID: "",
  phoneNumber: "",
  bookName: "",
  bookQuantity: "",
  category: "",
  description: "",
};

export default function AddBookForm(props) {
  const navigate = useNavigate();
  const [values, setvalues] = useState(initialValues);
  const classes = mystyles();
  const inputChange = (event) => {
    const { name, value } = event.target;

    setvalues({
      ...values,
      [name]: value,
    });
    //console.log(values);
  };
  const {
    state: {
      currentBookCategory,
      currentBook,
      currentUser,
      book_array,
      fetchBooksRequestChecker,
    },
    dispatch,
  } = useValue();
  useEffect(() => {
    if (
      currentUser === null &&
      localStorage.getItem("currentUser") === "null"
    ) {
      navigate("/");
    }
  }, []);
  console.log(currentBookCategory);
  console.log(currentBook);

  const resetForm = () => {
    setvalues(initialValues);
  };

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  const handleSubmit = (e) => {
    console.log("values: " + values);
    e.preventDefault();
    //add one category of book once click the submit buttom
    addBooks(values, currentUser, dispatch);

    setvalues(initialValues);
    props.setValue(false);
  };

  return (
    // the layout of the add book form
    <Paper className={classes.pageContent}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <div>
            <TextField
              variant="outlined"
              label="Staff Name"
              value={values.staffName}
              name="staffName"
              onChange={inputChange}
            ></TextField>
            <TextField
              variant="outlined"
              label="Staff ID"
              value={values.staffID}
              name="staffID"
              onChange={inputChange}
            ></TextField>
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Book Name"
              value={values.bookName}
              name="bookName"
              onChange={inputChange}
            ></TextField>

            <TextField
              label="Book Quantity"
              value={values.bookQuantity}
              name="bookQuantity"
              onChange={inputChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>
          <Box>
            <TextField
              id="description"
              label="Description"
              multiline
              fullWidth="true"
              rows={3}
              value={values.description}
              name="description"
              onChange={inputChange}
            />
            <TextField
              id="category"
              label="Book Category"
              multiline
              fullWidth="true"
              rows={3}
              value={values.category}
              name="category"
              onChange={inputChange}
            />
          </Box>
          <Box margin="0 0 0 500px">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </div>
      </Box>
    </Paper>
  );
}
