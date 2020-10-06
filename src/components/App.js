import React, { useEffect, useState, createContext } from "react";
import { injectGlobal } from "emotion";
import Login from "./Login";
import client from "../utils/feathers";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { colors } from "../utils/colors";

export const LoginContext = createContext({});

function App() {
  //Injects global styles into app
  injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

    body {
      max-width: 960px;
      margin: auto;
      font-family: 'Comfortaa', sans-serif;
      background-color: ${colors.light}
    }
  
  `;

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
