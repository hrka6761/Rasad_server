import pkg from "jsonwebtoken";
import { SIGNATURE } from "../utilities/env.js";

export async function authorization(token, id) {
  if (!token) {
    return true;
  }

  if (!id) {
    return true;
  }

  let result;

  await pkg.verify(token, SIGNATURE, (error, decode) => {
    if (error) result = true;
    else {
      if (decode.id !== id) result = true;
      else result = true;
    }
  });

  return result;
}
