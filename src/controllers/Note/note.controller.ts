import { Request, Response } from "express"
import { CreateNote, DeleteNote, ListNotes, UpdateNote } from "../../usecases";
import { Filter } from "../../repositories";

export class NoteController {

    async create(req: Request, res: Response) {
        const { ownerID } = req.params
        const { title, description, favorited, archived} = req.body

        const usecase = new CreateNote();

        const response = await usecase.execute({ title, description, favorited, archived, ownerID })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }

    async listNotes(req: Request, res: Response) {
        const { ownerID } = req.params
        const { title, favorited, archived } = req.query as Filter


        const usecase = new ListNotes();

        const response = await usecase.execute(ownerID, { title, favorited, archived })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }

    async update(req: Request, res: Response) {
        const { noteID, ownerID } = req.params
        const { title, description, action} = req.body

        const usecase = new UpdateNote();

        const response = await usecase.execute({
            ownerID,
            noteID,
            action: 'update',
            newInfo: {
                title, description
            }
        })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }

    async archive(req: Request, res: Response) {
        const { noteID, ownerID } = req.params;
    
        const usecase = new UpdateNote();
    
        const response = await usecase.execute({
            ownerID,
            noteID,
            action: 'archive',
            newInfo:{}
        });
    
        if (!response.success) {
            return res.status(400).json(response);
        }
    
        return res.status(200).json(response);
    }

    async favorite(req: Request, res: Response) {
        const { noteID, ownerID } = req.params;
    
        const usecase = new UpdateNote();
    
        const response = await usecase.execute({
            ownerID,
            noteID,
            action: 'favorite',
            newInfo:{}
        });
    
        if (!response.success) {
            return res.status(400).json(response);
        }
    
        return res.status(200).json(response);
    }
    
    async delete(req: Request, res: Response) {
        const { noteID, ownerID } = req.params

        const usecase = new DeleteNote();

        const response = await usecase.execute({
            ownerID,
            noteID,
        })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }
}
