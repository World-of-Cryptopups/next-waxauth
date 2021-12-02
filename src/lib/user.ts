import { WaxJS } from "@waxio/waxjs/dist";
import { TransactOptions } from "anchor-link";
import { TransactConfig } from "eosjs/dist/eosjs-api-interfaces";
import { Action } from "eosjs/dist/eosjs-serialize";
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

  /**
   * Send a transaction. This is a custom wrapper to the transact function from `waxjs` and `anchor-link`.
   *
   * @param {Action[]} actions
   * @param {TransactConfig&TransactOptions} options?
   * @returns {TransactResult}
   */
  async transact(
    actions: Action[],
    options?: TransactConfig & TransactOptions
  ) {
    const session = await this._session();

    return await session?.transact({ actions }, { ...options });
  }

  private async _session() {
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
