import { BaseClass } from "../BaseClass/baseClass.class";
import { User, UserJSON } from "../User/user.class";

type updateNoteDTO = {
	title?: string,
	description?: string,
}

export type NoteJSON = {
    id: string
    title:string,
    description: string,
    favorite: boolean,
    archived: boolean,
    date: Date, 
    owner: Omit<UserJSON, 'password'>,
}

export class Note extends BaseClass {
    
    private _date: Date
	constructor(
        private _title: string,
		private _description: string,
		private _favorite: boolean = false,
		private _archived: boolean = false,
		private _owner: Omit<User, 'password'>,
        ) {
		super();
        this._date = new Date()
	}


	public toJSON() {
		return {
			id: this._id,
			title: this._title,
			description: this._description,
            favorite: this._favorite, 
			archived: this._archived, 
            date: this._date, 
            owner:{
				id: this._owner.toJSON().id,
				email: this._owner.toJSON().email,
			},
		};
	}

    public updateNoteDetails(newInfo: updateNoteDTO) {
        if(newInfo.title) {
            if(newInfo.title.length < 3) {
                return false;
            }
            this._title = newInfo.title
        }
        if(newInfo.description) {
            if(newInfo.description.length < 3 || newInfo.description.length > 100) {
                return false;
            }
            this._description = newInfo.description
        }
        return true;
    }

    toggleArchiveStatus() {
        this._archived = !this._archived;
    }

    toggleFavoriteStatus() {
        this._favorite = !this._favorite;
    }
}