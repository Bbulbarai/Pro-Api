import { Router } from 'express';
import * as  LessonControllers from "./lesson.controller";

const routes = new Router();

routes.get(
    "/lessonList",
    LessonControllers.getLessonList
);

routes.post(
    "/addLesson",
    LessonControllers.addlesson
);

routes.delete(
    "/deleteLesson/:id",
    LessonControllers.deletelesson
);

routes.put(
    "/updateLesson/:id",
    LessonControllers.updatelesson
);


export default routes;
