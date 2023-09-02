import { NoteJSON } from '../../classes';
import { NoteRepository, UserRepository } from '../../repositories';

export type CreateNoteDTO = {
    title:string,
    description: string,
    favorite: boolean,
    archived: boolean,
    ownerID: string,
}

export type ReturnNote = {
	success: boolean;
	message: string;
	data?: {
        note?: NoteJSON
        notes?: Array<NoteJSON>
    };
};

export class CreateNote{
    execute(data: CreateNoteDTO): ReturnNote{
        const userRepository = new UserRepository();
        const currentUser = userRepository.findUserByID(data.ownerID)

        if(!currentUser) {
            return {
				success: false,
				message: 'Usuário não encontrado.',
			}; 
        }

        const repository = new NoteRepository();

        const newNote = repository.createNote({
            title:data.title,
            description: data.description,
            favorite: data.favorite,
            archived: data.archived,
            owner: currentUser,
        })

        return {
            success:true,
            message: "Nota cadastrado com sucesso.",
            data: {
                note: newNote.toJSON(),
                notes: repository.listNotes(data.ownerID, {})
            },
        }
    }
}