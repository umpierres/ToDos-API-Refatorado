import { UUID } from 'crypto';
import { UserJSON } from '../../classes';
import { pgHelper } from '../../database';
import { UserDTO } from '../../usecases';

export class UserRepository { 
    async doesUserExist(email:string): Promise<boolean>{
        const result = await pgHelper.client.query(`SELECT * FROM users WHERE email = $1`, [email])

        return result.length != 0; 
    }

    async createUser(data:UserDTO): Promise<UserJSON>{
        const {email, password} = data
        const query = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id_user, email, password
      `;

        const queryParams = [email, password];  

        const result = await pgHelper.client.query(query, queryParams);
        const [newUser] = result;
        
        return {
            id: newUser.id,
            email: newUser.email,
            password: newUser.password,
        };
    }

    async loginUser(data: UserDTO): Promise<UserJSON | undefined> {
        const { email, password } = data;
        const query = `
          SELECT *
          FROM users
          WHERE email = $1
          AND password = $2
        `;
      
        const queryParams = [email, password];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return undefined;
      
        const [user] = result;
      
        return {
          id: user.id_user,
          email: user.email,
          password: user.password,
        };
      }
      
    
      async findUserByID(ownerID: string): Promise<UserJSON | undefined> {
        const query = `
          SELECT *
          FROM users
          WHERE id_user = $1
        `;
      
        const queryParams = [ownerID];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return undefined; 
        
      
        const user = result;
      
        return {
          id: user.id_user as UUID,
          email: user.email,
          password: user.password,
        };
      }
      

}