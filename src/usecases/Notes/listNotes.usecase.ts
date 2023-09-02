import { Filter, NoteRepository, UserRepository } from '../../repositories';
import { ReturnNote } from './createNote.usecase';

export class ListNotes{
    execute(ownerID: string, filter?: Filter) : ReturnNote {
        const noteRepository = new NoteRepository()
        const userRepository = new UserRepository();
        const currentUser = userRepository.findUserByID(ownerID)

        if(!currentUser) {
            return {
				success: false,
				message: 'Usuário não encontrado.',
			}; 
        }

        const notesCurrentUser = noteRepository.listNotes(ownerID, filter);

        return {
            success:true,
            message: "Notas listadas com sucesso.",
            data: {
                notes: notesCurrentUser
            },
        }
    }
}