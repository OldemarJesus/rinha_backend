import {Router, Request, Response} from 'express'
import { UserDb } from '../entities/UserDb'
import { AppDataSource } from '../data-sources'

/**
 * Settings
 */
export const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const userRepo = await AppDataSource.getRepository(UserDb)
    const total =  await userRepo.count()

    return res
    .status(200)
    .send({count: total})
})