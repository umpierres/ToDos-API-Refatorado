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

    async createUser(data:UserDTO): Promise<User>{
      const { email, password } = data;
      const newUser = UserEntity.create({ email, password });
      await newUser.save();
  
      return this.entityToModel(newUser)

    }

    async loginUser(data: UserDTO): Promise<User | undefined> {
      const { email, password } = data;
      const user = await UserEntity.findOneBy({ email, password });
  
      if (!user) {
        return undefined;
      }
  
      return this.entityToModel(user)

    }
      
    
    async findUserByID(ownerID: string): Promise<User | undefined> {
      const user = await UserEntity.findOneBy({ idUser: ownerID });
  
      if (!user) {
        return undefined;
      }
  
      return this.entityToModel(user)
    }

    private entityToModel(userEntity: UserEntity): User {
      return new User(userEntity.email, userEntity.password, userEntity.idUser);
    }

}