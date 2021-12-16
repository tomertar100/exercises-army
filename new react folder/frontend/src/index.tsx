import ReactDOM from "react-dom";
import "../src/styles/Login.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import LoginPage from "../src/pages/login";

import App from "../src/pages/App";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
