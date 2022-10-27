import { AppDataSource } from "../data-source";
import { DarfEntity } from "../entity/DarEntity";

export const darfRepository = AppDataSource.getRepository(DarfEntity).extend({
    findAllDarfById(id: number) {
        return this.createQueryBuilder()
            .select("filename")
            .addSelect("urlFile")
            .addSelect("dueDate")
            .addSelect("value")
            .where("customerDarfId = :id", { id })
            .orderBy("dueDate", "ASC")
            .getRawMany()
    }
})