import { Entity , PrimaryColumn ,Column, BeforeInsert , BaseEntity} from "typeorm"

@Entity({name:'tasks'})
export class NoteEntity extends BaseEntity{
    @PrimaryColumn({name:'id_task', type: 'uuid'})
    idTask!: string;
    
    @PrimaryColumn({name:'id_user'})
    idUser!: string;

    @Column({length:255, type:'varchar'})
    title!:string;

    @Column({type:'text'})
    description!:string;

    @Column({name:'date_created'})
    dateCreated!:Date;

    @Column({name:'date_updated'})
    dateUpdated!:Date;

    @Column({default: false})
    favorited!:boolean;

    @Column({default: false})
    archived!:boolean;

    @BeforeInsert()
    beforeInsert(){
        this.dateCreated = new Date()
        this.dateUpdated = new Date()
    }
}
