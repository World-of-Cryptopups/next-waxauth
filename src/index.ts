import WaxAuthProvider, {
  useAuthFunctions,
  useWaxAuth,
  useWaxUser,
  WaxAuthContext,
} from "./auth/provider";

export default WaxAuthProvider;
export * from "./api";
export * from "./lib";
export * from "./typings";
export { useWaxUser, useAuthFunctions, useWaxAuth, WaxAuthContext };
