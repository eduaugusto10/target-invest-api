import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { darfRepository } from "../repositories/DarfRepository";
import { userRepository } from "../repositories/UserRepository";

export class DarfController {
    async store(req: Request, res: Response) {
        const { customerDarf, filename, urlFile, dueDate, value } = req.body
        const user = await userRepository.findOneBy({ id: customerDarf })

        if (!user) {
            throw new BadRequestError("Usuário não encontrado")
        }

        const darf = await darfRepository.create({
            customerDarf, filename, urlFile, dueDate, value
        })

        darfRepository.save(darf)
        return res.send()
    }
    async update(req: Request, res: Response) { }
    async getDarfById(req: Request, res: Response) {
        const { id } = req.params
        const darfs = await darfRepository.findAllDarfById(Number(id))

        if (darfs.length == 0) {
            throw new BadRequestError("Nenhuma darf disponível")
        }

        return res.status(200).json(darfs)
    }
    async getAll(req: Request, res: Response) { }
    async delete(req: Request, res: Response) { }

}