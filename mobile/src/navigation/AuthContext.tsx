/* eslint import/prefer-default-export: "off" */
import { createContext } from "react";

interface IAuthMethods {
  signIn: (token?: string) => Promise<void>;
  signOut: () => void;
}
const authMethods = {
  signIn: () => new Promise<void>(() => null),
  signOut: () => null,
};
export const AuthContext = createContext<IAuthMethods>(authMethods);
