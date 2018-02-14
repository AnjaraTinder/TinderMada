import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";



@Injectable()
export class ReglageService{
    api = "https://intense-everglades-99626.herokuapp.com/user/"

    constructor(private http: Http){ }

    public update(idUser: string, homme: boolean, femme: boolean, ageMin: string, ageMax: string, distance: string): Promise<any>{
        const url = this.api+"updateConfig?idUser="+idUser+"&homme="+homme+"&femme="+femme+"&ageMin="+
                    ageMin+"&ageMax="+ageMax+"&distance="+distance
        //console.log(url)
        return this.http.get(url)
        .toPromise()
        .then(reponse =>{
            reponse.json() as User
        })
        .catch(error=>{
            console.log("erreur: "+error)
        })
    }
    
}