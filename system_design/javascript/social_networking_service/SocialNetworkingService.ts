import { NotificationType } from "./NotificationType";
import User from "./User";
import Notification from './Notification';

export default class SocialNetworkingService {
    private users: Map<number, User>;
    private notifications: Map<number, Array<Notification>>;
    private static instance;

    constructor() {
        this.users = new Map();
        this.notifications = new Map();
    }

    public static getInstance() {
        if(!SocialNetworkingService.instance) {
            SocialNetworkingService.instance = new SocialNetworkingService();
        }

        return SocialNetworkingService.instance;
    }

    registerUser(user: User) {
       this.users.set(user.getId(), user);
    }

    login(username: string, password: string) {
        for(let [id, user] of this.users) {
            if(user.getEmail() === username && user.getPassword() === password) {
                return true;
            }
        }

        return false;
    }

    public updateUserProfile(user: User) {
        this.users.set(user.getId(), user);
    }

    sendFriendRequest(user1: User, user2: User) {
        let sender = this.users.get(user1.getId());
        if(sender) {
            let notification = new Notification(1, user2.getId(),
            NotificationType.FRIEND_REQUEST, "Friend request from " + user1, Date.now());
            this.addNotification(user2.getId(), notification);
        }
    }

    addNotification(userId, notification: Notification) {
       let notifications = this.notifications.get(userId) || [];
       notifications?.push(notification);
       this.notifications.set(userId, notifications);
    }

    public acceptFriendRequest(userId: number, friendId: number) {
        let user = this.users.get(userId);
        let friend = this.users.get(friendId);
        if (user != null && friend != null) {
            user.getFriends().push(friendId);
            friend.getFriends().push(userId);
            let notification = new Notification(Date.now(), friendId,
                    NotificationType.FRIEND_REQUEST_ACCEPTED, "Friend request accepted by " + userId,
                    Date.now());
            this.addNotification(friendId, notification);
        }
    }


}