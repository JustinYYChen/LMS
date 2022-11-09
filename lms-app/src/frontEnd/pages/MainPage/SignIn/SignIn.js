import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login, register } from "../../Action/adminLogin";
import { useNavigate } from "react-router-dom";
import { useValue } from "../../../context/Provider";
import AddUserDialog from "../../components/AddUserDialog";
import { Alert, AlertTitle } from "@mui/material";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [ShowAlret, setShowAlret] = React.useState(false);

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  //login once click the Login buttom
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    return login(
      {
        email: data.get("email"),
        password: data.get("password"),
      },
      dispatch,
      navigate,
      setShowAlret
    );
  };

  //the layout for the login form
  return (
    <ThemeProvider theme={theme}>
      {ShowAlret && (
        <Alert
          severity="error"
          onClose={() => {
            setShowAlret(false);
          }}
        >
          <AlertTitle>Error</AlertTitle>
          Incorrect Password or Account — <strong>check it out!</strong>
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            textAlign={"center"}
            fontWeight={"bold"}
          >
            Library Management System
          </Typography>
          <br />
          <br />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" textAlign={"center"}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
