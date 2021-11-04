import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../lib/auth";

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req);

  if (session) {
    res.status(200).json({ session });
  } else {
    res.status(200).json({ session: null });
  }
};

export default me;
