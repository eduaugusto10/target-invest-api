import { AppDataSource } from "../data-source"
import { CustomerManagerEntity } from "../entity/CustomerManagerEntity"

export const customerManagerRepository = AppDataSource.getRepository(CustomerManagerEntity).extend({
    findLast30(id: number, days: number) {
        return this.createQueryBuilder()
            .select("balance")
            .addSelect("DAY(date)", "day")
            .addSelect("MONTH(date)", "month")
            .addSelect("Year(date)", "year")
            .where("customerId = :id", { id })
            .andWhere("date > (now() - INTERVAL :days day)", { days })
            .orderBy("date", "ASC")
            .getRawMany()
    },
    findLastAll(id: number, days: number) {
        return this.createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("DAY(date)", "day")
            .addSelect("MONTH(date)", "month")
            .addSelect("Year(date)", "year")
            .where("customerId = :id", { id })
            .andWhere("date > (now() - INTERVAL :days day)", { days })
            .groupBy("MONTH(date)")
            .orderBy("date", "ASC")
            .getRawMany()
    }
})