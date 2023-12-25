import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';
import AuthProvider from './providers/AuthProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
      </DndProvider>
      </AuthProvider>
  </React.StrictMode>,
)
