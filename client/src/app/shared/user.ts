export class User{
    _id: string | undefined;
    password: string | undefined;
    username: string | undefined;
    joined: Date | undefined;
    lastSeen: Date | undefined;
    library: {
        gameId: number | undefined;
        rating: number | undefined;
        platform: string[] | undefined;
        storefront: string[] | undefined;
        acquisitionDate: Date | undefined;
        acquisitionPrice: number | undefined;
        own: boolean | undefined;
        format: string | undefined;
        state: string | undefined;
    }[] = [];
}