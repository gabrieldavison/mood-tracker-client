import React, { useEffect, useState, createContext } from "react";

import Login from "./Login";
import client from "../utils/feathers";
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
  client.on("logout", () => {
    setLogin(null);
  });

  return login == null ? (
    <Login setLogin={setLogin} />
  ) : (
    <LoginContext.Provider value={login}>
      <AuthenticatedRoute />
    </LoginContext.Provider>
  );
}

export default App;
