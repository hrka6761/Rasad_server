import pkg from "jsonwebtoken";
import { TOKEN_HEADER_KEY, SIGNATURE } from "../utilities/env.js";

export const authorization = (req, res, next) => {
  const token = req.header(TOKEN_HEADER_KEY);

  if (!token) {
    res.status(400).send("توکن یافت نشد !!!");
    return;
  }

  pkg.verify(token, SIGNATURE, (error, decode) => {
    if (error) res.status(401).send("توکن نامعتبر !!!");
    else {
      if (decode.id !== req.body.id) res.status(401).send("توکن نامعتبر !!!");
      else next();
    }
  });
};
