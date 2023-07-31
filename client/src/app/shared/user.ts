export class User{
    _id: string | undefined;
    password: string | undefined;
    username: string | undefined;
    joined: Date | undefined;
    lastSeen: Date | undefined;
    library: {
        gameId: string | undefined;
        rating: Number | undefined;
        platform: string | undefined;
        storefront: string | undefined;
        acquisitionDate: Date | undefined;
        acquisitionPrice: number | undefined;
        own: boolean;
        state: string | undefined;
    }[] | undefined;
}

// 0 Not interested
// 1 Want to play
// 2 Playing
// 3 Infinite
// 4 Abandoned
// 5 Played
// 6 Completed
// 7 Wishlist