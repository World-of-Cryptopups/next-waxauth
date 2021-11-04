import type { NextApiRequest, NextApiResponse } from "next";
import { joinString } from "../lib/utils";
import login from "./login";
import logout from "./logout";
import me from "./me";

type AuthQueries = "me" | "logout" | "login";

const handleAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const { auth } = req.query;
  const path = joinString(auth) as AuthQueries;

  switch (path) {
    case "login": {
      return login(req, res);
    }
    case "logout": {
      return logout(req, res);
    }
    case "me": {
      return me(req, res);
    }
    default: {
      return res.status(404).send("Unknown path.");
    }
  }
};

export default handleAuth;
