import { User } from '../../classes';
import { UserDTO } from '../../usecases';
import { UserEntity } from '../../database/entities/user.entity';
import { pgHelper } from '../../database';

export class UserRepository { 
    async doesUserExist(email:string): Promise<boolean>{
      const manager = pgHelper.client.manager
      const userExist = await manager.findOneBy(UserEntity,{email})

        return !!userExist
    }

    async createUser(data:UserDTO): Promise<User>{
      const manager = pgHelper.client.manager
      const { email, password } = data;
      const newUser = manager.create(UserEntity,{ email, password });
      const userCreated = await manager.save(newUser);
  
      return this.entityToClass(userCreated)

    }

    async loginUser(data: UserDTO): Promise<User | undefined> {
      const { email, password } = data;
      const manager = pgHelper.client.manager
      const user = await manager.findOneBy(UserEntity,{ email, password });
  
      if (!user) {
        return undefined;
      }
  
      return this.entityToClass(user)

    }
      
    
    async findUserByID(ownerID: string): Promise<User | undefined> {
      const manager = pgHelper.client.manager
      const user = await manager.findOneBy(UserEntity,{ id: ownerID });
  
      if (!user) {
        return undefined;
      }
  
      return this.entityToClass(user)
    }

    private entityToClass(userEntity: UserEntity): User {
      return new User(userEntity.id, userEntity.email, userEntity.password );
    }

}