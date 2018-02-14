import { User } from "./user.model";

export class MessageModel{
    id: string;
    expediteur: User;
    recepteur: User;
    message: string;
    date: any;
}