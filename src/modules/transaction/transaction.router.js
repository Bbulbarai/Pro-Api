import { Router } from 'express';
import * as  TransactionControllers from "./transaction.controller";

const routes = new Router();

routes.get(
    "/tranList",
    TransactionControllers.getTransactiontList
);

routes.post(
    "/addtran",
    TransactionControllers.addTransaction
);

routes.delete(
    "/deletetran/:id",
    TransactionControllers.deleteTransaction
);

routes.put(
    "/updatetran/:id",
    TransactionControllers.updateTransaction
);



export default routes;
