import { Router } from 'express';
import * as  JournalControllers from "./journal.controller";

const routes = new Router();

routes.get(
    "/journalList",
    JournalControllers.getJournalList
);

routes.post(
    "/addJournal",
    JournalControllers.addJournal
);

routes.delete(
    "/deleteJournal/:id",
    JournalControllers.deleteJournal
);

routes.put(
    "/updateJournal/:id",
    JournalControllers.updateJournal
);

routes.post(
    "/addLesson/:id/:lessonid",
    JournalControllers.addJournal
)


export default routes;
