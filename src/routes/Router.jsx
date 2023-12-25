
import {
  createBrowserRouter,
} from "react-router-dom";

import Root from "../layout/Root";
import Home from "../components/Home"
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import Contact from "../components/Contact";
import Dashboard from "../components/Dashboard";
import AddTask from "../components/AddTask";
import MyTask from "../components/MyTask";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/contact',
        element: <Contact></Contact>,
      },
      
    ]
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'add-task',
        element:<AddTask></AddTask>,
      },
      {
        path: 'my-task',
        element:<MyTask></MyTask>,
        loader: () => fetch('https://task-management-server-gamma-five.vercel.app/task')
      },

    ],
  },
]);