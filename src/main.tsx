import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.tsx';
import { persistor, store } from './state/store.ts';
import Learn from './views/app/Learn.tsx';
import Login from './pages/auth/Login.tsx';
import Lesson from './views/app/Lesson.tsx';
import Signup from './pages/auth/Signup.tsx';
import Course from './views/app/Course.tsx';
import Profile from './views/app/Profile.tsx';
import RequireAuth from './pages/RequireAuth.tsx';
import { Toaster } from '@/components/ui/toaster';
// import Questions from './views/app/Questions.tsx';
import Leaderboard from './views/app/Leaderboard.tsx';
import ForgotPassword from './pages/auth/ForgotPassword.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/app',
    element: <RequireAuth />,
    children: [
      {
        path: 'learn',
        element: <Learn />,
      },
      {
        path: 'learn/course/:id',
        element: <Course />,
      },
      {
        path: 'learn/course/:courseId/unit/:unitId/lesson/:lessonId/totalSteps/:totalSteps/step/:stepNo',
        element: <Lesson />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      // {
      //   path: 'questions',
      //   element: <Questions />,
      // },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
      </PersistGate>
    </Provider>
    <Toaster />
  </React.StrictMode>,
);
