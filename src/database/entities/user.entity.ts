import { Entity , PrimaryColumn,Column, BeforeInsert, BaseEntity} from "typeorm"

@Entity({name:'users'})
export class UserEntity extends BaseEntity{
    @PrimaryColumn({name:'id_user'})
    idUser!: string;

    @Column({unique:true, length:250, type:'varchar'})
    email!:string;

    @Column({length:250, type:'varchar'})
    password!:string;

    @Column({name:'date_created'})
    dateCreated!:Date;

    @BeforeInsert()
    beforeInsert(){
        this.dateCreated = new Date()
    }
}
