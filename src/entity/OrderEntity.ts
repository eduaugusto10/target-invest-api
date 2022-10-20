import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tborders')
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: '20' })
    symbol: string

    @Column("varchar", { length: '20' })
    ticket: string

    @Column({ type: 'float' })
    entry: number

    @Column({ type: 'float' })
    takeProfit: number

    @Column({ type: 'float' })
    stopLoss: number

    @Column({ type: 'integer' })
    typeOrder: number

    @Column({ type: 'integer' })
    operationType: number

    @Column({ type: 'float' })
    lote: number

    @Column("varchar", { length: '20' })
    status: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

}