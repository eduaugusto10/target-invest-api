import { Request, Response } from "express";
import { send } from "process";
import { BadRequestError, PaymentRequireError } from "../helpers/api-errors";
import { customerManagerRepository } from "../repositories/CustomerManagerRepository";
import { userRepository } from "../repositories/UserRepository";

export class CustomerManagerController {
    async store(req: Request, res: Response) {
        const { balance, date, id } = req.body

        const user = await userRepository.findOneBy({ id })
        if (!user) {
            throw new BadRequestError('Usuário não encontrado')
        }
        if (user.ativated === "N") {
            throw new PaymentRequireError('Conta desativada, entre em contato conosco')
        }

        const order = customerManagerRepository.create({
            customer: id,
            balance,
            date
        })

        await customerManagerRepository.save(order)

        res.status(200).json(order)
    }

    async getById(req: Request, res: Response) {
        const { id, days } = req.params
        let balance
        if (Number(days) > 30) balance = await customerManagerRepository.findLastAll(Number(id), Number(days))
        else balance = await customerManagerRepository.findLast30(Number(id), Number(days))


        if (!balance) {
            throw new BadRequestError("Nenhuma ordem encontrada")
        }
console.log(balance)
        res.send(balance)
    }

    async getAll(req: Request, res: Response) {
        const balanceTotal = await customerManagerRepository
            .createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("Month(date)", "month")
            .addSelect("Year(date)", "year")
            .where("date > (now() - INTERVAL 12 month)")
            .groupBy("MONTH(date)")
            .orderBy("date", "ASC")
            .getRawMany()

        if (!balanceTotal) {
            throw new BadRequestError("Nenhuma ordem encontrada")
        }

        res.send(balanceTotal)
    }

    async delete(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {

    }

    async createOrUpdate(req: Request, res: Response) {
        const { account } = req.params
        const { balance, date, balanceToday } = req.body

        const user
            = await userRepository.createQueryBuilder()
                .select("*")
                .where("account=:account", { account })
                .getRawMany()

        if (!user) {
            throw new BadRequestError('Usuário não encontrado')
        }

        const dates = date.replaceAll(".", "-")

        const balanceMonth = await customerManagerRepository.createQueryBuilder()
            .select("*")
            .where("Month(now())=Month(date)")
            .andWhere("customerId = :id", { id: user[0].id })
            .getRawMany()

        if (balanceMonth.length == 0) {
            const newBalance = customerManagerRepository.create({
                customer: user[0].id,
                balance,
                balanceToday,
                date: dates
            })

            await customerManagerRepository.save(newBalance)

            return res.status(200).json(newBalance)
        }
        const newBalance = customerManagerRepository.update({ id: balanceMonth[0].id }, {
            balance,
            balanceToday,
            date: dates,
            customer: user[0].id
        })
        return res.json(newBalance)
    }
}
