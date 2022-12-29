/**
 * Teacher auth middleware
 * @desc middlerware for verify if user is teacher (function must use after auth )
 * @author Mahmoud Atef
 */

const UserModel = require("../models/User.model");
const BadRequestError = require("../utils/BadRequestError");

module.exports = async function (req, res, next) {
  try {
    if (!req.user) throw new BadRequestError("Token is not valid.", 401);

    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user || user.role != "admin")
      throw new BadRequestError("You are not allowed to go there", 401);

    next();
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError" ||
      err.kind == "ObjectId"
    )
      err = new BadRequestError("Token is not valid.", 401);

    if (err.name === "BadRequest") return res.status(err.status).json(err.json);

    console.log("error in authntication", `< ${err.name} >:${err.message}`);
    return res.status(500).json({ msg: "server error" });
  }
};
