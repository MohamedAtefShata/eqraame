/**
 * Error Handler middleware
 * @description Erro handler middleware to check if there error in final request to retutn response
 * @author Mahmoud Atef
 */

module.exports = (error, req, res, next) => {
  const status = error.status || 500;
  const location = error.location || "";
  const name = error.name || "Error";
  const message = error.message || "";
  const errors = error.json || [{ msg: "Internal server error" }];
  const stack = error.stack;

  // log and response
  console.log(`error happend in (${location}) : < ${name}> : ${message}`);
  // console.log(`stack : ${stack}`);
  return res.status(status).json({ errors });
};
