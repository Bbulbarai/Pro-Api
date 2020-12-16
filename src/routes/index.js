import { Router } from 'express';
import BannerRoutes from '../modules/banner/banner.routes';
import TeacherRoutes from '../modules/teacher/teacher.router';
import Student from '../modules/student/student.router';
import Lesson from '../modules/lesson/lesson.router';
import Sublesson from '../modules/sublesson/sublesson.router';
import Journal from '../modules/journal/journal.router';
import Transaction from '../modules/transaction/transaction.router'

const routes = new Router();

routes.use("/v1/banners", BannerRoutes);
routes.use("/v1/teacher", TeacherRoutes);
routes.use("/v1/student", Student);
routes.use("/v1/lesson", Lesson);
routes.use("/v1/sublesson", Sublesson);
routes.use("/v1/journal", Journal);
routes.use("/v1/transaction", Transaction);
export default routes;
