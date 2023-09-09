import { v4 as uuidv4 } from 'uuid';

export abstract class BaseClass{
	
	constructor(protected _id: string) {}
	
	public toJSON() {

	  } 
}