import React, { useEffect, useState } from "react";

import Login from "./Login";
import client from "../feathers";
import Quiz from "./Quiz";

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

  return login == null ? <Login setLogin={setLogin} /> : <Quiz />;
}

export default App;
