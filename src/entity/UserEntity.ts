import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { BalanceEntity } from "./BalanceEntity"
import { CustomerManagerEntity } from "./CustomerManagerEntity"
import { CustomerOrderEntity } from "./CustomerOrderEntity"
import { DarfEntity } from "./DarEntity"

@Entity('tbuser')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: '100' })
    name: string

    @Column("varchar", { length: '100' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column("varchar", { length: '100' })
    account: number

    @Column("varchar", { length: '20' })
    administrator: string

    @Column('varchar', { length: '20' })
    ativated: string

    @OneToMany(() => CustomerOrderEntity, (customerorder) => customerorder.customerOrder)
    customerOrder: CustomerOrderEntity[]

    @OneToMany(() => CustomerManagerEntity, (operation) => operation.customer)
    customer: CustomerManagerEntity[]

    @OneToMany(() => DarfEntity, (customerDarf) => customerDarf.customerDarf)
    customerDarf: DarfEntity[]

    @OneToMany(() => BalanceEntity, (customer) => customer.customer)
    customerBalance: DarfEntity[]

    @Column({ type: 'datetime' })
    validate: Date

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

}
