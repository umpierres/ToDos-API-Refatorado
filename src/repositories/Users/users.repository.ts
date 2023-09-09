import { Database } from '../../database';
import { UserJSON } from '../../classes';
import { UserDTO } from '../../usecases';

export class UserRepository { 
    async doesUserExist(email:string): Promise<boolean>{
        const result = await Database.query(`SELECT * FROM users WHERE email = ${email}`)

        return !!result.rowCount; 
    }

    async createUser(dados:UserDTO): Promise<UserJSON>{
        await Database.query(`INSERT INTO users (email, password) VALUES (${dados.email,dados.password})`)
        const [lastUser] = (await Database.query(`SELECT * FROM users ORDER BY date_created DESC LIMIT 1`)).rows

        return {
            id: lastUser.id,
            email: lastUser.email,
            password: lastUser.password,
        };
    }

    async loginUser(dados: UserDTO):Promise<UserJSON | undefined> {
        const result = await Database.query(`SELECT * FROM users WHERE email = ${dados.email} AND password = ${dados.password}`)
        if(!result.rowCount) return undefined
    
        return {
            id: result.rows[0].id,
            email: result.rows[0].email,
            password: result.rows[0].password,
        };

	}
    
    async findUserByID(ownerID:string){
        const result = await Database.query(`SELECT * FROM users WHERE id = ${ownerID}`)
        if(!result.rowCount) return undefined
    
        return {
            id: result.rows[0].id,
            email: result.rows[0].email,
            password: result.rows[0].password,
        };
    }

}