import { Request, Response, NextFunction } from 'express'
import User from '../entities/User'
import { isValidDate } from '../utils/validate-date-format'
import { validateRequirements } from '../utils/validate-stack-character'

export const userValidationMidleware = (req: Request, res: Response, next: NextFunction) => {
    const userReq: User = req.body

    // check mandatory data
    if (
        userReq.apelido == undefined ||
        userReq.apelido.length == 0 ||
        userReq.nascimento == undefined ||
        userReq.nascimento.length == 0 ||
        userReq.nome == undefined ||
        userReq.nome.length == 0) {
        return res.status(422)
            .send({ error: "falta dados obrigatorios" })
    }

    // check user data requirements
    if (
        userReq.apelido.length > 32 ||
        userReq.nome.length > 100) {
        return res.status(422)
            .send({ error: "numero excessivo de caracters" })
    }

    // check user date
    if (!isValidDate(userReq.nascimento)) {
        return res.status(422)
            .send({ error: "data invalida" })
    }

    // check stack
    if (userReq.stack != undefined && !validateRequirements(userReq.stack)) {
        return res.status(422)
            .send({ error: "stack invalido" })
    }

    next()
}