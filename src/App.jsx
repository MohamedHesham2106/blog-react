import { Fragment } from "react";

import "@fontsource/playfair-display";
import "@fontsource/poppins";
import { Route, Routes } from "react-router";

import { Footer } from "./components/ui/footer";
import About from "./pages/About";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import Register from "./pages/Register";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
