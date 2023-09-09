import { UUID } from 'crypto';
import {NoteJSON, UserJSON } from '../../classes';
import { pgHelper } from '../../database';

export type CreateNoteDTO = {
    title:string,
    description: string,
    favorited: boolean,
    archived: boolean,
    ownerID: UUID,
}
export type UpdateNoteDTO = {
    noteID: string,
    title?:string,
    description?: string,
}

export type Filter = {
    title?: string;
    favorited?: boolean;
    archived?: boolean;
}

export class NoteRepository {
    async createNote(data: CreateNoteDTO) : Promise<NoteJSON> {
        const { title, description, favorited, archived, ownerID } = data;
        const query = `
        INSERT INTO tasks (title, description, favorited, archived, id_user)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING title, description, favorited, archived, id_user, date_created, id_task
      `;
        const queryParams = [title, description, favorited, archived, ownerID];

        const result = await pgHelper.client.query(query, queryParams);

        const [newTask] = result;

        return {
            title: newTask.title, 
            description: newTask.description,
            favorited: newTask.favorited,
            archived: newTask.archived,
            owner: newTask.id_user,
            date: newTask.date_created,
            id: newTask.id_task
        };
      }
    //ok
    async listNotes(ownerID: string, filter?:Filter) : Promise<NoteJSON[]> {
        const query = `
          SELECT *
          FROM tasks
          WHERE id_user = $1
        `;
        const queryParams = [ownerID];
  
        const notesUser = await pgHelper.client.query(query, queryParams);
      
         const listNotesUser: NoteJSON[] = notesUser.map((n:any) => {
         return {
          title: n.title,
          description: n.description,
          favorited: n.favorited,
          archived: n.archived,
          owner: n.id_user,
          date: n.date_created,
          id: n.id_task
        }
        });

        return listNotesUser
      }
      
      async findNoteByID(ownerID: string, noteID: string): Promise<NoteJSON | undefined> {
        const query = `
          SELECT *
          FROM tasks
          WHERE id_user = $1
          AND id_task = $2
        `;
      
        const queryParams = [ownerID, noteID];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return undefined;
        
      
        const note = result;
      
        return {
          title: note.title,
          description: note.description,
          favorited: note.favorited,
          archived: note.archived,
          owner: note.id_user,
          date: note.date_created,
          id: note.id_task,
        };
      }

      async updateNote(data: UpdateNoteDTO): Promise<NoteJSON | undefined> {
        const query = `
          UPDATE tasks
          SET title = $1, description = $2
          WHERE id_task = $3
          RETURNING *
        `;
      
        const queryParams = [data.title, data.description, data.noteID];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return undefined; 
      
      
        const updatedNote = result;
      
        return {
          title: updatedNote.title,
          description: updatedNote.description,
          favorited: updatedNote.favorited,
          archived: updatedNote.archived,
          owner: updatedNote.id_user,
          date: updatedNote.date_created,
          id: updatedNote.id_task,
        };
      }
      
      async toggleArchiveStatus(noteID: string): Promise<NoteJSON | null> {
        const query = `
          UPDATE tasks
          SET archived = NOT archived
          WHERE id_task = $1
          RETURNING *
        `;
      
        const queryParams = [noteID];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return null;
        
      
        const updatedNote = result
      
        return {
          title: updatedNote.title,
          description: updatedNote.description,
          favorited: updatedNote.favorited,
          archived: updatedNote.archived,
          owner: updatedNote.id_user,
          date: updatedNote.date_created,
          id: updatedNote.id_task,
        };
      }
      
      async toggleFavoriteStatus(noteID: string): Promise<NoteJSON | null> {
        const query = `
          UPDATE tasks
          SET favorited = NOT favorited
          WHERE id_task = $1
          RETURNING *
        `;
      
        const queryParams = [noteID];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return null;
        
      
        const updatedNote = result;
      
        return {
          title: updatedNote.title,
          description: updatedNote.description,
          favorited: updatedNote.favorited,
          archived: updatedNote.archived,
          owner: updatedNote.id_user,
          date: updatedNote.date_created,
          id: updatedNote.id_task,
        };
      }
      //ok
      async deleteNote(noteID: string): Promise<NoteJSON | undefined> {
        const query = `
          DELETE FROM tasks
          WHERE id_task = $1
          RETURNING *
        `;
      
        const queryParams = [noteID];
      
        const result = await pgHelper.client.query(query, queryParams);
      
        if (result.length === 0) return undefined; 
        
        const deletedNote = result;
      
        return {
          title: deletedNote.title,
          description: deletedNote.description,
          favorited: deletedNote.favorited,
          archived: deletedNote.archived,
          owner: deletedNote.id_user,
          date: deletedNote.date_created,
          id: deletedNote.id_task,
        };
      }
}
