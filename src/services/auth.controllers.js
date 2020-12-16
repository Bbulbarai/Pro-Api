import HTTPStatus from "http-status";

export function checkUserRole(roles = []) {
  return async function (req, res, next) {
    const user = req.user;
    if (roles.includes(user.role)) {
      return next();
    }
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }
}