import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode]= useState(false);
  const palatteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palatteType
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
