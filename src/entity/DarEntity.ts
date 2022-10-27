import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity('tbdarf')
export class DarfEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    filename: string

    @Column({ type: 'date' })
    dueDate: Date

    @Column({ type: 'float' })
    value: number

    @Column({type:'varchar'})
    urlFile: string

    @ManyToOne(() => UserEntity, (user) => user.customerDarf)
    customerDarf: number

    @CreateDateColumn()
    create_at: Date

    @CreateDateColumn()
    update_at: Date

}