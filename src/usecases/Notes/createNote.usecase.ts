import { UUID } from 'crypto';
import { NoteJSON } from '../../classes';
import { NoteRepository, UserRepository } from '../../repositories';

export type CreateNoteDTO = {
    title:string,
    description: string,
    favorited: false,
    archived: false,
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
    async execute(data: CreateNoteDTO): Promise<ReturnNote>{
        const userRepository = new UserRepository();
        const currentUser = await userRepository.findUserByID(data.ownerID)

        if(!currentUser) {
            return {
				success: false,
				message: 'Usuário não encontrado.',
			}; 
        }

        const repository = new NoteRepository();

        const newNote = await repository.createNote({
            title:data.title,
            description: data.description,
            favorited: data.favorited,
            archived: data.archived,
            ownerID: data.ownerID as UUID,
        })

        const notes = await repository.listNotes(data.ownerID, {});

        return {
            success:true,
            message: "Nota cadastrado com sucesso.",
            data: {
                note: newNote,
                notes: notes,
            },
        }
    }
}