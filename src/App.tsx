import React, { createContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import routes from "./config/routes";
import Center from "./components/utils/Center";
import AuthChecker from "./components/auth/AuthChecker";
import UserManagement from "./firebase/UserManagement";
import NavigationBar from "./components/utils/NavigationBar";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.info("User detected.");
      } else {
        console.info("No user detected");
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Center>
        <CircularProgress />
      </Center>
    );

  return (
    <div>
      <UserManagement>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <AuthChecker>
                      <NavigationBar />
                      <route.component />
                    </AuthChecker>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </UserManagement>
    </div>
  );
}

export default App;
