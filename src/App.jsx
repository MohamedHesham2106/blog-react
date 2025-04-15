import { Fragment, useEffect, useState } from "react";

import "@fontsource/playfair-display";
import "@fontsource/poppins";
import { Route, Routes } from "react-router";

import About from "./pages/About";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
