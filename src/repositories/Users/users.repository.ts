import { Database } from '../../database';
import { UserJSON } from '../../classes';
import { UserDTO } from '../../usecases';

export class UserRepository { 
    async doesUserExist(email:string): Promise<boolean>{
        const result = await Database.query(`SELECT * FROM users WHERE email = $1`, [email])

        return !!result.rowCount; 
    }

    async createUser(data:UserDTO): Promise<UserJSON>{
        const {email, password} = data
        const query = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id, email, password
      `;

        const queryParams = [email, password];  

        const result = await Database.query(query, queryParams);
        const [newUser] = result.rows;
        
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
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return undefined;
        }
      
        const user = result.rows[0];
      
        return {
          id: user.id,
          email: user.email,
          password: user.password,
        };
      }
      
    
      async findUserByID(ownerID: string): Promise<UserJSON | undefined> {
        const query = `
          SELECT *
          FROM users
          WHERE id = $1
        `;
      
        const queryParams = [ownerID];
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return undefined; 
        }
      
        const user = result.rows[0];
      
        return {
          id: user.id,
          email: user.email,
          password: user.password,
        };
      }
      

}