import {Router} from 'express';
import Comments from "../../model/Comments";

const router = Router();

router.post('/', async (req, res) => {
    try{
        res.send(JSON.stringify({_id: await Comments.createComment(req.body.comment)}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.put('/:id', async (req, res) => {
    try{
        await Comments.incLikesComment(req.params.id);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
}).delete('/:id', async (req, res) => {
    try{
        await Comments.deleteComment(req.params.id);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

export default router;