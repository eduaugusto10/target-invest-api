import { AppDataSource } from "../data-source";
import { BalanceEntity } from "../entity/BalanceEntity";


export const balanceRepository = AppDataSource.getRepository(BalanceEntity)