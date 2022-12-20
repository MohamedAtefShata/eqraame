/**
 * Teacher auth middleware
 * @desc middlerware for verify if user is teacher (function must use after auth )
 * @author Mahmoud Atef
 */

const UserModel = require("../models/User.model");

module.exports = async function (req, res, next) {
  try {
    /**  throw request  @todo seprate class*/
    let err = new Error("");
    err.name = "JsonWebTokenError";

    if (!req.user) throw err;

    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user || user.role != "teacher") throw err;

    next();
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError" ||
      err.kind == "ObjectId"
    )
      return res.status(401).json({ msg: "Token is not valid." });

    console.log("error in authntication", `< ${err.name} >:${err.message}`);
    return res.status(500).json({ msg: "server error" });
  }
};
