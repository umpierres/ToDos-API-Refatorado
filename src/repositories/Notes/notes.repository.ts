import { Database } from '../../database';
import { Note, NoteJSON, User, UserJSON } from '../../classes';

export type CreateNoteDTO = {
    title:string,
    description: string,
    favorite: boolean,
    archived: boolean,
    owner: Omit<UserJSON, 'password'>,
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
    async createNote(data: CreateNoteDTO) : Promise<NoteJSON> {
        const { title, description, favorite, archived, owner } = data;
        const query = `
        INSERT INTO tasks (title, description, favorite, archived, owner)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING title, description, favorite, archived, owner, date_created, id
      `;
      const result = await Database.query(query, [title, description, favorite, archived, owner]);

      const [newTask] = result.rows;

        return {
            title: newTask.title, 
            description: newTask.description,
            favorite: newTask.favorite,
            archived: newTask.archived,
            owner: newTask.owner,
            date: newTask.date_created,
            id: newTask.id
        };
    }
    //ok
    async listNotes(ownerID: string, filter?:Filter) : Promise<NoteJSON[]> {
        const query = `
          SELECT *
          FROM notes
          WHERE owner_id = $1
          ${filter ? 'AND title LIKE $2' : ''}
          ${filter && filter.archived !== undefined ? 'AND archived = $3' : ''}
          ${filter && filter.favorite !== undefined ? 'AND favorite = $4' : ''}
        `;
      
        const queryParams = [ownerID];
      
        if (filter) {
          const { title, archived, favorite } = filter;
          queryParams.push(`%${title}%`);
          if (archived !== undefined) queryParams.push(archived ? 'true' : "false");
          if (favorite !== undefined) queryParams.push(favorite ? 'true' : "false");
        }
      
        const result = await Database.query(query, queryParams);
      
        return result.rows.map((n) => ({
          title: n.title,
          description: n.description,
          favorite: n.favorite,
          archived: n.archived,
          owner: n.owner_id,
          date: n.date_created,
          id: n.id,
        }));
      }
      
      async findNoteByID(ownerID: string, noteID: string): Promise<NoteJSON | undefined> {
        const query = `
          SELECT *
          FROM notes
          WHERE owner_id = $1
          AND id = $2
        `;
      
        const queryParams = [ownerID, noteID];
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return undefined;
        }
      
        const row = result.rows[0];
      
        return {
          title: row.title,
          description: row.description,
          favorite: row.favorite,
          archived: row.archived,
          owner: row.owner_id,
          date: row.date_created,
          id: row.id,
        };
      }
      

      async updateNote(data: UpdateNoteDTO): Promise<NoteJSON | undefined> {
        const query = `
          UPDATE notes
          SET title = $1, description = $2
          WHERE id = $3
          RETURNING *
        `;
      
        const queryParams = [data.title, data.description, data.noteID];
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return undefined; 
        }
      
        const updatedNote = result.rows[0];
      
        return {
          title: updatedNote.title,
          description: updatedNote.description,
          favorite: updatedNote.favorite,
          archived: updatedNote.archived,
          owner: updatedNote.owner_id,
          date: updatedNote.date_created,
          id: updatedNote.id,
        };
      }
      
      async toggleArchiveStatus(noteID: string): Promise<NoteJSON | null> {
        const query = `
          UPDATE notes
          SET archived = NOT archived
          WHERE id = $1
          RETURNING *
        `;
      
        const queryParams = [noteID];
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return null;
        }
      
        const updatedNote = result.rows[0];
      
        return {
          title: updatedNote.title,
          description: updatedNote.description,
          favorite: updatedNote.favorite,
          archived: updatedNote.archived,
          owner: updatedNote.owner_id,
          date: updatedNote.date_created,
          id: updatedNote.id,
        };
      }
      

    async toggleFavoriteStatus(noteID: string): Promise<NoteJSON | null> {
        const query = `
          UPDATE notes
          SET favorite = NOT favorite
          WHERE id = $1
          RETURNING *
        `;
      
        const queryParams = [noteID];
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return null;
        }
      
        const updatedNote = result.rows[0];
      
        return {
          title: updatedNote.title,
          description: updatedNote.description,
          favorite: updatedNote.favorite,
          archived: updatedNote.archived,
          owner: updatedNote.owner_id,
          date: updatedNote.date_created,
          id: updatedNote.id,
        };
    }

    //ok
    async deleteNote(noteID: string): Promise<NoteJSON | undefined> {
        const query = `
          DELETE FROM notes
          WHERE id = $1
          RETURNING *
        `;
      
        const queryParams = [noteID];
      
        const result = await Database.query(query, queryParams);
      
        if (result.rows.length === 0) {
          return undefined; 
        }
      
        const deletedNote = result.rows[0];
      
        return {
          title: deletedNote.title,
          description: deletedNote.description,
          favorite: deletedNote.favorite,
          archived: deletedNote.archived,
          owner: deletedNote.owner_id,
          date: deletedNote.date_created,
          id: deletedNote.id,
        };
      }
      

}
