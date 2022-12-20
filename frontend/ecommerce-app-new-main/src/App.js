import { createTheme, Paper, ThemeProvider, useTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import RouterSection from "./RouterSection";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
function App() {
  const [mode, setMode] = useState(localStorage.getItem('mode')?localStorage.getItem('mode'):'light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
      localStorage.setItem('mode',mode),
      
    [mode]
  );

  return (
    <ColorModeContext.Provider value={mode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Paper className="min-h-screen rounded-none" sx={{borderRadius:0}}>
            <Header setMode={setMode} mode={mode} />
            <RouterSection />
          </Paper>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
