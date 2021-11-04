import { NextApiRequest, NextApiResponse } from "next";
import { getSession, removeSession } from "../lib/auth";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req);

  if (session) {
    // clear session if exists
    removeSession(res);
  }

  res.status(200).json({ error: false, message: "Sucessfully logged out." });
};

export default logout;
