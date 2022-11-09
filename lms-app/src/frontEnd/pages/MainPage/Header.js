import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Lock, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import AddUserDialog from "../components/AddUserDialog";
import { logout } from "../Action/adminLogin";
import { useValue } from "../../context/Provider";

// custom style
const mystyles = styled((theme) => ({
  background: "#24292F",
  fontSize: 25,
  width: 200,
  mt: 2,
  mb: 2,
  color: "#fff",
}));

// Header: Home Page Button, All Books Button, All Record Button, Logout Button
function Header(props) {
  const navigate = useNavigate();
  const { dispatch } = useValue();
  const classes = mystyles();
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#24292F" }} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Button
              sx={{
                background: "#24292F",
                fontSize: 18,
                width: 170,
                mt: 1,
                color: "#fff",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              //classes={classes}
              onClick={() => navigate("/homepage")}
            >
              Home Page
            </Button>
            <Button
              sx={{
                background: "#24292F",
                fontSize: 18,
                width: 170,
                mt: 1,
                color: "#fff",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/allBook")}
            >
              All Books
            </Button>
            <Button
              sx={{
                background: "#24292F",
                fontSize: 18,
                width: 170,
                mt: 1,
                color: "#fff",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/allRecord")}
            >
              All Records
            </Button>
            <Grid item xs />
            <Grid item>
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => logout(dispatch, navigate)}
              >
                LogOut
              </Button>
            </Grid>
            <Grid item>
              <AddUserDialog />
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
