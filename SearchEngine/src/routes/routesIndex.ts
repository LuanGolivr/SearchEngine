import {Router} from 'express';

const router = Router();

//insert all the routes here bellow
//router.get('/', controllerhere);
router.get('/', (req, res)=>{

    res.render('pages/home');
});

router.get('/result', (req, res)=>{
    res.render('pages/result');
});



export default router;