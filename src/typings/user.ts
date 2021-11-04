import { JsonRpc } from "eosjs";
import UserSession from "../lib/user";

type WaxWalletType = "wax-cloud-wallet" | "anchor";

interface WaxUserProps {
  type: WaxWalletType; // wax-cloud-wallet || anchor
  wallet: string;
  permission?: string;
  pubKeys: string[]; // only used by wax cloud wallet
}

interface WaxAuthProps {
  user?: UserSession;
  isLoggedIn: boolean;
  rpc?: JsonRpc;
}

interface UserApiSessionProps {
  session: WaxUserProps | null;
}

export type { WaxUserProps, WaxWalletType, WaxAuthProps, UserApiSessionProps };
