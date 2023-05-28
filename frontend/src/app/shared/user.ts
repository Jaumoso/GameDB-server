export class User{
    _id: string | undefined;
    password: string | undefined;
    username: string | undefined;
    joined: Date | undefined;
    lastSeen: Date | undefined;
    games: string[] | undefined;
}