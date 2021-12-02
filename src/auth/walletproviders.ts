import * as waxjs from "@waxio/waxjs/dist";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";

const anchorTransport = new AnchorLinkBrowserTransport();
const anchorLink = (endpoint: string, chainId: string) => {
  return new AnchorLink({
    transport: anchorTransport,
    verifyProofs: true,
    chains: [{ chainId: chainId, nodeUrl: endpoint }],
  });
};

const wax = (endpoint: string) => {
  return new waxjs.WaxJS({ rpcEndpoint: endpoint, tryAutoLogin: false });
};

interface AuthFunctions {
  loginWithCloudWallet: () => Promise<void>;
  loginWithAnchor: () => Promise<void>;
  logout: () => Promise<void>;
}

export { wax, anchorLink };
export type { AuthFunctions };
