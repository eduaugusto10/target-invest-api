import { AppDataSource } from "../data-source"
import { CustomerManagerEntity } from "../entity/CustomerManagerEntity"

export const customerManagerRepository = AppDataSource.getRepository(CustomerManagerEntity)