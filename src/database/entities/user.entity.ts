import {Entity, PrimaryColumn, Column, BaseEntity, OneToMany} from "typeorm"
import { NoteEntity } from "./note.entity";

@Entity({name:'users'})
export class UserEntity extends BaseEntity{
    @PrimaryColumn({name:'id', type: 'uuid'})
    id!: string;

    @Column({unique:true, length:250, type:'varchar'})
    email!:string;

    @Column({length:250, type:'varchar'})
    password!:string;

    @Column({name:'date_created'})
    dateCreated!:Date;

    @OneToMany(() => NoteEntity, (notes) => notes.idUser)
    notes!: NoteEntity[]
}
