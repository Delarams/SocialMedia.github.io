import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom"; // ✅ Ensure Outlet is imported

const currentUser = true;

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <Outlet /> {/* Outlet should be recognized now */}
        <RightBar />
      </div>
    </div>
  );
};

const ProtectedRoute = ({children}) =>{
  if(!currentUser){
    return <Navigate to="/login" />
  }
  return children
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Profile /> },
        { path: "/profile/:id", element: <Home /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <div>404 - Page Not Found</div> },
  ],
  { basename: "/SocialMedia.github.io" }
);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
