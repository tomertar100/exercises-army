import ReactDOM from "react-dom";
import "./Login.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import LoginPage from "../src/components/login";

import App from "./App";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
