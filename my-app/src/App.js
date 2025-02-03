import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss"
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom"; // ✅ Ensure Outlet is imported

const currentUser = true;

const Layout = () => {
  return (
    <div className="theme-dark">
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{flex:6}}>
          <Outlet /> 
        </div>
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


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
