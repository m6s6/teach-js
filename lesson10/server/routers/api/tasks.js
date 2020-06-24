import {Router} from 'express';
import Tasks from "../../model/Tasks";
import commentsRouter from './comments';

const router = Router();

outer.get('/', async (req, res) => {
    try{

        const tasks = await Tasks.getAllTasksWithComments();

        res.send(JSON.stringify(tasks))
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
}).post('/', async (req, res) => {
    try{
        res.send(JSON.stringify({_id: await Tasks.createTask(req.body.task)}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.put('/:id', async (req, res) => {
    try{
        await Tasks.updateTask(req.params.id, req.body.task);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
}).delete('/:id', async (req, res) => {
    try{
        await Tasks.deleteTask(req.params.id);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});


router.use('/comments', commentsRouter);

export default router;