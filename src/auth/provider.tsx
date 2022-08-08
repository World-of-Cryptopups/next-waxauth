import { LinkSession } from "anchor-link";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import UserSession from "../lib/user";
import { APIResponseProps } from "../typings/api";
import { WaxNetProps } from "../typings/net";
import {
  UserApiSessionProps,
  WaxAuthProps,
  WaxUserProps,
} from "../typings/user";
import { anchorLink, AuthFunctions, wax } from "./walletproviders";

interface WaxAuthProviderProps {
  children: ReactNode;

  net: WaxNetProps;
}

interface WaxAuthContextProps {
  auth: WaxAuthProps;
  functions: AuthFunctions;
}

const WaxAuthContext = createContext<WaxAuthContextProps>({
  auth: { isLoggedIn: false },
  functions: {
    loginWithAnchor: async () => undefined,
    loginWithCloudWallet: async () => undefined,
    logout: async () => undefined,
  },
});

const WaxAuthProvider = ({
  children,
  net,
}: WaxAuthProviderProps): JSX.Element => {
  const { data } = useSWR<UserApiSessionProps>("/api/auth/me", fetcher);

  const [user, setUser] = useState<UserSession | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // anchor login
  const loginWithAnchor = async () => {
    let session: LinkSession | null;

    const anchor = anchorLink(net.endpoint, net.chainId);

    const sessionList = await anchor.listSessions(net.dApp);
    if (sessionList && sessionList.length > 0) {
      session = await anchor.restoreSession(net.dApp);
    } else {
      try {
        const sess = await anchor.login(net.dApp);
        session = sess.session;
      } catch (e) {
        throw new Error(e as any);
      }
    }

    if (!session) return;

    login({
      type: "anchor",
      wallet: String(session.auth.actor),
      permission: String(session.auth.permission),
      pubKeys: [],
    });
  };

  // cloud wallet login
  const loginWithCloudWallet = async () => {
    const waxwallet = wax(net.endpoint);

    const userAccount = await waxwallet.login();
    const pubKeys = waxwallet.pubKeys;

    login({ type: "wax-cloud-wallet", wallet: userAccount, pubKeys });
  };

  // login handler
  const login = async (user: WaxUserProps) => {
    fetch("/api/auth/login", {
      method: "POST",

      body: JSON.stringify({
        ...user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((d: APIResponseProps<WaxUserProps>) => {
        if (d.error) {
          throw new Error(d.message);
        }

        setIsLoggedIn(true);
      })
      .catch(() =>
        console.error(
          "There was a problem trying to login. If problem persists, please report this issue to its repository."
        )
      );
  };

  // logout handler
  const logout = async () => {
    if (user?.type === "anchor") {
      const anchor = anchorLink(net.endpoint, net.chainId);

      // this removes the session from the localstorage
      await anchor.clearSessions(net.dApp);
    }

    fetch("/api/auth/logout", {
      method: "GET",
    }).then(() => {
      setIsLoggedIn(false);
      setUser(undefined);
    });
  };

  useEffect(() => {
    if (!data) return;

    if (data.session) {
      setIsLoggedIn(true);
      setUser(new UserSession(data.session, net));
    }
  }, [data]);

  return (
    <WaxAuthContext.Provider
      value={{
        auth: {
          user,
          isLoggedIn,
          rpc: wax(net.endpoint).rpc,
        },
        functions: { loginWithAnchor, loginWithCloudWallet, logout },
      }}
    >
      {children}
    </WaxAuthContext.Provider>
  );
};

// provider hooks
const useWaxAuth = () => {
  const context = useContext(WaxAuthContext);
  if (context === undefined) {
    throw new Error("<WaxAuthProvider></WaxAuthProvider>");
  }

  return context;
};

/**
 * hook to get the current user wallet authenticated
 *
 * @returns {WaxAuthProps}
 */
const useWaxUser = () => {
  const { auth } = useWaxAuth();

  return auth;
};

/**
 * hook to get the auth functions
 *
 * @returns {AuthFunctions}
 */
const useAuthFunctions = () => {
  const { functions } = useWaxAuth();

  return functions;
};

export default WaxAuthProvider;
export { WaxAuthContext, useWaxUser, useAuthFunctions, useWaxAuth };
