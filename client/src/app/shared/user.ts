export class User{
    _id: string | undefined;
    password: string | undefined;
    username: string | undefined;
    joined: Date | undefined;
    lastSeen: Date | undefined;
    library: {
        gameId: Number | undefined;
        rating?: Number | undefined;
        platform?: string[] | undefined;
        storefront?: string[] | undefined;
        acquisitionDate?: Date | undefined;
        acquisitionPrice?: Number | undefined;
        own: boolean;
        state: string | undefined;
    }[] = [];
}