import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from "../models/user.model";
import { LikeProfil } from "../models/likeprofil.model";

@Injectable()
export class UserService{

    api = "https://intense-everglades-99626.herokuapp.com/login/verification"

    constructor(private http: Http) { }

    public verifLogin(email: string, password: string): Promise<any>{
        const url = this.api+"?email="+email+"&mdp="+password;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as User)
        .catch(error => console.log('Une erreur est survenue ' + error))
    }

    public findById(id: string): Promise<any>{
        const url = "https://intense-everglades-99626.herokuapp.com/user/get?id="+id;

        return this.http.get(url)
        .toPromise()
        .then(reponse => reponse.json() as User)
        .catch(error => console.log('Une erreur est survenue ' + error))
    }

    public inscription(name: string, email: string, gender: string, dateNaissance: string, password: string, imageUrl: string, lastName: string): Promise<any>{
        const url = "https://intense-everglades-99626.herokuapp.com/user/save?name="+name+"&email="+email+"&gender="+gender+
                    "&birthday="+dateNaissance+"&password="+password+"&lastName="+lastName+
                    "&imageUrl=https://firebasestorage.googleapis.com/v0/b/tindermada.appspot.com/o/pictures%2FAnjara?alt=media&token=d9265ddb-21f0-4e91-8e37-f3207e504f49"

        return this.http.get(url)
        .toPromise()
        .then(reponse => reponse.json() as User)
        .catch(error => error.status as string)
    }

    public findAll(id : string): Promise<any>{
        const url = "https://intense-everglades-99626.herokuapp.com/user/findAll?id="+id

        return this.http.get(url)
        .toPromise()
        .then(reponse => reponse.json() as User)
        .catch(error => console.log('Une erreur est survenue ' + error))
    }

    public insertUserLike(likeRequest : LikeProfil){
        return this.http.post("https://intense-everglades-99626.herokuapp.com/user/like",likeRequest);
    }

}