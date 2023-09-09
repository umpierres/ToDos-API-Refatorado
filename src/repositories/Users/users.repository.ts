import { UUID } from 'crypto';
import { User, UserJSON } from '../../classes';
import { pgHelper } from '../../database';
import { UserDTO } from '../../usecases';
import { UserEntity } from '../../database/entity/user.entity';

export class UserRepository { 
    async doesUserExist(email:string): Promise<boolean>{
      const userExist = await UserEntity.findOneBy({email})

        return !!userExist
    }

    async createUser(data:UserDTO): Promise<UserJSON>{
      const { email, password } = data;
      const newUser = UserEntity.create({ email, password });
      await newUser.save();
  
      return {
        id: newUser.idUser as UUID,
        email: newUser.email,
        password: newUser.password,
      };
    }

    async loginUser(data: UserDTO): Promise<UserJSON | undefined> {
      const { email, password } = data;
      const user = await UserEntity.findOneBy({ email, password });
  
      if (!user) {
        return undefined;
      }
  
      return {
        id: user.idUser as UUID,
        email: user.email,
        password: user.password,
      };
    }
      
    
    async findUserByID(ownerID: string): Promise<UserJSON | undefined> {
      const user = await UserEntity.findOneBy({ idUser: ownerID });
  
      if (!user) {
        return undefined;
      }
  
      return {
        id: user.idUser as UUID,
        email: user.email,
        password: user.password,
      };
    }


}