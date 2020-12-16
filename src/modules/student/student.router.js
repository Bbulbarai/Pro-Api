import { Router } from 'express';
import * as  StudentControllers from "./student.controller";

const routes = new Router();

routes.get(
    "/studentList",
    StudentControllers.getStudentList
);

routes.post(
    "/addStudent",
    StudentControllers.addStudent
);

routes.delete(
    "/deleteStudent/:id",
    StudentControllers.deleteStudent
);

routes.put(
    "/updateStudent/:id",
    StudentControllers.updateStudent
);

routes.post(
    "/addLesson/:id/:lessonid",
    StudentControllers.addLesson
)


export default routes;
