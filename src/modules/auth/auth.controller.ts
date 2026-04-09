import { Router } from 'express';

import type { Request , Response } from 'express';

const router: Router = Router()

router.post('/login', (req: Request,res: Response)=>{
    res.json({message: 'login'})
})

export default router ;