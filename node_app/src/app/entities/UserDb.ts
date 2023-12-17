import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class UserDb extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    apelido: string
    @Column({unique: true})
    nome: string
    @Column()
    nascimento: string
    @Column('simple-array', { nullable: true })
    stack: string[]
    @Column()
    search: string
}