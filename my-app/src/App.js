import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    { path: "/", element: <Login /> }, // Redirects "/" to login
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <div>404 - Page Not Found</div> },
  ],
  { basename: "/SocialMedia.github.io" } // 👈 Add this if hosted on GitHub Pages
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
