import Iron from "@hapi/iron";
import { WaxUserProps } from "../typings/user";

const encrypt = async (data: WaxUserProps) => {
  return data && Iron.seal(data, process.env.SECRET_TOKEN || "", Iron.defaults);
};

const decrypt = async (data: string) => {
  return (
    data && Iron.unseal(data, process.env.SECRET_TOKEN || "", Iron.defaults)
  );
};

export { encrypt, decrypt };
