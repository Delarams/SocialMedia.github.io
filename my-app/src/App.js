import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom"; 
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

const currentUser = true;

const Layout = ({ darkMode }) => {
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const { darkMode } = useContext(DarkModeContext);
  console.log(darkMode);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout darkMode={darkMode} /> {/* ✅ Pass darkMode as a prop */}
          </ProtectedRoute>
        ),
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile/:id", element: <Profile /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <div>404 - Page Not Found</div> },
    ],
    { basename: "/SocialMedia.github.io" }
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
