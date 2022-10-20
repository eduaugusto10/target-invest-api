import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity('tbcustomermanager')
export class CustomerManagerEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'float' })
    balance: number

    @Column({ type: 'float' })
    balanceToday: number

    @Column({ type: 'datetime' })
    date: Date

    @ManyToOne(() => UserEntity, (user) => user.customer)
    customer: UserEntity

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date
}