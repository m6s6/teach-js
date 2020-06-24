import {Router} from "express";
import taskRouter from './tasks';

const router = Router();

router.use('/tasks', tasksRouter);



export default router;