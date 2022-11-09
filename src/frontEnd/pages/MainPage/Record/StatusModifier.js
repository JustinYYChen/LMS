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
  Slide,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { addRecords } from "../../Action/createRecord";
import { useValue } from "../../../context/Provider";
import { updateStatus } from "../../Action/createBook";
import { useNavigate } from "react-router-dom";

const mystyles = styled((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },
}));

//the submit form for changing the status of the book
//for example, borrow, returned or lost.
export default function StatusModifier(props) {
  const navigate = useNavigate();
  const { bookName, bookId } = props;
  const initialValues = {
    itemName: bookName,
    customerName: "",
    type: "returned",
    phoneNumber: "",
    bookId: bookId,
  };
  const [values, setvalues] = useState(initialValues); //initialize initalData
  const classes = mystyles();
  const {
    state: { currentRecords, records, currentUser },
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
  //console.log(currentRecords);
  const inputChange = (event) => {
    const { name, value } = event.target;

    setvalues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  const resetForm = () => {
    setvalues(initialValues);
  };

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  //submit the record form and add a record in the record table
  const handleSubmit = (e) => {
    e.preventDefault();
    addRecords(values, currentUser, dispatch);
    console.log("type is : " + values.type);
    if (values.type === "returned") {
      updateStatus({ bookName, status: "Available" }, bookId);
    } else if (values.type === "lost") {
      updateStatus({ bookName, status: "Lost" }, bookId);
    } else if (values.type === "borrow") {
      updateStatus(
        { bookName, status: "On Loan", type: "borrow record" },
        bookId
      );
    }
    setvalues(initialValues);
    props.setValue(false);
  };

  // the form layout
  return (
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
              label="Book Name"
              value={values.itemName}
              name="itemName"
            ></TextField>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Borrow Action
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={values.type}
                name="type"
                row={true}
                onChange={inputChange}
              >
                <FormControlLabel
                  value="borrow"
                  control={<Radio />}
                  label="borrow"
                />
                <FormControlLabel
                  value="returned"
                  control={<Radio />}
                  label="returned"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <TextField
              variant="outlined"
              label="User Name"
              value={values.customerName}
              name="customerName"
              onChange={inputChange}
            ></TextField>

            <TextField
              variant="outlined"
              label="User Phone Number"
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={inputChange}
            ></TextField>
          </div>
          <Box margin="0 0 0 400px">
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
