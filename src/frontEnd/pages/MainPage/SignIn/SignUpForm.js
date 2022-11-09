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

import { useValue } from "../../../context/Provider";
import { register } from "../../Action/adminLogin";

const mystyles = styled((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },
}));

/**the initial values of the form for adding new type of book */
const initialValues = {
  adminName: "",
  emailAddress: "",
  phoneNumber: "",
  password: "",
};

export default function AddSignUpForm(props) {
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
    state: { currentUser },
    dispatch,
  } = useValue();

  const resetForm = () => {
    setvalues(initialValues);
  };
  console.log(currentUser);
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //add one category of book once click the submit buttom
    register(values, dispatch);

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
              label="AdminName"
              value={values.adminName}
              name="adminName"
              onChange={inputChange}
            ></TextField>
            <TextField
              variant="outlined"
              label="emailAddress"
              value={values.emailAddress}
              name="emailAddress"
              onChange={inputChange}
            ></TextField>
          </div>
          <div>
            <TextField
              variant="outlined"
              label="phoneNumber"
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={inputChange}
            ></TextField>

            <TextField
              label="Password"
              value={values.password}
              name="password"
              onChange={inputChange}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>
          {/* <Box>
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
          </Box> */}
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
