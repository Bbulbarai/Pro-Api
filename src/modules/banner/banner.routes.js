import { Router } from 'express';
import * as BannerControllers from "./banner.controllers";
import { authUserLogin, authUserJwt } from "../../services/auth.services";
import { checkUserRole } from "../../services/auth.controllers";
const routes = new Router();

routes.get(
  "/bannerList",
  BannerControllers.bannerList
);

routes.delete(
  "/banner/:id",
  authUserJwt,
  checkUserRole(["super-admin"]),
  BannerControllers.deleteBanner
);

export default routes;