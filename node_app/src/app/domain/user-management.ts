import { Router, Request, Response } from 'express'
import { userValidationMidleware } from '../midleware/user-validation'
import User from '../entities/User'
import { UserDb } from '../entities/UserDb'
import { AppDataSource } from '../data-sources'
import { Like } from 'typeorm'

/**
 * Settings
 */
export const router = Router()

/**
 * Router
 */

router.post('/', userValidationMidleware, async (req: Request, res: Response) => {
    const userRepository = await AppDataSource.getRepository(UserDb)

    const userReqData: User = req.body
    const userData = new UserDb()
    userData.apelido = userReqData.apelido
    userData.nascimento = userReqData.nascimento
    userData.nome = userReqData.nome
    userData.stack = userReqData.stack
    userData.search = `${userReqData.apelido},${userReqData.nome},${userReqData.stack.join(',')}`

    await userRepository.save(userData)

    const createdUser = await userRepository.findOneBy({
        nome: userData.nome,
    })

    return res
        .status(201)
        .send(createdUser)
})

router.get('/', async (req: Request, res: Response) => {
    const searchTerm = req.query.t
    const userRepo = await AppDataSource.getRepository(UserDb)

    const userData = await userRepo.find({
        where: {
            search: Like(`%${searchTerm}%`)
        },
        select: {
            id: true,
            nome: true,
            apelido: true,
            nascimento: true,
            stack: true
        },
        take: 50
    })

    return res.status(200).send(userData)
})

router.get('/:id', async (req: Request, res: Response) => {
    const userRepo = await AppDataSource.getRepository(UserDb)
    const targetUser = await userRepo.findOneBy({
        id: req.params.id,
    })

    return res
        .status(200)
        .send(targetUser)
})