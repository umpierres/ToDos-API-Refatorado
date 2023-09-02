import { users } from '../../database';
import { User } from '../../classes';
import {  UserDTO } from '../../usecases';

export class UserRepository { 
    doesUserExist(email:string){
        return users.some((user) => user.toJSON().email === email);
    }

    createUser(dados:UserDTO): User{
        const user = new User(dados.email,dados.password)
        users.push(user)

        return user;
    }

    loginUser(dados: UserDTO):User | undefined {
		return users.find(
			(user) =>
                user.toJSON().email === dados.email &&
                user.toJSON().password === dados.password
		);

	}
    findUserByID(ownerID:string){
        return users.find((user) => user.toJSON().id === ownerID);
    }

}