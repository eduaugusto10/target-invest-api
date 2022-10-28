import { AppDataSource } from "../data-source";
import { BalanceEntity } from "../entity/BalanceEntity";


export const balanceRepository = AppDataSource.getRepository(BalanceEntity).extend({
    findLastBalance(id: number) {
        return this.createQueryBuilder()
            .select("*")
            .where("customerId=:id", { id })
            .orderBy("id", "DESC")
            .getRawOne()
    }
})