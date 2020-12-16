import { Router } from 'express';
import * as  SublessonControllers from "./sublesson.controller";

const routes = new Router();

routes.get(
    "/subList",
    SublessonControllers.getSublessonList
);

routes.post(
    "/addSub",
    SublessonControllers.addSublesson
);

routes.delete(
    "/deleteSub/:id",
    SublessonControllers.deleteSublesson
);

routes.put(
    "/updateSub/:id",
    SublessonControllers.updateSublesson
);

export default routes;
