import { NoteRepository, UserRepository } from '../../repositories';
import { ReturnNote } from './createNote.usecase';

type DeleteNoteDTO = {
    ownerID: string;
    noteID: string
}

export class DeleteNote {
    execute(data: DeleteNoteDTO): ReturnNote {
        const {noteID, ownerID} = data
        const noteRepository = new NoteRepository()
        const userRepository = new UserRepository();

        const currentUser = userRepository.findUserByID(ownerID)

        if(!currentUser) {
            return {
				success: false,
				message: 'Usuário não encontrado. Não foi possivel atualizar a nota.',
			}; 
        }

        const note = noteRepository.findNoteByID(
            ownerID,
            noteID
        )

        if(!note){
            return {
				success: false,
				message: 'Nota não encontrado.',
			}; 
        }

        const deletedNote = noteRepository.deleteNote(noteID)

        return {
            success: true,
            message: "Nota deletada com sucesso.",
            data: {
                note: deletedNote
            }
        };
    }
}
