import { v4 as uuidv4 } from 'uuid';

export abstract class BaseClass{
	protected _id: string;

	constructor() {
		this._id = uuidv4();
	}
	
	public toJSON() {

	  } 
}