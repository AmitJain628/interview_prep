export default class User {
    private name: string;
    private id: number;
    private email: string;
    private password: string;
    private profilePicture: string;
    private bio: string;
    private interests: string;
    private friends: Array<number>;
    private posts:  Array<string>;

    constructor(id: number, name: string, email: string, password: string, profilePicture: string, bio: string, friends: Array<number>, posts:  Array<string>) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.bio = bio;
        // this.interests = interests;
        this.friends = friends;
        this.posts = posts;
    }

    getId(){
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getFriends() {
        return this.friends;
    }

}