
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../Context/StoreContext";
import { getCookie } from "../Util/util";
import agent from "../api/agent";
import { error } from "console";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

useEffect(()=>{
  const buyerId = getCookie('buyerId');
  if(buyerId){
    agent.Basket.get()
    .then(basket => setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=> setLoading(false));
  }
  else{
    setLoading(false);
  }
},[setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const palatteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palatteType,
      background: {
        default: palatteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="initialising app.."/>
   
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkmode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
