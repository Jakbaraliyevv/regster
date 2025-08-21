import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import DavlatXizmatlariForm from "../components/forma";
import PhoneVerification from "../components/tasdiqlash";
import NotFound from "../components/not-found";
import SuccsesComponents from "../components/succses";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forma",
    element: <DavlatXizmatlariForm />,
  },

  {
    path: "/tasdiqlash",
    element: <PhoneVerification />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/succses",
    element: <SuccsesComponents />,
  },
]);

export default root;
