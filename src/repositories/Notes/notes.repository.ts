import { notes } from '../../database';
import { Note, NoteJSON, User } from '../../classes';

export type CreateNoteDTO = {
    title:string,
    description: string,
    favorite: boolean,
    archived: boolean,
    owner: Omit<User, 'password'>,
}
export type UpdateNoteDTO = {
    noteID: string,
    title?:string,
    description?: string,
}

export type Filter = {
    title?: string;
    favorite?: boolean;
    archived?: boolean;
}

export class NoteRepository {
    //ok
    createNote(dados: CreateNoteDTO) : Note {
            const note = new Note(dados.title, dados.description, dados.favorite, dados.archived, dados.owner);
            notes.push(note);
            
            return note;
    }
    //ok
    listNotes(ownerID: string, filter?:Filter) : NoteJSON[] {
        return notes
        .filter((note) => {
            const { owner, title, archived, favorite} = note.toJSON();
            if (filter) {
                if (
                    (filter.title && !title.startsWith(filter.title)) ||
                    (filter.archived !== undefined && archived !== filter.archived) ||
                    (filter.favorite !== undefined && favorite !== filter.favorite)
                ) {
                    return false;
                }
            }

            return owner.id === ownerID;
        })
        .map((n) => n.toJSON());
    }

    public findNoteByID(
		ownerID: string,
		noteID: string
	): NoteJSON | undefined {
		return notes
			.find(
				(note) =>
                    note.toJSON().owner.id === ownerID &&
                    note.toJSON().id === noteID
			)
			?.toJSON();
	}

    updateNote(data: UpdateNoteDTO) : NoteJSON {
        const noteIndex = notes.findIndex((note) => note.toJSON().id === data.noteID);
    
        notes[noteIndex].updateNoteDetails({
            title: data.title,
            description: data.description,
        })

        return notes[noteIndex].toJSON()
    }

    toggleArchiveStatus(noteID: string): NoteJSON | null {
        const noteIndex = notes.findIndex((note) => note.toJSON().id === noteID);

        notes[noteIndex].toggleArchiveStatus();
        return notes[noteIndex].toJSON();
    }

    toggleFavoriteStatus(noteID: string): NoteJSON | null {
        const noteIndex = notes.findIndex((note) => note.toJSON().id === noteID);

        notes[noteIndex].toggleFavoriteStatus();
        return notes[noteIndex].toJSON();
    }

    //ok
    deleteNote(noteID: string) {
        const noteIndex = notes.findIndex((note) => note.toJSON().id === noteID);

       const [deletedNote] = notes.splice(noteIndex, 1);
       return deletedNote.toJSON()
    }

}
