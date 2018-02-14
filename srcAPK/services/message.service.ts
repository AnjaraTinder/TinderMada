import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { MessageModel } from "../models/message.model";

@Injectable()
export class MessageService{
    api = "https://intense-everglades-99626.herokuapp.com/"

    constructor(private http: Http) { }

    public getAll(idSelector1: string, idSelector2: string): Promise<any>{
        const url = this.api+"message/all?idSelector1="+idSelector1+"&idSelector2="+idSelector2;

        return this.http.get(url)
        .toPromise()
        .then(reponse  => reponse.json() as MessageModel)
        .catch(error => console.log('Une erreur est survenue ' + error))
    }
    
}