import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { customerOrderRepository } from "../repositories/CustomerOrderRepository";
import { userRepository } from "../repositories/UserRepository";

export class CustomerOrderController {
    async store(req: Request, res: Response) {
        const {
            symbol,
            ticket,
            entry,
            takeProfit,
            stopLoss,
            typeOrder,
            lote,
            status,
            operationType,
            id
        } = req.body

        const user = await userRepository.findOneBy({ id })

        if (!user) {
            throw new BadRequestError("Usuário não encontrado ou inativo")
        }
        const order = customerOrderRepository.create({
            symbol,
            ticket,
            entry,
            takeProfit,
            stopLoss,
            typeOrder,
            lote,
            status,
            operationType,
            customerOrder: id
        })

        await customerOrderRepository.save(order)

        res.json(order)
    }


    async getById(req: Request, res: Response) {
        const { id } = req.params
        const order = await customerOrderRepository.findOneBy({ id: Number(id) })

        if (!order) {
            throw new BadRequestError("Ordem não encontrada")
        }

        return res.json(order)
    }

    async getAll(req: Request, res: Response) {
        const orders = await customerOrderRepository.find()

        if (!orders) {
            throw new BadRequestError("Nenhuma ordem encontrada")
        }

        return res.json(orders)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const order = await customerOrderRepository.findOneBy({ id: Number(id) })

        if (!order) {
            throw new BadRequestError("Ordem não encontrada")
        }

        await customerOrderRepository.remove(order)

        res.send()
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const {
            symbol,
            ticket,
            entry,
            takeProfit,
            stopLoss,
            typeOrder,
            lote,
            status,
            operationType,
            customerOrder
        } = req.body

        const order = await customerOrderRepository.findOneBy({ id: Number(id) })

        if (!order) {
            throw new BadRequestError("Ordem não encontrada")
        }

        await customerOrderRepository.update(Number(id), {
            symbol,
            ticket,
            entry,
            takeProfit,
            stopLoss,
            typeOrder,
            lote,
            status,
            operationType,
            customerOrder
        })

        return res.send()
    }
}
