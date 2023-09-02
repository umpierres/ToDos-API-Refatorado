import { UserJSON } from '../../classes';
import { UserRepository } from '../../repositories';

export type UserDTO = {
    email:string,
    password: string,
}

export type ReturnCreateUser = {
	success: boolean;
	message: string;
	newUserData?: Omit<UserJSON, 'password'>;
};

export class CreateUser{
    public execute(newUser: UserDTO): ReturnCreateUser{
        const repository = new UserRepository();

        if(repository.doesUserExist(newUser.email)){
            return {
				success: false,
				message: 'Usuário já existe.',
			};
        }

        const userCreated = repository.createUser(newUser);
        const user = {
            id: userCreated.toJSON().id,
            email: userCreated.toJSON().email
        }

        return {
            success:true,
            message: "Usuário cadastrado com sucesso.",
            newUserData: user,
        }
    }
}