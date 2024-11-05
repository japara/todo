import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./components/singin";
import User from "./components/user";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/user" element={<User />} />{" "}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
