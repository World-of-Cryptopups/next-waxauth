# next-waxauth

Next.js authenticator for wax.
This uses sessions as storage for the details of a wax wallet / user.

### Supported Wallets

- **[Wax Cloud Wallet](https://wallet.wax.io/)**
- **[Anchor](https://greymass.com/anchor/)**

## Install

```
npm install @cryptopuppie/next-waxauth
```

```
yarn add @cryptopuppie/next-waxauth
```

```
pnpm add @cryptopuppie/next-waxauth
```

## Usage

- Implement the provider

```tsx
// pages/_app.tsx

import WaxAuthProvider from "@cryptopuppie/next-waxauth";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const endpoint = "https://waxtestnet.greymass.com"; // provide the wax net to use
const chainId =
  "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12"; // provide the chainId of the wax net

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WaxAuthProvider net={{ endpoint, chainId, dApp: "simpleapp" }}>
      <Component {...pageProps} />
    </WaxAuthProvider>
  );
}
export default MyApp;
```

- Add the API handler

```ts
// pages/api/auth/[auth].ts

import { handleAuth } from "@cryptopuppie/next-waxauth";

export default handleAuth;
```

- Use the hooks provided in any components / page

```tsx
// pages/components/some-component.tsx

import { useWaxUser, useAuthFunctions } from "@cryptopuppie/next-waxauth";

export default MyComponent() {
    const { logout, loginWithCloudWallet, loginWithAnchor } = useAuthFunctions();
    const { user, isLoggedIn } = useWaxUser()

    if (isLoggedIn) {
        return (
            <div>
                <p>You are logged in as {user.wallet}</p>
                <button onClick={logout}>logout</button>
            </div>
        );
    }

    return (
        <div>
            <p>You are currently not logged in.</p>

            <button onClick={loginWithCloudWallet}>login with cloud wallet</button>
            <button onClick={loginWithAnchor}>login with anchor</button>
        </div>
    );
}

```

##

#### &copy; 2021 [World of Cryptopups](https://www.worldofcryptopups.cf/) | [License](./LICENSE)
