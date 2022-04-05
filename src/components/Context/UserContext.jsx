import { createContext } from "react";

const UserContext = createContext({
  user: {},
  setUser: (values) => {},
  capital: {},
  setCapital: (values) => {},
  networth: {},
  setNetworth: (values) => {},
  portfolio: {},
  setPortfolio: (values) => {},
});

export default UserContext;
