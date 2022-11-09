import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Header from "../MainPage/Header";
import books from "../../LMS-elements/books.jpeg";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useValue } from "../../context/Provider";

// create theme to control page color
let theme = createTheme({
  palette: {
    primary: {
      light: "#4f5358",
      main: "#24292F",
      dark: "#191c20",
    },
    secondary: {
      main: "#2DA44E",
    },
  },
  typography: {
    h5: {
      fontWeight: "bold",
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

// This is the homepage which contains all books and all records navigation
function Homepage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  React.useEffect(() => {
    if (
      currentUser === null &&
      localStorage.getItem("currentUser") === "null"
    ) {
      navigate("/");
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box sx={{ textAlign: "center", mt: 20, mb: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                background: "#2DA44E",
                mr: 10,
                fontSize: 30,
                width: 250,
                textTransform: "capitalize",
              }}
              onClick={() => navigate("/allRecord")}
            >
              View Records
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                background: "#2DA44E",
                ml: 10,
                fontSize: 30,
                width: 250,
                textTransform: "capitalize",
              }}
              onClick={() => navigate("/allBook")}
            >
              View Books
            </Button>
          </Box>
          <img src={books} height={600} width={"center"}></img>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default Homepage;
