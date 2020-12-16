import { Router } from 'express';
import * as  ScheduleControllers from "./schedule.controller";

const routes = new Router();

routes.get(
    "/scheduleList",
    ScheduleControllers.getScheduleList
);

routes.post(
    "/addStudent",
    ScheduleControllers.addSchedule
);

routes.delete(
    "/deleteStudent/:id",
    ScheduleControllers.deleteSchedule
);

routes.put(
    "/updateStudent/:id",
    ScheduleControllers.updateSchedule
);


export default routes;
