import React, { useEffect, useState } from "react";
import Content from "./components/Content/Content";

import UserContext from "./components/Context/UserContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    var locallyStoredUser = localStorage.getItem("user");

    if (locallyStoredUser !== null && Object.keys(locallyStoredUser).length > 0)
      setUser(JSON.parse(locallyStoredUser));
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
      </UserContext.Provider>
      <Content user={user} />
      <Footer />
    </>
  );
}
