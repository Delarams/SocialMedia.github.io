import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <Outlet /> {/* This allows nested routes to render */}
        <RightBar />
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Profile />,
        },
        {
          path: "/profile/:id",
          element: <Home />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <div>404 - Page Not Found</div> },
  ],
  { basename: "/SocialMedia.github.io" } // 👈 This helps with GitHub Pages deployment
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
