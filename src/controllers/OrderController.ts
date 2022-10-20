import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { orderRepository } from "../repositories/OrderRepository";

export class OrderController {
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
            date,
            operationType
        } = req.body

        const order = orderRepository.create({
            symbol,
            ticket,
            entry,
            takeProfit,
            stopLoss,
            typeOrder,
            lote,
            status,
            operationType
        })

        await orderRepository.save(order)

        res.json(order)
    }
    async getById(req: Request, res: Response) {
        const { id } = req.params
        const order = await orderRepository.findOneBy({ id: Number(id) })

        if (!order) {
            throw new BadRequestError("Ordem não encontrada")
        }

        return res.json(order)
    }

    async getAll(req: Request, res: Response) {
        const orders = await orderRepository.find()

        if (!orders) {
            throw new BadRequestError("Nenhum ordem encontrada")
        }

        return res.json(orders)
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params
        const order = await orderRepository.findOneBy({ id: Number(id) })

        if (!order) {
            throw new BadRequestError("Ordem não encontrada")
        }

        await orderRepository.remove(order)

        res.send()
    }

    async getOrderToday(req: Request, res: Response) {
        const orders = await orderRepository.createQueryBuilder()
            .select('*')
            .where("create_at > (now() - INTERVAL 10 minute)")
            .getRawMany()

        const order = { "orders": orders, "length": orders.length }
        return res.json(order)
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
            operationType
        } = req.body

        const order = await orderRepository.findOneBy({ id: Number(id) })

        if (!order) {
            throw new BadRequestError("Ordem não encontrada")
        }

        await orderRepository.update(Number(id), {
            symbol,
            ticket,
            entry,
            takeProfit,
            stopLoss,
            typeOrder,
            lote,
            status,
            operationType
        })

        return res.send()
    }
}
