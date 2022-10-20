import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class SessionController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        
        const user = await userRepository.findOneBy({ email })

        if (!user) {
            throw new BadRequestError("E-mail ou senha inválida")
        }

        const verifyCryptPass = await bcrypt.compare(password, user.password)
        if (!verifyCryptPass) {
            throw new BadRequestError("E-mail ou senha inválida")
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', {
            expiresIn: '8h'
        })

        const { password: _, ...userLogin } = user
        return res.json({
            user: userLogin,
            token: token
        })
    }
}