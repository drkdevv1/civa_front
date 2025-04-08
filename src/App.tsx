import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routesConfig from './routes/routesConfig';

import ProtectedRoute from './routes/ProtectedRoute';
import './index.css';

import { JSX } from 'react/jsx-runtime';
import Login from './pages/public/Login/Login';
import Register from './pages/public/Register/Register';
import Buses from './pages/private/Buses/Buses';

// Component map to match string names from routesConfig
const componentMap: Record<string, JSX.Element> = {
  Login: <Login />,
  Register: <Register />,
  Buses: <Buses />,
  Redirect: <Navigate to="/buses" replace />
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Generate routes based on routesConfig */}
          {routesConfig.map((route) => {
            // For protected routes
            if (route.isProtected) {
              return (
                <Route key={route.path} element={<ProtectedRoute />}>
                  <Route path={route.path} element={componentMap[route.element]} />
                </Route>
              );
            }

            // For public routes
            return (
              <Route
                key={route.path}
                path={route.path}
                element={componentMap[route.element]}
              />
            );
          })}

          {/* Catch all other routes and redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;