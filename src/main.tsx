import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const shincodeInfo = {
  name: "hiroki",
  age: 29,
};

const ShinCodeContext = createContext(shincodeInfo);

createRoot(document.getElementById("root")!).render(
  <ShinCodeContext.Provider value={shincodeInfo}>
    <StrictMode>
      <App />
    </StrictMode>
  </ShinCodeContext.Provider>
);

export default ShinCodeContext;
