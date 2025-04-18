import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#333",
    },
  },
  typography: {
    h3: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "normal",
    },
  },
});

export default theme;
