import { NotificationType } from "./NotificationType";

export default class Notification {
    private id: number;
    private userId: number;
    private content: string;
    private timeStamp: number;
    private type: NotificationType;

    constructor(id: number, userId: number, type: NotificationType, content: string, timeStamp: number) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.timeStamp = timeStamp;
        this.type = type;
    }
}