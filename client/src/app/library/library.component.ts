import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { User } from '../shared/user';
import { MatDialog } from '@angular/material/dialog';
import { AddGameComponent } from '../dialogs/add-game/add-game.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  gameList: any[] = [];
  platforms: any[] = [];
  storefronts: any[] = [];
  states: any[] = [];
  private user: User | undefined;
  isGridView: Boolean = false;
  viewType: String = 'list';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private gameService: GameService,
    private router: Router,
    private addGameDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('GameDB_token');
    
    if (this.jwtService.isTokenExpired(token!)) {
      this.router.navigateByUrl('/home');
      return;
    }

    const decodedToken = this.jwtService.decodeToken(token!);

      this.userService.getUser(decodedToken._id)
      .then((user) => {
        this.user = user;
        console.log(user);
        let gameIds: Number[] = [];

        // Get all the IDs from the games in the library
        this.user.library?.forEach((libraryGame) => {
          gameIds.push(libraryGame.gameId!)
        });

        // Search for the games in IGDB
        this.gameService.getGamesById(gameIds).subscribe((retrievedGames) => {
          // Combine the properties 
          this.user?.library.forEach((game) => {
            const retrievedGame = retrievedGames.find(
              (retrieved) => retrieved.id === game.gameId
            );
              console.log(retrievedGame)
            if (retrievedGame) {
              const combinedGame = {
                gameId: game.gameId,
                name: retrievedGame.name,
                releaseDate: retrievedGame.first_release_date,
                cover: retrievedGame.cover,
                own: game.own,
                state: game.state,
                platforms: game.platform,
                storefronts: game.storefront,
                acquisitionDate: game.acquisitionDate,
                acquisitionPrice: game.acquisitionPrice,
                rating: game.rating,
              };

              // Step 4: Store the combined objects in the new array
              this.gameList.push(combinedGame);
            }
          });
        });

        console.log(this.gameList)

        // this.user.library?.forEach((libraryGame) => {
          // TODO: STORE GAMES AND FILTER THEM
          // this.gameService.getGame(libraryGame.gameId!)
          // .then((game) => {

          //   // Save game in the game List
          //   this.gameList.push({
          //     gameId: game._id,
          //     title: game.title,
          //     image: game.image,
          //     genre: game.genre,
          //     own: libraryGame.own,
          //     platform: libraryGame.platform,
          //     storefront: libraryGame.storefront,
          //     rating: libraryGame.rating,
          //     state: libraryGame.state
          //   });

          //   // Save game in platform counter
          //   const platformIndex = this.platforms.findIndex(item => item.platform === libraryGame.platform);
          //   if (platformIndex !== -1) {
          //     this.platforms[platformIndex].counter++;
          //   } else {
          //     this.platforms.push({ platform: libraryGame.platform, counter: 1 });
          //   }

          //   // Save game in storefront counter
          //   const storefrontIndex = this.storefronts.findIndex(item => item.storefront === libraryGame.storefront);
          //   if (storefrontIndex !== -1) {
          //     this.storefronts[storefrontIndex].counter++;
          //   } else {
          //     this.storefronts.push({ platform: libraryGame.storefront, counter: 1 });
          //   }

          //   // TODO: esto está raro
          //   // Save game in State counter
          //   const stateIndex = this.platforms.findIndex(item => item.state === libraryGame.state);
          //   if (stateIndex !== -1) {
          //     this.states[stateIndex].counter++;
          //   } else {
          //     this.states.push({ states: libraryGame.state, counter: 1 });
          //   }

          // });
        // })
      })
  }

  addGame() {
    if (this.user && this.user.library) {
      const dialogRef = this.addGameDialog.open(AddGameComponent, {
        data: { library: this.user.library }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.user?.library.push(result)
          this.userService.updateUserContent(this.user?._id!, this.user!)
          .catch(error => {
            console.error("Error updating user content:", error);
          });
        }
      });
    }
  }
}
