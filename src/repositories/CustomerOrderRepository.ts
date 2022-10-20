import { AppDataSource } from "../data-source";
import { CustomerOrderEntity } from "../entity/CustomerOrderEntity";

export const customerOrderRepository = AppDataSource.getRepository(CustomerOrderEntity)