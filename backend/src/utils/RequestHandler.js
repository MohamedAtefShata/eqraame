const responseHandler = async (res, fun) => {
  try {
    // invoking function
    await fun();
    //return res.json({ msg: "successful added" });
  } catch (error) {
    // transform some errors to BadReauest
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    )
      error = new BadRequestError("Token is not valid.", 401);

    if (error.kind == "ObjectId")
      error = new BadRequestError("Invalid id", 400);

    // handle bad request response
    if (error.name === "BadRequest")
      return res.status(error.status).json(error.json);

    // logging error and return server error
    console.log("error in request :", `< ${error.name} >:${error.message}`);
    console.log(error.stack);
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = responseHandler;
