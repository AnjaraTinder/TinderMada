import { Configuration } from "./configuration.model";

export class User{

    id : string;
    email : string;
    password : string;
    name : string;
    birthday : any;
    sex : string;
    imageUrl : string;
    listLike : Array<User>;
    configuration : Configuration;

}