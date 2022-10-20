import { AppDataSource } from "../data-source";
import { OrderEntity } from "../entity/OrderEntity";

export const orderRepository = AppDataSource.getRepository(OrderEntity)