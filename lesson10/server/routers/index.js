import express, {Router} from "express";
import api from './api';

const router = Router();

router.use('/api', api);

router.use('/', express.static(__dirname+'/public'));

router.use('*',(req,res)=>{
    res.sendFile('/public/index.html');
})

export default router;