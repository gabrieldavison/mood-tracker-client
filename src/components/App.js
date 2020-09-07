import React, { useEffect, useState, createContext, useContext } from "react";

import Login from "./Login";
import client from "../feathers";
import Quiz from "./Quiz";
import AuthenticatedRoute from "./AuthenticatedRoute";

export const LoginContext = createContext({});

function App() {
  const [login, setLogin] = useState();

  useEffect(() => {
    // Try to authenticate with the JWT stored in localStorage
    client.authenticate().catch(() => setLogin(null));

    // On successfull login
    client.on("authenticated", (login) => {
      setLogin({ login });
    });
  }, []);

  return login == null ? (
    <Login setLogin={setLogin} />
  ) : (
    <LoginContext.Provider value={login}>
      <AuthenticatedRoute />
    </LoginContext.Provider>
  );
}

export default App;
