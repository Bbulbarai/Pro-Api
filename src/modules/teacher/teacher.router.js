import { Router } from 'express';
import * as TeacherControllers from "./teacher.controller";
const routes = new Router();

routes.get(
  "/teacherList",
  TeacherControllers.getTeacherList
);

routes.post(
    "/addTeacher",
    TeacherControllers.addTeacher
  );

routes.delete(
    "/deleteTeacher/:id",
    TeacherControllers.deleteTeacher
  );

  routes.put(
    "/updateTeacher/:id",
    TeacherControllers.updateTeacher
  );
  

  
export default routes;