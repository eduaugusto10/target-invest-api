import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity('tbbalance')
export class BalanceEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'float'})
    patrimony: number

    @Column({ type: 'float'})
    balance: number

    @Column({ type: 'float'})
    balanceFree: number

    @Column({ type: 'float'})
    releases: number

    @ManyToOne(() => UserEntity, (user) => user.customerBalance)
    customer: number

    @CreateDateColumn()
    create_at: Date

    @CreateDateColumn()
    update_at: Date
}