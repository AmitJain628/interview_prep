import SocialNetworkingService from "./SocialNetworkingService";
import User from "./User";

function main() {
    let socialNetworkingService = SocialNetworkingService.getInstance();

    let user1 = new User(1, "John Doe", "john@example.com", "password", "profile1.jpg", "I love coding!", [], []);
    let user2 = new User(2, "Jane Smith", "jane@example.com", "password", "profile2.jpg", "Exploring the world!", [], []);
 
    socialNetworkingService.registerUser(user1);
    socialNetworkingService.registerUser(user2);

    
    socialNetworkingService.sendFriendRequest(user1, user2);
}