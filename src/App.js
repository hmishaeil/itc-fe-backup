import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SimplePlaidLink from './components/plaid/SimplePlaidLink.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import CreateCardholder from './components/cardholder/CreateCardholder.tsx';
import NotFound from './components/NotFound.tsx';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/link-bank" element={<SimplePlaidLink />} />
        <Route exact path="/create-cardholder" element={<CreateCardholder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router >

  );
}

export default App;
