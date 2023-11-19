// export class Game {
//     _id: string | undefined;
//     title: string | undefined;
//     description: string | undefined;
//     image: string | undefined;
//     released: Date | undefined;
//     developer: string | undefined;
//     publisher: string | undefined;
//     genre: string[] | undefined;
//     franchise: string | undefined;
//     platform: string[] | undefined;
//     storefront: string[] | undefined;
// }

export class Game {
    _id: string | undefined;
    gameId: number | undefined;
    name: string | undefined;
    releaseDate: Date | undefined;
    cover: string | undefined;
    rating: number | undefined;
    platforms: string[] | undefined;
    storefronts: string[] | undefined;
    acquisitionDate: Date | undefined;
    acquisitionPrice: number | undefined;
    own: boolean | undefined;
    format: string | undefined;
    state: string | undefined;
    time: number | undefined;
    comment: string | undefined;
}