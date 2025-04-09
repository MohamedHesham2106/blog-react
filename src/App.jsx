import { Fragment } from "react";

import "@fontsource/poppins";
import "@fontsource/playfair-display";
import { Route, Routes } from "react-router";

import { Navbar } from "./components/navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
