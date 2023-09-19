import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { User } from '../shared/user';
import { MatDialog } from '@angular/material/dialog';
import { AddGameComponent } from '../dialogs/add-game/add-game.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteGameComponent } from '../dialogs/delete-game/delete-game.component';
import { StorefrontService } from '../services/storefront.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  gameList: any[] = [];
  platforms: any[] = [];
  storefronts: any[] = [];
  states: number[] = [0,0,0,0,0,0,0,0,0,0];
  private user: User | undefined;
  isGridView: Boolean = false;
  viewType: String = 'list';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private gameService: GameService,
    private router: Router,
    private addGameDialog: MatDialog,
    private deleteGameDialog: MatDialog,
    private storefrontService: StorefrontService,
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
            
            // Get storefronts and save them
            let storefrontNames: string[] = [];
            game.storefront?.forEach((storefront) => {
              this.storefrontService.getStorefront(storefront).then((storefront) => {
                storefrontNames.push(storefront.name!);
              })
            })
            game.storefront = storefrontNames;

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

              console.log(combinedGame.storefronts)
              console.log(combinedGame.platforms)
              
              // Step 4: Store the combined objects in the new array
              this.gameList.push(combinedGame);

              // Save game in platform counter
              this.processPlatforms(combinedGame);

              // Save game in storefront counter
              this.processStorefronts(combinedGame);

              // Save game in State counter
              this.processStates(combinedGame);
            }
          });
        });
      })
  }

  processPlatforms(combinedGame: any) {
    combinedGame.platforms.forEach((platformName: string) => {
      const index = this.platforms.findIndex(p => p.name === platformName);
      if (index !== -1) {
        this.platforms[index].counter++;
      } else {
        this.platforms.push({ name: platformName, counter: 1});
      }
    });
  }

  processStorefronts(combinedGame: any) {
    combinedGame.storefronts.forEach((storefrontName: string) => {
      const index = this.storefronts.findIndex(s => s.name === storefrontName);
      if (index !== -1) {
        this.storefronts[index].counter++;
      } else {
        this.storefronts.push({name: storefrontName, counter: 1});
      }
    });
  }

  processStates(combinedGame: any) {
    if(combinedGame.state == 'Not Interested') { this.states[0] = this.states[0]+1}
    if(combinedGame.state == 'Wishlist') { this.states[1] = this.states[1]+1}
    if(combinedGame.state == 'Backlog') { this.states[2] = this.states[2]+1}
    if(combinedGame.state == 'Tried') { this.states[3] = this.states[3]+1}
    if(combinedGame.state == 'Playing') { this.states[4] = this.states[4]+1}
    if(combinedGame.state == 'Played') { this.states[5] = this.states[5]+1}
    if(combinedGame.state == 'Completed') { this.states[6] = this.states[6]+1}
    if(combinedGame.state == 'Retired') { this.states[7] = this.states[7]+1}
    if(combinedGame.state == 'Shelved') { this.states[8] = this.states[8]+1}
    if(combinedGame.state == 'Abandoned') { this.states[9] = this.states[9]+1}
  }

  addGame() {
    if (this.user && this.user.library) {
      const dialogRef = this.addGameDialog.open(AddGameComponent, {
        data: { library: this.user.library }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.user?.library.push(result);
          this.userService.updateUserContent(this.user?._id!, this.user!)
          .then(() => {

            this.gameService.getGamesById([result.gameId]).subscribe((retrievedGame) =>{
              const combinedGame = {
                gameId: result.gameId,
                name: retrievedGame[0].name,
                releaseDate: retrievedGame[0].first_release_date,
                cover: retrievedGame[0].cover,
                own: result.own,
                state: result.state,
                platforms: result.platform,
                storefronts: result.storefront,
                acquisitionDate: result.acquisitionDate,
                acquisitionPrice: result.acquisitionPrice,
                rating: result.rating,
              };
              this.gameList.push(combinedGame);
            });

            this.snackBar.open(
              "Game added to the library.", 
              "OK",
              {
                verticalPosition: 'top',
                duration: 4000,
                panelClass: ['snackbar']
              }
            );
          })
          .catch(error => {
            console.error("Error updating user content:", error);
          });
        }
      });
    }
  }

  deleteGame(gameId: number, gameName: string) {
    if(this.user && this.user.library){
      const dialogRef = this.deleteGameDialog.open(DeleteGameComponent, {
        data: { gameId: gameId, gameName: gameName, deleteGame: false }
      });

      dialogRef.afterClosed().subscribe((result => {
        if(result) {
          const index = this.user?.library.findIndex(game => game.gameId === gameId);
          if (index !== -1) {
            this.user?.library.splice(index!, 1);
            this.userService.updateUserContent(this.user?._id!,this.user!)
            .then(() => {
              this.gameList.splice(index!, 1);

              this.snackBar.open(
                "Game deleted from library.", 
                "OK",
                {
                  verticalPosition: 'top',
                  duration: 4000,
                  panelClass: ['snackbar']
                }
                );
            })
            .catch(error => {
              console.error("Error updating user content:", error);
            });
          }
        }
      }))
    }
  }
}
