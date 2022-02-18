import { createContext } from "react";

const UserContext = createContext({
  user: {},
  setUser: (values) => {}
});

export default UserContext;
