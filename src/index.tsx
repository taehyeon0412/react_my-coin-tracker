import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { Theme } from "./theme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);

/* Theme를 사용하려면 index에 ThemeProvider를 import하고 
ThemeProvider를 사용할 곳에 감싸준다
*/
