import { createContext } from "react";

const UserContext = createContext({
  user: {},
  setUser: (values) => {},
  capital: {},
  setCapital: (values) => {},
  portfolio: {},
  setPortfolio: (values) => {},
});

export default UserContext;
