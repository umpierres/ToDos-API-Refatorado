import { Request, Response } from "express"
import { CreateNote, DeleteNote, ListNotes, UpdateNote } from "../../usecases";
import { Filter } from "../../repositories";

export class NoteController {

    create(req: Request, res: Response) {
        const { ownerID } = req.params
        const { title, description, favorite, archived} = req.body

        const usecase = new CreateNote();

        const response = usecase.execute({ title, description, favorite, archived, ownerID })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }

    listNotes(req: Request, res: Response) {
        const { ownerID } = req.params
        const { title, favorite, archived } = req.query as Filter


        const usecase = new ListNotes();

        const response = usecase.execute(ownerID, { title, favorite, archived })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }

    update(req: Request, res: Response) {
        const { noteID, ownerID } = req.params
        const { title, description, action} = req.body

        const usecase = new UpdateNote();

        const response = usecase.execute({
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

    archive(req: Request, res: Response) {
        const { noteID, ownerID } = req.params;
    
        const usecase = new UpdateNote();
    
        const response = usecase.execute({
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

    favorite(req: Request, res: Response) {
        const { noteID, ownerID } = req.params;
    
        const usecase = new UpdateNote();
    
        const response = usecase.execute({
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
    
    delete(req: Request, res: Response) {
        const { noteID, ownerID } = req.params

        const usecase = new DeleteNote();

        const response = usecase.execute({
            ownerID,
            noteID,
        })

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }
}
