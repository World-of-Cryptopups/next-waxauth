import { WaxJS } from "@waxio/waxjs/dist";
import { anchorLink } from "../auth/walletproviders";
import { WaxNetProps } from "../typings/net";
import { WaxUserProps, WaxWalletType } from "../typings/user";

class UserSession {
  readonly type: WaxWalletType | string;
  readonly wallet: string;
  readonly pubKeys: string[];
  readonly permission: string;
  net: WaxNetProps;

  constructor(user: WaxUserProps | null, net: WaxNetProps) {
    this.type = user?.type || "";
    this.wallet = user?.wallet || "";
    this.pubKeys = user?.pubKeys || [];
    this.permission = user?.permission ?? "active"; // it will use active as default permission if it is null

    this.net = net;
  }

  async session() {
    switch (this.type) {
      case "wax-cloud-wallet": {
        return new WaxJS({
          rpcEndpoint: this.net.endpoint,
          userAccount: this.wallet,
          pubKeys: this.pubKeys,
        }).api;
      }
      case "anchor": {
        const sess = await anchorLink(
          this.net.endpoint,
          this.net.chainId
        ).restoreSession(this.net.dApp);
        return sess;
      }

      default: {
        // do nothing
        throw new Error("Wallet not supported!");
      }
    }
  }
}

export default UserSession;
