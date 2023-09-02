import { BaseClass } from "../BaseClass/baseClass.class";

export type UserJSON = {
    id: string;
    email: string;
    password: string;
}

export class User extends BaseClass{

    constructor(private _email:string, private _password:string){
        super()
    }

    public toJSON(): UserJSON {
        return {
            id: this._id,
            email:this._email,
            password:this._password,
        };
    }

}