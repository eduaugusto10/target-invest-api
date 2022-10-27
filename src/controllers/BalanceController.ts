import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { balanceRepository } from "../repositories/BalanceRepository";

export class BalanceController {
    async store(req: Request, res: Response) {
        const { patrimony, balance, balanceFree, releases, customer } = req.body

        const balances = balanceRepository.create({ customer, patrimony, balance, balanceFree, releases })

        await balanceRepository.save(balances)
        return res.send()
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params

        const balances = await balanceRepository.findOneBy({ customer: Number(id) })

        if(!balances){
            throw new BadRequestError("Nenhum balanço encontrado")
        }
        return res.json(balances)
    }
}