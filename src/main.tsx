import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Alert from "./components/Alert.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Alert />
  </StrictMode>
);
