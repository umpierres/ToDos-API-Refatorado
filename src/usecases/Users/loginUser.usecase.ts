import { UserRepository } from '../../repositories';
import { UserDTO } from './createUser.usecase';


type LoginUserResponse = {
	success: boolean;
	message: string;
	data?: {id: string ; email: string};
};

export class LoginUser {
	execute(dados: UserDTO): LoginUserResponse {
		const repository = new UserRepository();

		const findUser = repository.loginUser(dados);

		if (!findUser) {
			return {
				success: false,
				message: 'Senha e/ou email incorretos!',
			};
		}

		const user = {
            id: findUser.toJSON().id,
            email: findUser.toJSON().email
        }

		return {
			success: true,
			message: 'Cadastro encontrado! Bem-vindo(a)',
			data: user,
		};
	}
}
