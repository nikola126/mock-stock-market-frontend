import React, { useState } from "react";
import Content from "./components/Content/Content";

import UserContext from "./components/Context/UserContext";
import Login from "./components/Navbar/Navbar";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Login />
      </UserContext.Provider>
      <Content user={user} />
    </>
  );
}
