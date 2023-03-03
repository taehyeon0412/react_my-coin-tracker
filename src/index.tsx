import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { Theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={Theme}>
    <App />
  </ThemeProvider>
);

/* Theme를 사용하려면 index에 ThemeProvider를 import하고 
ThemeProvider를 사용할 곳에 감싸준다
*/
