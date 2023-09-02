import { NoteRepository, UserRepository } from '../../repositories';
import { ReturnNote } from './createNote.usecase';

export type UpdateDTO = {
    ownerID: string,
    noteID:string,
    action: 'update' | 'archive' | 'favorite',
    newInfo: {
        title?:string,
        description?: string,
    }
}


export class UpdateNote {
    execute(data: UpdateDTO): ReturnNote {
        const {newInfo, noteID, ownerID} = data
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

       
        let updatedNote;
        if (data.action === 'update') {
         updatedNote = noteRepository.updateNote({
                noteID, title: newInfo.title, description: newInfo.description
            })
        } else if(data.action === "archive") {
            updatedNote = noteRepository.toggleArchiveStatus(noteID)
        } else if(data.action === "favorite"){
            updatedNote = noteRepository.toggleFavoriteStatus(noteID)
        }

        if(!updatedNote){
            return {
				success: false,
				message: 'Nota não encontrado.',
			}; 
        }
        return {
            success: true,
            message: "Nota atualizada com sucesso.",
            data: {
                note: updatedNote
            }
        };
    }
}