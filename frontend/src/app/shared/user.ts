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
        own: boolean;
        state: number | undefined;
    } | undefined;
}

// 0 Not played yet
// 1 Playing
// 2 Infinite
// 3 Abandoned
// 4 Played
// 5 Completed
// 6 Wishlist