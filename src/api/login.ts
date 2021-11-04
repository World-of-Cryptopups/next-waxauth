import { NextApiRequest, NextApiResponse } from "next";
import { createSession, getSession } from "../lib/auth";
import { WaxUserProps } from "../typings/user";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    // if request is not post, return method not allowd
    res.status(405).json({
      error: true,
      message: `Method: ${req.method} not allowed.`,
    });
    return;
  }

  // ignore if already logged in
  const session = await getSession(req);
  if (session) {
    res
      .status(200)
      .json({ error: false, data: {}, message: "Already logged in." });
    return;
  }

  const { type, wallet, pubKeys, permission } = req.body as WaxUserProps;

  if (!type || !wallet) {
    res.status(400).json({ error: true, data: {}, message: "Missing Values!" });
    return;
  }

  const sess = { type, wallet, pubKeys, permission };

  // store session
  await createSession(res, sess);

  // return login data
  res
    .status(200)
    .json({ error: false, data: sess, message: "Logged in successfully!" });
};

export default login;
